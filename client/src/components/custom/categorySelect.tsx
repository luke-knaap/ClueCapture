import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type CategorySelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export function CategorySelect({ value, onChange }: CategorySelectProps) {
  return (
    <div className="grid gap-2">
      <Label>Kies categorie</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-90 cursor-pointer">
          <SelectValue placeholder="Select category"></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="stone">Stone</SelectItem>
          <SelectItem value="paintings">Paintings</SelectItem>
          <SelectItem value="textiles">Textiles</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
