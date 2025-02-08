import bcrypt from "bcrypt";
import { AppError } from "../utils/appError.js";
import User from "../models/User.js";

export class UserService {
  async createUser(userData) {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await User.create({
        ...userData,
        password: hashedPassword,
      });
      return this.excludeSensitiveFields(user);
    } catch (error) {
      if (error.code === 11000) {
        throw new AppError("Email already exists", 409);
      }
      throw error;
    }
  }

  async getAllUsers(page = 1, pageSize = 10) {
    const skip = (page - 1) * pageSize;
    const users = await User.find()
      .select("-password -refreshToken")
      .skip(skip)
      .limit(pageSize);
    return users;
  }

  async getUserById(id) {
    const user = await User.findById(id).select("-password -refreshToken");
    if (!user) throw new AppError("User not found", 404);
    return user;
  }

  async updateUser(id, updateData) {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password -refreshToken");

    if (!user) throw new AppError("User not found", 404);
    return user;
  }

  async deleteUser(id) {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new AppError("User not found", 404);
    return { message: "User deleted successfully" };
  }

  excludeSensitiveFields(user) {
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.refreshToken;
    return userObj;
  }
}
