import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "min 6 lettres"],
    maxLength: [24, "max 24 lettres"],
  },
});

userSchema.pre("save", function () {
  const SALT = bcrypt.genSaltSync();
  console.log(`SALT! ${SALT}`);
  this.password = bcrypt.hashSync(this.password, SALT);
  console.log(`hashed password😎: ${this.password}`);
});

const User = mongoose.model("User", userSchema, "Hot-Takes");

export default User;
