import bcrypt from "bcrypt";
import mongoose from "mongoose";

// mongoose Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "min 6 lettres"],
    maxLength: [24, "max 24 lettres"],
  },
});

// mongoose PRE hook to hash password before saving to DB
userSchema.pre("save", function () {
  const salt = bcrypt.genSaltSync(); // genSaltSync() is synchronous. for async, use genSalt()
  this.password = bcrypt.hashSync(this.password, salt); //  hashSync() is synchronous. for async, use hash()
});

// mongoose Model
const User = mongoose.model("User", userSchema, "Users");
export default User;
