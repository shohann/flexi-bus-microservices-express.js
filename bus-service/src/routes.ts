import { Router } from "express";
import busRoutes from "./bus";

const defineRoutes = async (expressRouter: Router) => {
  busRoutes(expressRouter);
};

export default defineRoutes;
