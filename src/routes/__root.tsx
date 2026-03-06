import { createRootRoute, Outlet, Router } from "@tanstack/react-router";

export const rootRoute = createRootRoute({
  component: () => (
    <div>
      { }
      <Outlet />
    </div>
  ),
});

export const router = new Router({
  routeTree: rootRoute,
  defaultPreload: 'intent',
});