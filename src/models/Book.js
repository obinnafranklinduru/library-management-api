import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    isbn: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{13}$/, "Invalid ISBN format"],
    },
    title: {
      type: String,
      required: true,
    },
    publishedDate: {
      type: Date,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
    status: {
      type: String,
      enum: ["Available", "Borrowed"],
      default: "Available",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);
