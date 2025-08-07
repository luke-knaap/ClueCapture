import { Label } from "../../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";

type GameModeSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export function GameModeSelect({ value, onChange }: GameModeSelectProps) {
  return (
    <div className="grid gap-2">
      <Label>Kies gamemode</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-90 cursor-pointer">
          <SelectValue placeholder="Select gamemode"></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="clueGuesser">ClueGuesser</SelectItem>
          <SelectItem value="clueMaker">ClueMaker</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
