import mongoose, { Schema } from "mongoose";

const UserAccountsSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    default: null,
  },
  createAT: {
    type: Date,
    default: new Date(),
  },
  verified: {
    type: Boolean,
  },
});

export default mongoose.model("UserAccount", UserAccountsSchema);
