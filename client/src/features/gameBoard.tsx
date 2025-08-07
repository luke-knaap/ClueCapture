import { GameCard } from "@client/components/custom/gameCard";
import { GameCardSkeleton } from "@client/components/custom/gameCardSkeleton";
import { Label } from "@client/components/ui/label";
import { useApiData } from "@client/hooks/useApiData";
import { type GameCardItemType } from "@shared/schemas/gameCard.schema";
import { useState } from "react";

export function GameBoard() {
  const { data = [], isPending, error } = useApiData();
  const [selectedCard, setSelectedCard] = useState<number[]>([]);
  const [flippedCard, setFlippedCard] = useState<number | null>(null); // <== hier

  const toggleCardSelection = (id: number) => {
    setSelectedCard((prev) =>
      prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id],
    );
  };

  const handleFlip = (id: number) => {
    setFlippedCard((prev) => (prev === id ? null : id));
  };

  if (error) {
    return <Label> fout</Label>;
  }

  return (
    <div className="grid grid-cols-4 gap-2 p-8 justify-center">
      {isPending
        ? Array.from({ length: 16 }).map((_, i) => <GameCardSkeleton key={i} />)
        : data.map((item: GameCardItemType) => (
            <GameCard
              key={item.id}
              image={item.image}
              title={item.title}
              isSelected={selectedCard.includes(Number(item.id))}
              isFlipped={flippedCard === Number(item.id)}
              onClick={() => toggleCardSelection(Number(item.id))}
              onFlip={() => handleFlip(Number(item.id))}
            />
          ))}
    </div>
  );
}
