import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { AppError } from "../utils/appError.js";
import config from "../config/index.js";

export class AuthService {
  constructor() {
    this.accessSecret = config.jwt.accessSecret;
    this.refreshSecret = config.jwt.refreshSecret;
    this.accessExpiry = config.jwt.accessExpiry;
    this.refreshExpiry = config.jwt.refreshSecret;
  }

  async login(email, password) {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AppError("Invalid credentials", 401);
    }

    const accessToken = this.generateToken(
      user,
      this.accessSecret,
      this.accessExpiry
    );
    const refreshToken = this.generateToken(
      user,
      this.refreshSecret,
      this.refreshExpiry
    );

    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken };
  }

  async refreshAccessToken(refreshToken) {
    const payload = this.verifyToken(refreshToken, this.refreshSecret);
    const user = await User.findById(payload.sub);

    if (!user || user.refreshToken !== refreshToken) {
      throw new AppError("Invalid refresh token", 401);
    }

    return this.generateToken(user, this.accessSecret, "15m");
  }

  generateToken(user, secret, expiresIn) {
    return jwt.sign(
      {
        sub: user._id,
        role: user.role,
      },
      secret,
      { expiresIn }
    );
  }

  verifyToken(token, secret) {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      throw new AppError("Invalid token", 401);
    }
  }
}
