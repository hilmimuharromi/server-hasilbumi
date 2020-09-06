import mongoose from "mongoose";

const kategoriSchema = new mongoose.Schema({
  kode: {
    type: Number,
    required: true,
    unique: true,
  },
  nama: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  gambar: String,
});

const kategori = mongoose.model("kategori", kategoriSchema);
export default kategori;
