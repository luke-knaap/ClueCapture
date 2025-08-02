import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { useGameState } from "./hooks/useGameState";
import "./index.css";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
  routeTree,
  context: {
    gameState: undefined!,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const querClient = new QueryClient();
const gameState = useGameState();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={querClient}>
      <RouterProvider router={router} context={{ gameState }} />
    </QueryClientProvider>
  </StrictMode>,
);
