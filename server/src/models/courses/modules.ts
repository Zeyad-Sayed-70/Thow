import mongoose, { Schema } from "mongoose";

const CourseModulesSchema = new Schema({
  module_id: {
    type: String,
    required: true,
    unique: true,
  },
  modules: {
    type: [
      {
        _id: {
          type: String,
          required: true,
        },
        lesson_id: {
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

export default mongoose.model("Course-Modules", CourseModulesSchema);
