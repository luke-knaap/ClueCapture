import { Label } from "@/components/ui/label";
import { useUsername } from "@/hooks/useUsername";

function ClueGuesserPage() {
  const [username] = useUsername();

  return <Label>{username}</Label>;
}

export default ClueGuesserPage;
