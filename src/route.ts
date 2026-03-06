import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./routes/__root";
import { autorRoute } from "./routes/autores";

const routeTree = rootRoute.addChildren([autorRoute]);

export const router = createRouter({
  routeTree,
  context: {},
});
