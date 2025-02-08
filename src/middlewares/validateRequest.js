import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { AppError } from "../utils/appError.js";

export function validateRequest(DTOClass) {
  return async (req, res, next) => {
    try {
      const dto = plainToClass(DTOClass, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        const message = errors
          .map((error) => Object.values(error.constraints))
          .join(", ");
        return next(new AppError(message, 400));
      }

      req.body = dto;
      next();
    } catch (error) {
      next(error);
    }
  };
}
