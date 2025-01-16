import express, { Request, Response, NextFunction } from "express";
import * as service from "./service";
import validate, { validateParams } from "../middlewares/validateResource";
import { CreateBus, validateCreateBus, seatSchema } from "./request";
import ApiResponse from "../utils/response";
import logger from "../utils/log/logger";

// https://plusreturn.com/blog/how-to-extend-express-request-interface-in-typescript/

const routes = () => {
  const router = express.Router();
  logger.info(`Setting up routes buses`);

  router.post(
    "/",
    validate(validateCreateBus),
    async (
      req: Request<{}, {}, CreateBus>,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const newBus = await service.createBus({
          busModel: req.body.busModel,
          busNumber: req.body.busNumber,
          busOperatorId: req.body.busOperatorId,
          busType: req.body.busType,
          seats: req.body.seats,
        });

        const apiResponse = new ApiResponse(
          201,
          newBus,
          "Bus created successfully"
        );

        res.status(apiResponse.statusCode).json(apiResponse);
      } catch (error: any) {
        next(error);
      }
    }
  );

  router.put(
    "/:id/seats/:seatId",
    validate(seatSchema),
    async (req: Request, res: Response, next: NextFunction) => {
      const busId = parseInt(req.params.id);
      const seatId = parseInt(req.params.seatId);

      await service.updateSeatById({
        id: seatId,
        busId,
        seatCol: req.body.seatCol,
        seatNumber: req.body.seatNumber,
        seatRow: req.body.seatRow,
      });

      const apiResponse = new ApiResponse(
        200,
        null,
        "Seat updated successfully"
      );

      res.status(apiResponse.statusCode).json(apiResponse);
    }
  );

  router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const size = parseInt(req.query.size as string) || 10;

      const buses = await service.getBuses({ page, size });

      const apiResponse = new ApiResponse(200, buses, "List of buses");

      res.status(apiResponse.statusCode).json(apiResponse);
    } catch (error: any) {
      next(error);
    }
  });

  router.get(
    "/:id",
    // validateParams("id"),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const bus = await service.getBus(parseInt(req.params.id));
        const apiResponse = new ApiResponse(200, bus, "Bus details");
        res.status(apiResponse.statusCode).json(apiResponse);
      } catch (error: any) {
        next(error);
      }
    }
  );

  router.delete(
    "/:id/disable",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await service.disableBus(parseInt(req.params.id));
        const apiResponse = new ApiResponse(
          200,
          null,
          "Bus disabled successfully"
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
