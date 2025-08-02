import { Input } from "../ui/input";
import { Label } from "../ui/label";

type InputWithLabelProps = {
  label: string;
  placeholder?: string;
  type?: string;
  value: string;
  className?: string;
  onChange?: (value: string) => void;
};

export function InputWithLabel({
  label,
  placeholder,
  type = "text",
  value,
  className,
  onChange,
}: InputWithLabelProps) {
  return (
    <div className={`grid w-full max-w-sm items-center gap-3 ${className}`}>
      <Label>{label}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange!(e.target.value)}
      />
    </div>
  );
}
