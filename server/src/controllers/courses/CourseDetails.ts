import { Request, Response } from "express";
import CourseDetails from "../../models/courses/details";

const createCourseDetails = async (req: Request, res: Response) => {
  try {
    const {
      thumbnail,
      title,
      overview,
      prerequisites,
      learning_goals,
      time_to_finish,
      enroll_link,
    } = req.body;

    if (
      !thumbnail ||
      !title ||
      !overview ||
      !prerequisites ||
      !learning_goals ||
      !time_to_finish ||
      !enroll_link
    )
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });

    CourseDetails.create({
      thumbnail,
      title,
      overview,
      prerequisites,
      learning_goals,
      time_to_finish,
      enroll_link,
    })
      .then(() => {
        res.json({ message: "Created Course Details Successfuly" });
      })
      .catch((err: any) => {
        if (err) {
          console.log(err);
          res.status(400).json({ message: "Failed to create Course Details" });
        }
      });
  } catch (error) {
    console.log(error);
  }
};

const getCourseDetails = async (req: Request, res: Response) => {
  try {
    const { course_name } = req.query;

    if (!course_name)
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });

    const courseDetails = await CourseDetails.findOne({
      name: (course_name as string).split("-").join(" "),
    });

    if (!courseDetails?._id)
      return res.status(400).json({ message: "Course Details not found" });

    res.json({ message: "Fetch Course Details Successfuly", courseDetails });
  } catch (error) {
    console.log(error);
  }
};

export { createCourseDetails, getCourseDetails };
