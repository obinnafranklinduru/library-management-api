import { ApiResponse } from "../utils/apiResponse.js";
import logger from "../utils/logger.js";

export const errorHandler = (err, req, res, next) => {
  const apiResponse = new ApiResponse(res);

  // Log the error
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // Handle validation errors
  if (err.errors && Array.isArray(err.errors)) {
    return apiResponse.validationError(err.errors);
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    err.message = "Invalid token";
    err.statusCode = 401;
  }

  // Handle MongoDB duplicate key errors
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    err.message = `${field} already exists`;
    err.statusCode = 400;
  }

  // Handle cast errors (invalid ObjectId)
  if (err.name === "CastError") {
    err.message = `Invalid ${err.path}: ${err.value}`;
    err.statusCode = 400;
  }

  return apiResponse.error(err);
};
