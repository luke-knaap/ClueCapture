import ClueGuesserPage from "@client/pages/clueGuesserPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_game/clueGuesser")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ClueGuesserPage />;
}
