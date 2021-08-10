import mongoose from "mongoose";

const userSchema = mongoose.model(
  "Users",
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 24,
    },
  },
  "Hot-Takes"
);
export default userSchema;
