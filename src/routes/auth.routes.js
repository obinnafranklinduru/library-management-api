import express from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { UserController } from "../controllers/user.controller.js";
import { LoginDto } from "../dto/auth/login.dto.js";
import { CreateUserDto } from "../dto/users/create-user.dto.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = express.Router();
const authController = new AuthController();
const userController = new UserController();

router.post(
  "/register",
  validateRequest(CreateUserDto),
  userController.createUser.bind(userController)
);

router.post(
  "/login",
  validateRequest(LoginDto),
  authController.login.bind(authController)
);

router.post("/refresh-token", authController.refreshToken.bind(authController));

router.post("/logout", authController.logout.bind(authController));

export default router;
