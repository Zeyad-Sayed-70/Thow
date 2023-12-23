import { Request, Response } from "express";
import CourseContents from "../../models/courses/contents";

const CreateCourseContents = async (req: Request, res: Response) => {
  try {
    const { course_id, sections } = req.body;

    if (!sections) return res.json({ message: "Please provide sections" });

    CourseContents.create({ course_id, sections })
      .then(() => {
        res.json({ message: "Course contents created successfully" });
      })
      .catch((err: any) => {
        if (err) {
          console.log(err);
          return res.json({ message: err.message });
        }
      });
  } catch (error) {
    console.log(error);
  }
};

const getCourseContents = async (req: Request, res: Response) => {
  try {
    const { course_name } = req.query;

    if (!course_name) return res.json({ message: "Please provide course id" });

    CourseContents.findOne({
      name: (course_name as string).split("-").join(" "),
    })
      .then((data) => {
        if (!data) {
          return res.status(400).json({
            message: "Course contents not found",
          });
        }

        res.json({
          message: "Course contents Fetched successfully",
          contents: data,
        });
      })
      .catch((err: any) => {
        if (err) {
          console.log(err);
          return res.json({ message: err.message });
        }
      });
  } catch (error) {
    console.log(error);
  }
};

export { CreateCourseContents, getCourseContents };
