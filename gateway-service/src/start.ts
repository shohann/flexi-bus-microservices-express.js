import express, { Application, Request, Response } from "express";
import { AxiosService } from "./axios";
import axios, { AxiosResponse } from "axios";

const app: Application = express();
const PORT = 3000;

const BUS_BASE_URL = "http://localhost:4000";

let axiosBusInstance: ReturnType<typeof axios.create>;
const axiosService: AxiosService = new AxiosService(
  `${BUS_BASE_URL}/api/v1`,
  "bus-service"
);
axiosBusInstance = axiosService.axios;

const getBusServiceHealth = async (): Promise<AxiosResponse> => {
  const response: AxiosResponse = await axiosBusInstance.get("/health");
  return response;
};

const getBusHealthController = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log(req.hostname);
  console.log(req.path);
  const response: AxiosResponse = await getBusServiceHealth();
  res.status(response.status).json(response.data);
};

// Middleware
app.use(express.json());

// Define the /health route
app.get("/health", getBusHealthController);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Global error handler is required
// Need a good structure
