import express, { Request, Response, NextFunction } from "express";
import ApiResponse from "../utils/response";
import * as service from "./service";
import logger from "../utils/log/logger";
import validate from "../middlewares/validateResource";
import { CreateBusOperator, validateCreateBusOperator } from "./request";

const routes = () => {
  const router = express.Router();
  logger.info(`Setting up routes bus operator`);

  router.post(
    "/",
    validate(validateCreateBusOperator),
    async (
      req: Request<{}, {}, CreateBusOperator>,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const busOperator = await service.createBusOperators({
          name: req.body.name,
          logo: req.body.logo,
        });

        const apiResponse = new ApiResponse(
          201,
          busOperator,
          "Bus operator created successfully"
        );
        res.status(apiResponse.statusCode).json(apiResponse);
      } catch (error: any) {
        next(error);
      }
    }
  );

  router.get(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params.id;

        const busOperator = await service.getBusOperatorById(Number(id));

        const apiResponse = new ApiResponse(
          200,
          busOperator,
          "Bus operator fetched successfully"
        );
        res.status(apiResponse.statusCode).json(apiResponse);
      } catch (error: any) {
        next(error);
      }
    }
  );

  return router;
};

export default routes;
