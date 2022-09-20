import mongoose from "mongoose";

const User = mongoose.model(
  "user",
  new mongoose.Schema({
    email: {
      type: String,
      required: true,
    },
  })
);

export default User;
