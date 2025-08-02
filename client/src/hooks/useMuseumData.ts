import { fetchArtworks } from "@client/services/museumService";
import { useQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";

export function useMuseumData() {
  const { category } = useSearch({ from: "/_game/clueGuesser" });

  return useQuery({
    queryKey: ["museum", category || "stone"],
    queryFn: () => fetchArtworks(category || "stone"),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 65,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
