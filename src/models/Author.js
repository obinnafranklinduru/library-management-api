import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    birthdate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Author", authorSchema);
