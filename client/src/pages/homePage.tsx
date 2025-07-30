import { InputWithLabel } from "@/components/custom/inputWithLabel";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGameState } from "@/hooks/useGameState";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

function HomePage() {
  const navigate = useNavigate();
  const { gameStarted, resetGame } = useGameState();
  const handleStart = () => {
    gameStarted();
    navigate({ to: "/clueGuesser" });
  };

  useEffect(() => {
    resetGame();
  }, []);

  return (
    <>
      <Label className="justify-self-center text-5xl mt-5">Clue Capture</Label>
      <div className="grid place-items-center h-screen">
        <div className="grid gap-7 mb-60">
          <InputWithLabel name="Username"></InputWithLabel>
          <Select>
            <SelectTrigger className="w-90 cursor-pointer">
              <SelectValue placeholder="Select API"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Museum">Museum</SelectItem>
            </SelectContent>
          </Select>
          <Button className="justify-self-center w-50 cursor-pointer" onClick={handleStart}>
            Start Game
          </Button>
        </div>
      </div>
    </>
  );
}

export default HomePage;
