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
  handphone: {
    type: String,
  },
  birthdate: {
    type: String,
  },
  gender: {
    type: String,
  },
});

const profile = mongoose.model("profile", profileSchema);

export default profile;
