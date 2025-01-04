import { Router } from "express";
import busRoutes from "./bus";
import busOperatorRoutes from "./busOperator";

const defineRoutes = async (expressRouter: Router) => {
  busRoutes(expressRouter);
  busOperatorRoutes(expressRouter);
};

export default defineRoutes;
