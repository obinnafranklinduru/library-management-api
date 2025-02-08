import mongoose from "mongoose";
import config from "./index.js";
import logger from "../utils/logger.js";

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongodbUri);
    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

mongoose.connection.on("connected", () => {
  logger.debug("Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
  logger.error(`Mongoose connection error: ${err}`);
});

mongoose.connection.on("disconnected", () => {
  logger.warn("Mongoose disconnected");
});

export default connectDB;
