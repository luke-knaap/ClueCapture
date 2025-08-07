import { Label } from "../../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";

type ApiSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export function ApiSelect({ value, onChange }: ApiSelectProps) {
  return (
    <div className="grid  gap-2">
      <Label>Kies API</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-90 cursor-pointer">
          <SelectValue placeholder="Select API"></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="museum">Museum</SelectItem>
          <SelectItem value="picsum">Picsum</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
