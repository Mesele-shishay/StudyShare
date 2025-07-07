import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Import and use routes
import routes from "./routes";
app.use("/", routes);

// Error handling middleware (must be last)
import { errorHandler } from "./middlewares/errorHandler";
app.use(errorHandler);

export default app;
