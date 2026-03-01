import express from "express";
import cors from "cors";

// Middlewares
import { requestLogger } from "./middlewares/logger.js";
import {
  notFoundHandler,
  globalErrorHandler,
} from "./middlewares/errorHandler.js";

// Routes
import apiRoutes from "./routes/apiRoutes.js";
import indexRoutes from "./routes/indexRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Apply logger middleware
app.use(requestLogger);

// Mount routes
app.use("/", indexRoutes);
app.use("/api", apiRoutes);

// Error handlers
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
