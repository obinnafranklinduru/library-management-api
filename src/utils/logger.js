import winston from "winston";
import config from "../config/index.js";

const { combine, timestamp, json, errors } = winston.format;

const logger = winston.createLogger({
  level: config.environment === "development" ? "debug" : "info",
  format: combine(errors({ stack: true }), timestamp(), json()),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "logs/combined.log",
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: "logs/exceptions.log",
    }),
  ],
});

export const requestLogger = (req, res, next) => {
  logger.info({
    message: "Request received",
    method: req.method,
    path: req.path,
    ip: req.ip,
    userAgent: req.get("User-Agent"),
  });
  next();
};

export default logger;
