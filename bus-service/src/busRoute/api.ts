import express, { Request, Response, NextFunction, Router } from "express";
import ApiResponse from "../utils/response";
import * as service from "./service";
import logger from "../utils/log/logger";
import validate from "../middlewares/validateResource";
import {
  CreateCity,
  validateCreateCity,
  CreateBusStop,
  validateCreateBusStop,
} from "./request";

const routes = (): Router => {
  const router = express.Router();
  logger.info(`Setting up routes bus routes`);

  router.post(
    "/cities",
    validate(validateCreateCity),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = req.body as CreateCity;

        const city = await service.createCity({
          name: data.name,
          lat: data.lat,
          long: data.long,
        });

        const apiResponse = new ApiResponse(
          201,
          city,
          "City created successfully"
        );
        res.status(apiResponse.statusCode).json(apiResponse);
      } catch (error: any) {
        next(error);
      }
    }
  );

  router.post(
    "/bus-stops",
    validate(validateCreateBusStop),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = req.body as CreateBusStop;

        const busStop = await service.createCity({
          name: data.name,
          lat: data.lat,
          long: data.long,
        });

        const apiResponse = new ApiResponse(
          201,
          busStop,
          "Bus stop created successfully"
        );
        res.status(apiResponse.statusCode).json(apiResponse);
      } catch (error: any) {
        next(error);
      }
    }
  );

  router.get(
    "/cities",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const page = parseInt(req.query.page as string);
        const size = parseInt(req.query.size as string);

        const cities = await service.listCities({
          page,
          size,
        });

        const apiResponse = new ApiResponse(
          200,
          cities,
          "City list successfully fetched"
        );

        res.status(apiResponse.statusCode).json(apiResponse);
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    "/bus-stops",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const page = parseInt(req.query.page as string);
        const size = parseInt(req.query.size as string);

        const busStops = await service.listBusStops({
          page,
          size,
        });

        const apiResponse = new ApiResponse(
          200,
          busStops,
          "Bus stop list successfully fetched"
        );

        res.status(apiResponse.statusCode).json(apiResponse);
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    "/cities/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = Number(req.params.id as string);

        const city = await service.getCityById(id);

        const apiResponse = new ApiResponse(
          200,
          city,
          "City fetched successfully"
        );

        res.status(apiResponse.statusCode).json(apiResponse);
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    "/bus-stops/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = Number(req.params.id as string);

        const busStop = await service.getBusStopById(id);

        const apiResponse = new ApiResponse(
          200,
          busStop,
          "Bus stop fetched successfully"
        );

        res.status(apiResponse.statusCode).json(apiResponse);
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    "/cities/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = Number(req.params.id as string);

        await service.deleteCityById(id);

        const apiResponse = new ApiResponse(
          204,
          null,
          "City deleted successfully"
        );

        res.status(apiResponse.statusCode).json(apiResponse);
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    "/bus-stops/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = Number(req.params.id as string);

        await service.deleteBusStopById(id);

        const apiResponse = new ApiResponse(
          204,
          null,
          "Bus stop deleted successfully"
        );

        res.status(apiResponse.statusCode).json(apiResponse);
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    "/cities/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = Number(req.params.id as string);
        const data = req.body as CreateCity;

        const updatedCity = await service.updateCity(id, {
          name: data.name,
          lat: data.lat,
          long: data.long,
        });

        const apiResponse = new ApiResponse(
          200,
          updatedCity,
          "City updated successfully"
        );

        res.status(apiResponse.statusCode).json(apiResponse);
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    "/bus-stops/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = Number(req.params.id as string);
        const data = req.body as CreateBusStop;

        const updatedBusStop = await service.updateBusStop(id, {
          name: data.name,
          lat: data.lat,
          long: data.long,
        });

        const apiResponse = new ApiResponse(
          200,
          updatedBusStop,
          "Bus stop updated successfully"
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
