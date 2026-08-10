import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false
    },

    question: {
      type: String,
      required: true
    },

    answer: {
      type: String
    },

    createdAt: {
      type: Date,
      default: Date.now
    }
  }
);

export default mongoose.model("Question", questionSchema);