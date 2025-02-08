import request from "supertest";
import app from "../server.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

describe("User Management", () => {
  let adminToken;

  beforeAll(async () => {
    // Create admin user
    await User.create({
      name: "Admin User",
      email: "admin@test.com",
      password: await bcrypt.hash("adminpass", 10),
      role: "Admin",
    });

    // Login as admin
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "admin@test.com", password: "adminpass" });

    adminToken = res.headers["set-cookie"];
  });

  test("POST /users creates new user (Admin only)", async () => {
    const response = await request(app)
      .post("/users")
      .set("Cookie", adminToken)
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        role: "Member",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body).not.toHaveProperty("password");
  });

  test("GET /users returns 403 for non-admin users", async () => {
    // Create regular user
    // Test with regular user token...
  });
});
