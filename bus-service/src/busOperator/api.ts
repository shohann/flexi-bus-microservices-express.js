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

  router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string);
      const size = parseInt(req.query.size as string);

      const busOperators = await service.listBusOperators({
        page,
        size,
      });

      const apiResponse = new ApiResponse(
        200,
        busOperators,
        "Bus Operator list successfully fetched"
      );

      res.status(apiResponse.statusCode).json(apiResponse);
    } catch (error) {
      next(error);
    }
  });

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

  router.put(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = Number(req.params.id);

        const updatedBusOperatror = await service.updateBusOperatorById(id, {
          name: req.body.name,
          logo: req.body.logo,
        });

        const apiResponse = new ApiResponse(
          200,
          updatedBusOperatror,
          "Bus operator updated successfully"
        );

        res.status(apiResponse.statusCode).json(apiResponse);
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    "/id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = Number(req.params.id);

        await service.deleteBusOperatorById(id);

        const apiResponse = new ApiResponse(
          200,
          null,
          "Bus operator deleted successfully"
        );
        res.status(apiResponse.statusCode).json(apiResponse);
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
};

export default routes;
