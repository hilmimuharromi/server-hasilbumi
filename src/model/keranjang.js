import mongoose from "mongoose";

const keranjangSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
  kuantitas: Number,
  total: Number,
});

const keranjang = mongoose.model("keranjang", keranjangSchema);
export default keranjang;
