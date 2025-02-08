import { AuthorService } from "../services/author.service.js";

export class AuthorController {
  constructor() {
    this.authorService = new AuthorService();
  }

  async createAuthor(req, res, next) {
    try {
      const author = await this.authorService.createAuthor(req.body);
      res.status(201).json(author);
    } catch (error) {
      next(error);
    }
  }

  async getAuthors(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
      const authors = await this.authorService.getAllAuthors(page, pageSize);
      res.json(authors);
    } catch (error) {
      next(error);
    }
  }

  async getAuthor(req, res, next) {
    try {
      const author = await this.authorService.getAuthorById(req.params.id);
      res.json(author);
    } catch (error) {
      next(error);
    }
  }

  async updateAuthor(req, res, next) {
    try {
      const author = await this.authorService.updateAuthor(
        req.params.id,
        req.body
      );
      res.json(author);
    } catch (error) {
      next(error);
    }
  }

  async deleteAuthor(req, res, next) {
    try {
      const result = await this.authorService.deleteAuthor(req.params.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
