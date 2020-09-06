import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    nominal: Number,
    ukuran: String,
  },
  discountPrice: {
    nominal: Number,
    ukuran: String,
  },
  imageUrl: {
    type: String,
  },
  description: {
    type: String,
  },
  madeIn: {
    type: String,
  },
  minOrder: {
    type: String,
  },
  stock: Number,
  codeCategory: Number,
});

const product = mongoose.model("product", productSchema);
export default product;
