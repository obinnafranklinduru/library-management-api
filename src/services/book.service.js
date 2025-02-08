import Book from "../models/Book.js";
import BorrowRecord from "../models/BorrowRecord.js";
import Author from "../models/Author.js";
import { AppError } from "../utils/appError.js";

export class BookService {
  async createBook(bookData) {
    const [author, existingISBN] = await Promise.all([
      Author.findById(bookData.author),
      Book.findOne({ isbn: bookData.isbn }),
    ]);

    if (!author) throw new AppError("Author not found", 404);
    if (existingISBN) throw new AppError("ISBN already exists", 409);

    return Book.create(bookData);
  }

  async getBooks(page = 1, pageSize = 10) {
    const skip = (page - 1) * pageSize;
    return Book.find()
      .populate("author", "name bio")
      .skip(skip)
      .limit(pageSize);
  }

  async getBookById(id) {
    const book = await Book.findById(id).populate("author", "name bio");
    if (!book) throw new AppError("Book not found", 404);
    return book;
  }

  async updateBook(id, updateData) {
    const book = await Book.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate("author", "name bio");

    if (!book) throw new AppError("Book not found", 404);
    return book;
  }

  async deleteBook(id) {
    const book = await Book.findByIdAndDelete(id);
    if (!book) throw new AppError("Book not found", 404);
    return { message: "Book deleted successfully" };
  }

  async borrowBook(bookId, userId) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const book = await Book.findById(bookId).session(session);
      if (!book) throw new AppError("Book not found", 404);
      if (book.status !== "Available")
        throw new AppError("Book not available", 400);

      const dueAt = new Date();
      dueAt.setDate(dueAt.getDate() + 14); // 2 weeks

      await Book.updateOne(
        { _id: bookId },
        { status: "Borrowed" },
        { session }
      );

      const borrowRecord = await BorrowRecord.create(
        [
          {
            user: userId,
            book: bookId,
            dueAt,
          },
        ],
        { session }
      );

      await session.commitTransaction();
      return borrowRecord[0];
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async returnBook(bookId, userId) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const book = await Book.findById(bookId).session(session);
      if (!book) throw new AppError("Book not found", 404);

      const record = await BorrowRecord.findOneAndUpdate(
        { book: bookId, user: userId, returnedAt: null },
        { returnedAt: new Date() },
        { new: true, session }
      );

      if (!record) throw new AppError("No active borrowing record", 400);

      await Book.updateOne(
        { _id: bookId },
        { status: "Available" },
        { session }
      );

      await session.commitTransaction();
      return record;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}
