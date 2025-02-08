import dotenv from "dotenv";
dotenv.config();

export default {
  environment: process.env.NODE_ENV || "development",
  mongodbUri: process.env.MONGODB_URI,
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpiry: "30m",
    refreshExpiry: "7d",
  },
  rateLimit: {
    windowMs: process.env.RATE_LIMIT_WINDOW_MS || 30 * 60 * 1000, // 30 minutes
    max: process.env.RATE_LIMIT_MAX || 200,
  },
};
