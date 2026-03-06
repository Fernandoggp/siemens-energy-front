import { Autores } from "@/pages/autor";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root";

export const autorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/autores",
  component: () => <Autores />,
});