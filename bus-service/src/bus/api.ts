import express, { Request, Response, NextFunction } from "express";
// import * as service from "./service";
import validate, { validateParams } from "../middlewares/validateResource";
// import {} from "./request";

import ApiResponse from "../utils/response";
import logger from "../utils/log/logger";

const routes = () => {
  const router = express.Router();
  logger.info(`Setting up routes comments`);

  router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const apiResponse = new ApiResponse(
        201,
        { test: "test" },
        "Comment created successfully"
      );

      res.status(apiResponse.statusCode).json(apiResponse);
    } catch (error: any) {
      next(error);
    }
  });

  return router;
};

export default routes;
