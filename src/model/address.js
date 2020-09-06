import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  jenis: String,
  label: String,
  namaPenerima: String,
  handphone: String,
  lengkap: String,
  infoTambahan: String,
  kelurahan: String,
  kecamatan: String,
  kota: String,
  provinsi: String,
  kodePos: String,
  koordinat: String,
});

const address = mongoose.model("address", addressSchema);
export default address;
