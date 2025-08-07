import { fetchArtworks } from "@client/services/museumService";
import { fetchPics } from "@client/services/picsumService";
import { useQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { type GameCardItemType } from "@shared/schemas/gameCard.schema";

type ApiType = "museum" | "picsum";

const apiFetchMap: Record<
  ApiType,
  {
    getKey: (args: { category?: string }) => unknown[];
    fetchFn: (args: { category?: string }) => Promise<GameCardItemType[]>;
  }
> = {
  museum: {
    getKey: ({ category }) => ["museum", category || "stone"],
    fetchFn: ({ category }) => fetchArtworks(category || "stone"),
  },
  picsum: {
    getKey: () => ["picsum"],
    fetchFn: () => fetchPics(),
  },
};

export function useApiData() {
  const { category, api } = useSearch({ from: "/_game/clueMaker" });
  const config = apiFetchMap[api as ApiType];

  if (!config) {
    throw new Error(`Onbekende API: ${api}`);
  }

  return useQuery<GameCardItemType[]>({
    queryKey: config.getKey({ category }),
    queryFn: () => config.fetchFn({ category }),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 65,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
