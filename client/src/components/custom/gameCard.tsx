import ClueCaptain from "@/assets/Clue Captain blue artboard.png";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

export function GameCard() {
  return (
    <Card className="relative p-0 m-5 h-40 w-40 overflow-hidden cursor-pointer">
      <Button
        className="absolute top-2 right-2 bg-white/70 h-5 w-10 cursor-pointer hover:bg-white"
        onClick={() => console.log("Info")}
      >
        i
      </Button>
      <CardContent className="p-0 h-full">
        <img src={ClueCaptain} alt="card" className="w-full h-full object-cover object-center" />
      </CardContent>
    </Card>
  );
}
