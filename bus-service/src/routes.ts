import { Router } from "express";
import busRoutes from "./bus";
import busOperatorRoutes from "./busOperator";
import busRouteRoutes from "./busRoute";

const defineRoutes = async (expressRouter: Router) => {
  busRoutes(expressRouter);
  busOperatorRoutes(expressRouter);
  busRouteRoutes(expressRouter);
};

export default defineRoutes;
