import { UserService } from "../services/user.service.js";
import { ApiResponse } from "../utils/apiResponse.js";

export class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async createUser(req, res, next) {
    try {
      const user = await this.userService.createUser(req.body);
      const apiResponse = new ApiResponse(res);
      apiResponse.success(user, "User created", 201);
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
      const users = await this.userService.getAllUsers(page, pageSize);

      const apiResponse = new ApiResponse(res);
      apiResponse.success(
        users,
        "List of all registered users retrieved successfully."
      );
    } catch (error) {
      next(error);
    }
  }

  async getUser(req, res, next) {
    try {
      const user = await this.userService.getUserById(req.params.id);

      const apiResponse = new ApiResponse(res);
      apiResponse.success(user, "User details retrieved successfully.");
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const user = await this.userService.updateUser(req.params.id, req.body);

      const apiResponse = new ApiResponse(res);
      apiResponse.success(user, "User information updated successfully.");
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const result = await this.userService.deleteUser(req.params.id);

      const apiResponse = new ApiResponse(res);
      apiResponse.success(result, "User account deleted successfully.");
    } catch (error) {
      next(error);
    }
  }
}
