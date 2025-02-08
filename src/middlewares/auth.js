import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError.js";
import User from "../models/User.js";

export const authenticate = (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      throw new AppError("Authentication required", 401);
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);

    req.user = {
      id: decoded.sub,
      role: decoded.role,
    };

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      error.message = "Access token expired";
      error.statusCode = 401;
    }
    next(error);
  }
};

export const refreshTokenMiddleware = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return next(new AppError("Refresh token required", 401));
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.sub);

    if (!user || user.refreshToken !== refreshToken) {
      return next(new AppError("Invalid refresh token", 401));
    }

    req.user = { id: user._id, role: user.role };
    next();
  } catch (error) {
    next(error);
  }
};
