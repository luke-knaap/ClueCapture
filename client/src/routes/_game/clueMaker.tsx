import ClueMakerPage from "@client/pages/clueMakerPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_game/clueMaker")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ClueMakerPage />;
}
