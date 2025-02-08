import "reflect-metadata";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import authorRoutes from "./routes/author.routes.js";
import bookRoutes from "./routes/book.routes.js";
import rateLimiter from "./config/rateLimiter.js";
import connectDB from "./config/db.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { requestLogger } from "./utils/logger.js";

const app = express();

// Middlewares
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);
app.use(rateLimiter);

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);

// Error handling
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;

async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
