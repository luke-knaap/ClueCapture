import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { routeTree } from "./routeTree.gen";
import { useGameState } from "./hooks/useGameState";

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

const gameState = useGameState();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} context={{ gameState }} />
  </StrictMode>,
);
