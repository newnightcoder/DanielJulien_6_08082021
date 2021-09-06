import bcrypt from "bcrypt";
import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

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
    minLength: [6, "min 6 caractères"],
    maxLength: [20, "max 20 caractères"],
  },
});

// mongoose PRE hook to hash password before saving to DB
userSchema.pre("save", function () {
  const salt = bcrypt.genSaltSync(); // genSaltSync() is synchronous. for async, use genSalt()
  this.password = bcrypt.hashSync(this.password, salt); //  hashSync() is synchronous. for async, use hash()
});

userSchema.plugin(mongooseUniqueValidator);

// mongoose Model
const User = mongoose.model("User", userSchema, "Users");
export default User;
