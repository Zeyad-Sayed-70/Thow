import mongoose, { Schema } from "mongoose";

const CourseDetailsSchema = new Schema({
  course_name: {
    type: String,
    required: true,
    unique: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  prerequisites: {
    type: String,
    required: true,
  },
  learning_goals: {
    type: [String],
    required: true,
  },
  time_to_finish: {
    type: String,
    required: true,
  },
  enroll_link: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Course-Details", CourseDetailsSchema);
