import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./routes/__root";
import { autorRoute } from "./routes/autores";
import { generoRoute } from "./routes/generos";


const routeTree = rootRoute.addChildren([autorRoute, generoRoute]);

export const router = createRouter({
  routeTree,
  context: {},
});
