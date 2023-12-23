import mongoose, { Schema } from "mongoose";

const CourseSectionsSchema = new Schema({
  course_name: {
    type: String,
    required: true,
    unique: true,
  },
  sections: {
    type: [
      {
        _id: {
          type: String,
          required: true,
        },
        module_id: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          default: "section",
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

export default mongoose.model("Course-Sections", CourseSectionsSchema);
