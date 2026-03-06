import { Generos } from "@/pages/genero";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root";

export const generoRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/generos",
    component: () => <Generos />,
});