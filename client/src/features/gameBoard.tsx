import { GameCard } from "@/components/custom/gameCard";

export function GameBoard() {
  const cards = Array.from({ length: 16 });

  return (
    <div className="grid grid-cols-4 gap-2 p-8 justify-center">
      {cards.map((_, i) => (
        <GameCard key={i} />
      ))}
    </div>
  );
}
