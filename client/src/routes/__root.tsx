import type { GameContext } from "@/hooks/useGameState";
import { createRootRouteWithContext, Link, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

type RouterContext = {
  gameState: GameContext;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <div>
        <Link to="/"></Link>{" "}
      </div>
      <hr />
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
