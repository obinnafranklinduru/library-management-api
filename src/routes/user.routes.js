import express from "express";
import { UserController } from "../controllers/user.controller.js";
import { UpdateUserDto } from "../dto/users/update-user.dto.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { authenticate } from "../middlewares/auth.js";
import { roles } from "../middlewares/roles.js";

const router = express.Router();
const userController = new UserController();

router.use(authenticate, roles(["Admin"]));
router.get("/", userController.getUsers.bind(userController));
router.get("/:id", userController.getUser.bind(userController));
router.put(
  "/:id",
  validateRequest(UpdateUserDto),
  userController.updateUser.bind(userController)
);
router.delete("/:id", userController.deleteUser.bind(userController));

export default router;
