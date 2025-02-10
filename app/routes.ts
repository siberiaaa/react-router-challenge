import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("layouts/root.tsx", [
        index("routes/calculator.tsx")
    ]),
    route(
        "calculate",
        "routes/calculate-revenue.tsx"
      ),
] satisfies RouteConfig;
