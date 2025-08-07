import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ApiSelect } from "@client/components/custom/select/apiSelect";
import { CategorySelect } from "@client/components/custom/select/categorySelect";
import { InputWithLabel } from "@client/components/custom/inputWithLabel";
import { Button } from "@client/components/ui/button";
import { Label } from "@client/components/ui/label";
import { useGameState } from "@client/hooks/useGameState";
import { useUsername } from "@client/hooks/useUsername";
import { GameModeSelect } from "@client/components/custom/select/gameModeSelect";

function HomePage() {
  const navigate = useNavigate();
  const { gameStarted, resetGame } = useGameState();
  const [username, setUsername] = useUsername();
  const [api, setApi] = useState("museum");
  const [category, setCategory] = useState("stone");
  const [gameMode, setGamemode] = useState("");

  const handleStart = () => {
    gameStarted();
    navigate({ to: "/clueMaker", search: { api, category } });
  };

  useEffect(() => {
    resetGame();
  }, []);

  return (
    <>
      <Label className="justify-self-center text-5xl mt-5">Clue Capture</Label>
      <div className="grid place-items-center h-screen">
        <div className="grid gap-7 mb-60">
          <InputWithLabel
            label="Gebruikersnaam"
            placeholder="Voer je naam in"
            value={username}
            onChange={setUsername}
          ></InputWithLabel>
          <GameModeSelect value={gameMode} onChange={setGamemode}></GameModeSelect>
          <ApiSelect value={api} onChange={setApi}></ApiSelect>

          {api === "museum" && (
            <CategorySelect value={category} onChange={setCategory}></CategorySelect>
          )}
          <Button className="justify-self-center w-50 cursor-pointer" onClick={handleStart}>
            Start Game
          </Button>
        </div>
      </div>
    </>
  );
}

export default HomePage;
