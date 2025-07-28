import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_game")({
  beforeLoad: ({ context }) => {
    const { isStarted } = context.gameState;
    if (!isStarted()) {
      throw redirect({ to: "/" });
    }
  },
});
