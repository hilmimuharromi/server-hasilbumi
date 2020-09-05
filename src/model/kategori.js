import mongoose from "mongoose";

const kategoriSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
    unique: true,
  },
  gambar: String,
});

const kategori = mongoose.model("kategori", kategoriSchema);
export default kategori;
