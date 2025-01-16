import express, { Application, Request, Response } from "express";
import logger from "./utils/log/logger";
import domainRoutes from "./routes";

function defineRoutes(expressApp: Application) {
  logger.info("Defining routes...");
  const router = express.Router();

  domainRoutes(router);

  expressApp.use("/api/v1", router);
  // Health check
  expressApp.get("/api/v1/health", (req: Request, res: Response) => {
    res.status(200).send("OK");
  });

  // 404
  expressApp.use((req, res) => {
    res.status(404).send("Not Found");
  });
  logger.info("Routes defined");
}

export default defineRoutes;
