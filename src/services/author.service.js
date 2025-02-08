import Author from "../models/Author.js";
import { AppError } from "../utils/appError.js";

export class AuthorService {
  async createAuthor(authorData) {
    try {
      return await Author.create(authorData);
    } catch (error) {
      throw new AppError("Error creating author", 500);
    }
  }

  async getAllAuthors(page = 1, pageSize = 10) {
    const skip = (page - 1) * pageSize;
    return Author.find().skip(skip).limit(pageSize);
  }

  async getAuthorById(id) {
    const author = await Author.findById(id);
    if (!author) throw new AppError("Author not found", 404);
    return author;
  }

  async updateAuthor(id, updateData) {
    const author = await Author.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!author) throw new AppError("Author not found", 404);
    return author;
  }

  async deleteAuthor(id) {
    const author = await Author.findByIdAndDelete(id);
    if (!author) throw new AppError("Author not found", 404);
    return { message: "Author deleted successfully" };
  }
}
