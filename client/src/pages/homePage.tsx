import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/custom/inputWithLabel";
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
      <div className="grid justify-center">
        <InputWithLabel name="Username"></InputWithLabel>
        <Button className="max-w-200 mt-10" onClick={handleStart}>
          Start Game
        </Button>
      </div>
    </>
  );
}

export default HomePage;
