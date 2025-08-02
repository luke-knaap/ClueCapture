import { GameCard } from "@client/components/custom/gameCard";
import { GameCardSkeleton } from "@client/components/custom/gameCardSkeleton";
import { Label } from "@client/components/ui/label";
import { useMuseumData } from "@client/hooks/useMuseumData";

export function GameBoard() {
  const { data, isPending, error } = useMuseumData();

  if (error) {
    return <Label> fout</Label>;
  }

  return (
    <div className="grid grid-cols-4 gap-2 p-8 justify-center">
      {isPending
        ? Array.from({ length: 16 }).map((_, i) => <GameCardSkeleton key={i} />)
        : data?.map((art: any) => (
            <GameCard key={art.objectID} image={art.primaryImageSmall} title={art.title} />
          ))}
    </div>
  );
}
