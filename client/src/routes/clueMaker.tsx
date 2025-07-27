import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/clueMaker")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div></div>;
}
