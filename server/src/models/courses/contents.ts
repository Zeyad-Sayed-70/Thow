import mongoose, { Schema } from "mongoose";

const CourseContentsSchema = new Schema({
  content_id: {
    type: String,
    required: true,
    unique: true,
  },
  messages: {
    type: [
      {
        _id: {
          type: String,
          required: true,
          unique: true,
        },
        type: {
          type: String,
          default: "module",
          readonly: true,
        },
        types: [String],
        values: [],
        hasOptions: {
          type: Boolean,
          default: false,
        },
        options: [
          {
            value: {
              type: String,
              required: true,
            },
            label: {
              type: String,
              required: true,
            },
          },
        ],
        nextMessage: {
          type: {} || String || null,
          default: null,
        },
        action: {
          type: "ask-ai",
          prompt: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    required: true,
  },
});

export default mongoose.model("Course-Contents", CourseContentsSchema);
