import { Livros } from "@/pages/livro";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root";

export const livroRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/livros",
    component: () => <Livros />,
});