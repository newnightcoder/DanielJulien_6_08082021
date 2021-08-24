import mongoose from "mongoose";

const sauceSchema = new mongoose.Schema({
  userId: String,
  name: String,
  manufacturer: String,
  description: String,
  mainPepper: String,
  imgUrl: String,
  heat: Number,
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  usersLiked: [String],
  usersDisliked: [String],
});

const Sauce = mongoose.model("Sauce", sauceSchema);
export default Sauce;
