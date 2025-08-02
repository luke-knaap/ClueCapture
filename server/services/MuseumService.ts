import { MuseumSchema, type MuseumType } from "@shared/schemas/museum.schema";
import { ShuffleArray } from "@server/utils/randomShuffle";
import pLimit from "p-limit";

export class MuseumService {
  private baseUrl = "https://collectionapi.metmuseum.org/public/collection/v1";

  public async getArtwork(count: number = 16, category: string = "stone"): Promise<MuseumType[]> {
    const searchUrl = `${this.baseUrl}/search?hasImages=true&q=${encodeURIComponent(category)}`;
    const searchData = await this.fetchJsonSafe<{ objectIDs: number[] }>(searchUrl);

    if (!searchData?.objectIDs?.length) {
      throw new Error("Geen objecten gevonden");
    }

    const shuffled = ShuffleArray(searchData.objectIDs);
    const artworks: MuseumType[] = [];
    const limit = pLimit(5);
    let i = 0;

    while (artworks.length < count && i < shuffled.length) {
      const batch = shuffled.slice(i, i + 5);
      const results = await Promise.all(
        batch.map((id) =>
          limit(async (): Promise<MuseumType | undefined> => {
            const data = await this.fetchJsonSafe<any>(`${this.baseUrl}/objects/${id}`);
            if (!data) return undefined;
            const parsed = MuseumSchema.safeParse(data);
            return parsed.success ? parsed.data : undefined;
          })
        )
      );
      artworks.push(...(results.filter(Boolean) as MuseumType[]));
      i += 5;
    }
    return artworks.slice(0, count);
  }

  private async fetchJsonSafe<T>(url: string, retries = 3): Promise<T | null> {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          console.warn(`❌ Fetch mislukt (${res.status} ${res.statusText}) bij ${url}`);
          continue; // probeer opnieuw
        }
        return (await res.json()) as T;
      } catch (err) {
        console.warn(`⚠️ JSON parse error bij ${url} (poging ${attempt}):`, err);
      }
      await new Promise((r) => setTimeout(r, 300));
    }
    return null;
  }
}
