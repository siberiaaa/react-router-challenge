import { type RouteConfig, index, layout } from "@react-router/dev/routes";

export default [
    layout("layouts/root.tsx", [
        index("pages/calculator.tsx")
    ])
] satisfies RouteConfig;
