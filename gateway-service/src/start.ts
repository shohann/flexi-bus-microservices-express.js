import express, { Application, Request, Response } from "express";

const app: Application = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Define the /health route
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
