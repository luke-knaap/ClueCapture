import { createFileRoute } from "@tanstack/react-router";
import ClueGuesserPage from "@client/pages/clueGuesserPage";

export const Route = createFileRoute("/_game/clueGuesser")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      category: (search.category as string) ?? undefined,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <ClueGuesserPage />;
}
