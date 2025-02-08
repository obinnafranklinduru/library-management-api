import logger from "./logger.js";

export class ApiResponse {
  constructor(res) {
    this.res = res;
  }

  success(data, message = "Success", statusCode = 200) {
    return this.res.status(statusCode).json({
      success: true,
      statusCode,
      message,
      data,
    });
  }

  error(error) {
    const statusCode = error.statusCode || 500;
    const message = error.isOperational
      ? error.message
      : "Internal Server Error";

    if (!error.isOperational) {
      logger.error(`Internal Error: ${error.stack}`);
    }

    return this.res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  }

  validationError(errors) {
    return this.res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Validation failed",
      errors: errors.map((err) => ({
        field: err.property,
        constraints: Object.values(err.constraints),
      })),
    });
  }
}
