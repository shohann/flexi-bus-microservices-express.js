import { Router } from "express";
import routes from "./api";

const defineRoutes = (expressRouter: Router) => {
  expressRouter.use("/bus-routes", routes());
};

export default defineRoutes;
