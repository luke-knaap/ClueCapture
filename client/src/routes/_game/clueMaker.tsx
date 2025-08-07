import { createFileRoute } from "@tanstack/react-router";
import ClueMakerPage from "@client/pages/clueMakerPage";

export const Route = createFileRoute("/_game/clueMaker")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      api: (search.api as string) ?? undefined,
      category: (search.category as string) ?? undefined,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <ClueMakerPage />;
}
