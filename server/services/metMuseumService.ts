import pLimit from "p-limit";
import { MuseumSchema, type MuseumType } from "@/schemas/museum.schema";

export class MetMuseumService {
  baseUrl = "https://collectionapi.metmuseum.org/public/collection/v1";

  public async getArtwork(count: number = 22): Promise<MuseumType[]> {
    const searchUrl = `${this.baseUrl}/search?hasImages=true&q=stone`;
    const searchRes = await fetch(searchUrl);
    const searchData = (await searchRes.json()) as { objectIDs: number[] };

    const objectIDs = searchData.objectIDs;
    if (!objectIDs?.length) {
      throw new Error("Geen objecten gevonden");
    }
    console.log(objectIDs);
    const shuffled = this.shuffleArray(searchData.objectIDs);
    const artworks: MuseumType[] = [];
    const limit = pLimit(5);
    let i = 0;

    while (artworks.length < count && i < shuffled.length) {
      const batch = shuffled.slice(i, i + 10);
      const results = await Promise.all(
        batch.map((id) =>
          limit(async () => {
            const res = await fetch(`${this.baseUrl}/objects/${id}`);
            if (!res.ok) return null;
            const data = await res.json();
            const parsed = MuseumSchema.safeParse(data);
            return parsed.success ? parsed.data : null;
          })
        )
      );
      artworks.push(...results.filter((a): a is MuseumType => a !== null));
      i += 10;
    }
    return artworks.slice(0, count);
  }

  private shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i]!, arr[j]!] = [arr[j]!, arr[i]!];
    }
    return arr;
  }
}
