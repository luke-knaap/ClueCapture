import { type MuseumType } from "@shared/schemas/museum.schema";

export async function fetchArtworks(category: string = "stone"): Promise<MuseumType[]> {
  const res = await fetch(`/api/museum/artworks?category=${encodeURIComponent(category)}`);
  if (!res.ok) {
    throw new Error("Failed to fetch artworks");
  }
  return res.json();
}
