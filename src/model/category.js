import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  code: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  imageUrl: String,
});

const category = mongoose.model("category", categorySchema);
export default category;
