import express from "express";
import { BookController } from "../controllers/book.controller.js";
import { CreateBookDto } from "../dto/books/create-book.dto.js";
import { UpdateBookDto } from "../dto/books/update-book.dto.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { authenticate } from "../middlewares/auth.js";
import { roles } from "../middlewares/roles.js";

const router = express.Router();
const bookController = new BookController();

// Public endpoints
router.get("/", bookController.getBooks.bind(bookController));
router.get("/:id", bookController.getBook.bind(bookController));

// Admin/Librarian protected
router.use(authenticate, roles(["Admin", "Librarian"]));

router.post(
  "/",
  validateRequest(CreateBookDto),
  bookController.createBook.bind(bookController)
);
router.put(
  "/:id",
  validateRequest(UpdateBookDto),
  bookController.updateBook.bind(bookController)
);
router.delete("/:id", bookController.deleteBook.bind(bookController));

// Member protected
router.post(
  "/:id/borrow",
  authenticate,
  roles(["Member"]),
  bookController.borrowBook.bind(bookController)
);

router.post(
  "/:id/return",
  authenticate,
  roles(["Member"]),
  bookController.returnBook.bind(bookController)
);

export default router;
