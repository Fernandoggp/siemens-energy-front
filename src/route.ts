import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./routes/__root";
import { autorRoute } from "./routes/autores";
import { generoRoute } from "./routes/generos";
import { livroRoute } from "./routes/livros";

const routeTree = rootRoute.addChildren([autorRoute, generoRoute, livroRoute]);

export const router = createRouter({
  routeTree,
  context: {},
});
