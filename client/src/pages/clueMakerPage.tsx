import { InputWithLabel } from "@client/components/custom/inputWithLabel";
import { Button } from "@client/components/ui/button";
import { Label } from "@client/components/ui/label";
import { GameBoard } from "@client/features/gameBoard";
import { useUsername } from "@client/hooks/useUsername";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

function ClueMakerPage() {
  const [username] = useUsername();
  const [hint, setHint] = useState("");
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
      <div className="flex flex-col items-end gap-4">
        <InputWithLabel
          label="Hint:"
          placeholder="Voer hier je hint in"
          value={hint}
          onChange={(val) => setHint(val.replace(/[^a-zA-Z]/g, ""))}
        ></InputWithLabel>
      </div>
    </div>
  );
}

export default ClueMakerPage;
