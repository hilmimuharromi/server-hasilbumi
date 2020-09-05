import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  nomorhp: {
    type: String,
  },
  tanggalLahir: {
    type: Date,
    default: Date.now,
  },
  jenisKelamin: {
    type: String,
  },
  alamat: {
    type: String,
  },
});

const profile = mongoose.model("profile", profileSchema);

export default profile;
