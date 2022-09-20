import mongoose from "mongoose";

const Answer = mongoose.model(
  "answer",
  new mongoose.Schema({
    answer: {
      type: String,
      required: true,
    },
  })
);

export default Answer;
