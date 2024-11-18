import { Router } from "express";
import routes from "./api";

const defineRoutes = (expressRouter: Router) => {
  expressRouter.use("/buses", routes());
};

export default defineRoutes;
