import mongoose from "mongoose";

const UserAnswer = mongoose.model(
  "useranswer",
  new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "question",
      required: true,
    },
    point: {
      type: Number,
      required: true,
    },
  })
);

export default UserAnswer;
