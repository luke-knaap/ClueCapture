import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUsername } from "@/hooks/useUsername";

type InputWithLabelProps = {
  name: string;
};

export function InputWithLabel({ name }: InputWithLabelProps) {
  const [username, setUsername] = useUsername();

  return (
    <div className="grid w-full max-w-sm items-center gap-3 mt-10">
      <Label>{name}</Label>
      <Input placeholder={name} value={username} onChange={(e) => setUsername(e.target.value)} />
    </div>
  );
}
