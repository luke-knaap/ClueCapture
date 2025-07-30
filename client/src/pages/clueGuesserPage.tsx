import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { GameBoard } from "@/features/gameBoard";
import { useUsername } from "@/hooks/useUsername";
import { useNavigate } from "@tanstack/react-router";

function ClueGuesserPage() {
  const [username] = useUsername();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6">
      <Label className="text-3xl justify-center-safe">Welcome {username}</Label>
      <Button
        onClick={() => navigate({ to: "/" })}
        className="self-start h-15 w-25 text-center bg-cyan-200 px-4 py-2 cursor-pointer  hover:bg-cyan-300 transition"
      >
        Terug naar <br /> hoofdmenu
      </Button>
      <GameBoard></GameBoard>
    </div>
  );
}

export default ClueGuesserPage;
