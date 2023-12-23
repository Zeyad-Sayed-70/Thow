import mongoose, { Schema } from "mongoose";

const VerificationCodeSchema = new Schema(
  {
    // Your existing fields go here
    email: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    // Add an expires field for automatic document expiration
    expiresAt: {
      type: Date,
      expires: "3m", // Documents will expire 3 minutes after the expiresAt timestamp
      default: Date.now,
    },
  },
  { timestamps: true } // This adds createdAt and updatedAt timestamps to your schema
);

export default mongoose.model("VerificationCode", VerificationCodeSchema);
