import mongoose, { Schema } from "mongoose";

const CourseLessonsSchema = new Schema({
  lesson_id: {
    type: String,
    required: true,
    unique: true,
  },
  lessons: {
    type: [
      {
        _id: {
          type: String,
          required: true,
        },
        content_id: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          default: "module",
          readonly: true,
        },
        name: {
          type: String,
          required: true,
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

export default mongoose.model("Course-Lessons", CourseLessonsSchema);
