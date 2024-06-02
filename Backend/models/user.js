import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String },
  password: { type: String, required: true },
  confirmPassword: { type: String },
  country: { type: String },
  state: { type: String },
  city: { type: String },
  profilephoto: { type: String },
  adoptinglist: [{ petid: { type: String }, chatEnabled: { type: String, default: false }}],
  rejectedlist: [{petid: { type: String }}],
  approvedlist: [{petid: { type: String }}]
});         

export const User = mongoose.model("User", UserSchema);
