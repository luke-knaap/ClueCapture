import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/clueGuesser")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/clueGuesser"!</div>;
}
