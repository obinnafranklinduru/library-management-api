import { BookService } from "../services/book.service.js";
import { AppError } from "../utils/appError.js";

export class BookController {
  constructor() {
    this.bookService = new BookService();
  }

  async createBook(req, res, next) {
    try {
      const book = await this.bookService.createBook(req.body);
      res.status(201).json(book);
    } catch (error) {
      next(error);
    }
  }

  async getBooks(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
      const books = await this.bookService.getBooks(page, pageSize);
      res.json(books);
    } catch (error) {
      next(error);
    }
  }

  async getBook(req, res, next) {
    try {
      const book = await this.bookService.getBookById(req.params.id);
      res.json(book);
    } catch (error) {
      next(error);
    }
  }

  async updateBook(req, res, next) {
    try {
      const book = await this.bookService.updateBook(req.params.id, req.body);
      res.json(book);
    } catch (error) {
      next(error);
    }
  }

  async deleteBook(req, res, next) {
    try {
      const result = await this.bookService.deleteBook(req.params.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async borrowBook(req, res, next) {
    try {
      const record = await this.bookService.borrowBook(
        req.params.id,
        req.user._id
      );
      res.json(record);
    } catch (error) {
      next(error);
    }
  }

  async returnBook(req, res, next) {
    try {
      const record = await this.bookService.returnBook(
        req.params.id,
        req.user._id
      );
      res.json(record);
    } catch (error) {
      next(error);
    }
  }
}
