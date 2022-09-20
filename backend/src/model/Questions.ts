import mongoose from "mongoose";

const Question = mongoose.model(
  "question",
  new mongoose.Schema({
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "answer",
      required: true,
    },
    options: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "answer",
        required: true,
      },
    ],
  })
);

export default Question;
