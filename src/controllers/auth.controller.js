import { AuthService } from "../services/auth.service.js";
import { AppError } from "../utils/appError.js";

export class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  async login(req, res, next) {
    try {
      const { accessToken, refreshToken } = await this.authService.login(
        req.body.email,
        req.body.password
      );

      res
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 15 * 60 * 1000, // 15 minutes
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })
        .json({ success: true });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        throw new AppError("Refresh token required", 401);
      }

      const accessToken = await this.authService.refreshAccessToken(
        refreshToken
      );

      res
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 15 * 60 * 1000,
        })
        .json({ success: true });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res) {
    res
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json({ success: true });
  }
}
