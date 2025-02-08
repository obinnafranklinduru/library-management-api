import request from "supertest";
import app from "../server.js";
import User from "../models/User.js";

describe("Authentication", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  test("POST /auth/login with valid credentials", async () => {
    // Create test user
    await User.create({
      name: "Test User",
      email: "test@example.com",
      password: bcrypt.hashSync("password123", 10),
      role: "Member",
    });

    const response = await request(app).post("/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(response.headers["set-cookie"]).toEqual(
      expect.arrayContaining([
        expect.stringContaining("accessToken="),
        expect.stringContaining("refreshToken="),
      ])
    );
  });
});
