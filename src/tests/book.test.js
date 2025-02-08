import request from "supertest";
import app from "../server.js";
import Book from "../models/Book.js";
import User from "../models/User.js";
import Author from "../models/Author.js";

describe("Book Management", () => {
  let adminToken, memberToken, bookId, authorId;

  beforeAll(async () => {
    // Create test author
    const author = await Author.create({ name: "Test Author" });
    authorId = author._id;

    // Create test book
    const book = await Book.create({
      isbn: "9783161484100",
      title: "Test Book",
      author: authorId,
      publishedDate: "2020-01-01",
    });
    bookId = book._id;

    // Get admin token
    await request(app)
      .post("/auth/login")
      .send({ email: "admin@test.com", password: "adminpass" })
      .then((res) => (adminToken = res.headers["set-cookie"]));

    // Get member token
    await request(app)
      .post("/auth/login")
      .send({ email: "member@test.com", password: "memberpass" })
      .then((res) => (memberToken = res.headers["set-cookie"]));
  });

  test("POST /books creates new book (Admin)", async () => {
    const response = await request(app)
      .post("/books")
      .set("Cookie", adminToken)
      .send({
        isbn: "9780451524935",
        title: "1984",
        author: authorId,
        publishedDate: "1949-06-08",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("_id");
  });

  test("POST /books/:id/borrow allows member to borrow book", async () => {
    const response = await request(app)
      .post(`/books/${bookId}/borrow`)
      .set("Cookie", memberToken);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("dueAt");
  });
});
