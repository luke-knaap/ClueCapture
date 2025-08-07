import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

type GameCardProps = {
  image: string;
  title: string;
  isSelected: boolean;
  isFlipped: boolean; // <== krijgt dit van GameBoard
  onClick: () => void;
  onFlip: () => void; // <== flip actie
};

export function GameCard({ image, title, isSelected, isFlipped, onClick, onFlip }: GameCardProps) {
  return (
    <Card
      onClick={onClick}
      className={`relative p-0 m-5 h-40 w-40 overflow-hidden cursor-pointer border-4 transition-colors ${
        isSelected ? "border-blue-500" : "border-transparent"
      }`}
    >
      {isFlipped ? (
        // achterkant
        <CardContent className="flex items-center justify-center p-4 text-center">
          <p className="text-sm font-semibold">{title}</p>
          <Button
            className="absolute top-2 right-2 bg-white/70 h-5 w-10 cursor-pointer hover:bg-white"
            onClick={(e) => {
              e.stopPropagation();
              onFlip();
            }}
          >
            ×
          </Button>
        </CardContent>
      ) : (
        // voorkant
        <CardContent className="p-0 h-full relative group">
          <Button
            className="absolute top-2 right-2 bg-white/70 h-5 w-10 cursor-pointer hover:bg-white z-20"
            onClick={(e) => {
              e.stopPropagation();
              onFlip();
            }}
          >
            i
          </Button>
          <img
            src={image}
            alt={title}
            draggable={false}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
        </CardContent>
      )}
    </Card>
  );
}
