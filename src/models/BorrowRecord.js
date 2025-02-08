import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  borrowedAt: {
    type: Date,
    default: Date.now,
  },
  dueAt: {
    type: Date,
    required: true,
  },
  returnedAt: Date,
});

export default mongoose.model("BorrowRecord", borrowSchema);
