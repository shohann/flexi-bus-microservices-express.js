import { Router } from "express";
import routes from "./api";

const defineRoutes = (expressRouter: Router) => {
  expressRouter.use("/bus-operators", routes());
};

export default defineRoutes;
