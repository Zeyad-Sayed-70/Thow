import mongoose, { Schema } from "mongoose";

const SessionTokensSchema = new Schema(
  {
    // Your existing fields go here
    email: {
      type: String,
      required: true,
      unique: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    // Add an expires field for automatic document expiration
    expiresAt: {
      type: Date,
      expires: "5m", // Documents will expire 3 minutes after the expiresAt timestamp
      default: Date.now,
    },
  },
  { timestamps: true } // This adds createdAt and updatedAt timestamps to your schema
);

export default mongoose.model("SessionTokens", SessionTokensSchema);
