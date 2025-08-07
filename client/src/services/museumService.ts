import { type GameCardItemType } from "@shared/schemas/gameCard.schema";
import { type MuseumType } from "@shared/schemas/museum.schema";

export async function fetchArtworks(category: string = "stone"): Promise<GameCardItemType[]> {
  const res = await fetch(`/api/museum/artworks?category=${encodeURIComponent(category)}`);
  if (!res.ok) {
    throw new Error("Failed to fetch artworks");
  }
  const data: MuseumType[] = await res.json();

  return data.map((art) => ({
    id: String(art.objectID),
    title: art.title,
    image: art.primaryImageSmall!,
  }));
}
