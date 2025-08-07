import { ShuffleArray } from "@server/utils/randomShuffle";
import { PicsumSchema, type PicsumType } from "@shared/schemas/picsum.schema";
import z from "zod";

const PicsumArraySchema = z.array(PicsumSchema);

export class PicsumService {
  private baseUrl = "https://picsum.photos/v2/list";

  public async getPicsumPNGs(count: number = 16): Promise<PicsumType[]> {
    const randomPage = Math.floor(Math.random() * 60) + 1;
    const url = `${this.baseUrl}?page=${randomPage}&limit=100`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Fout bij ophalen: ${res.status}`);
    }

    const rawData: any = await res.json();
    const parsed = PicsumArraySchema.parse(
      rawData.map((item: PicsumType) => ({
        id: String(Number(item.id) + 1),
        author: item.author,
        download_url: item.download_url,
      }))
    );

    return ShuffleArray(parsed).slice(0, count);
  }
}
