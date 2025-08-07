import { type GameCardItemType } from "@shared/schemas/gameCard.schema";
import { type PicsumType } from "@shared/schemas/picsum.schema";

export async function fetchPics(): Promise<GameCardItemType[]> {
  const res = await fetch("/api/picsum");
  if (!res.ok) {
    throw new Error("Failed to fetch artworks");
  }

  const data: PicsumType[] = await res.json();

  return data.map((pics) => ({
    id: String(pics.id),
    title: pics.author,
    image: pics.download_url,
  }));
}
