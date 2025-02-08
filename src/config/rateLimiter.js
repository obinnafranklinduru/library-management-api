import { rateLimit } from "express-rate-limit";
import config from "./index.js";

const rateLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    statusCode: 429,
    message: "Too many requests, please try again later",
  },
});

export default rateLimiter;
