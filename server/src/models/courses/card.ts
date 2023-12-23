import mongoose, { Schema } from "mongoose";

const CourseCardSchema = new Schema({
  course_name: {
    content: {
      type: String,
      required: true,
      unique: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  course_type: {
    type: String,
    required: true,
  },
  course_logo: {
    type: String,
    required: true,
  },
  course_level: {
    content: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  course_theme: {
    backgroundColor: {
      type: String,
    },
    color1: {
      type: String,
    },
    color2: {
      type: String,
    },
  },
});

export default mongoose.model("Course-Card", CourseCardSchema);
