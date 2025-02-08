import request from "supertest";
import app from "../server.js";
import Author from "../models/Author.js";

describe("Author Management", () => {
  let authCookie;

  beforeAll(async () => {
    // Login as librarian
    await request(app)
      .post("/auth/login")
      .send({ email: "librarian@test.com", password: "librarianpass" })
      .then((res) => {
        authCookie = res.headers["set-cookie"];
      });
  });

  test("POST /authors creates new author (Admin/Librarian)", async () => {
    const response = await request(app)
      .post("/authors")
      .set("Cookie", authCookie)
      .send({
        name: "J.K. Rowling",
        bio: "British author best known for Harry Potter",
        birthdate: "1965-07-31",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body.name).toBe("J.K. Rowling");
  });

  test("PUT /authors/:id updates author details", async () => {
    const author = await Author.create({ name: "Test Author" });
    const response = await request(app)
      .put(`/authors/${author._id}`)
      .set("Cookie", authCookie)
      .send({ name: "Updated Author Name" });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("Updated Author Name");
  });
});
