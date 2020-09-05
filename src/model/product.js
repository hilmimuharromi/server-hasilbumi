import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  harga: {
    nominal: Number,
    ukuran: String,
  },
  hargaDiskon: {
    nominal: Number,
    ukuran: String,
  },
  gambar: {
    type: String,
  },
  deskripsi: {
    type: String,
  },
  asal: {
    type: String,
  },
  minimalOrder: {
    type: String,
  },
  stok: Number,
  kategori: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "kategori",
  },
});

const product = mongoose.model("product", productSchema);
export default product;
