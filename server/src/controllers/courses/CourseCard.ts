import { Request, Response } from "express";
import CourseCard from "../../models/courses/card";

const createCourseCard = async (req: Request, res: Response) => {
  try {
    const { course_id, name_data, logo, level_data, theme_data, type } =
      req.body;

    if (
      !course_id ||
      !name_data?.content ||
      !type ||
      !logo ||
      !level_data?.content ||
      !theme_data.backgroundColor
    )
      return res.status(400).json({ message: "Missing data" });

    CourseCard.create({
      name: name_data,
      course_id,
      logo,
      type,
      level: level_data,
      theme: theme_data,
    })
      .then(() => {
        res.status(200).json({ message: "Created a Card Successfuly" });
      })
      .catch((err: any) => {
        if (err) {
          console.log(err);
          if (err.code == 11000) {
            res.status(400).json({
              message: `Uh-oh! We hit a snag (Error E11000). It seems there's a duplicate entry for the course named "${name_data.content}", Please try another title`,
            });
          }
          res.status(400).json({ message: err.message });
        }
      });
  } catch (error) {
    console.log(error);
  }
};

const getAllCourseCards = async (req: Request, res: Response) => {
  try {
    const { type, name } = req.query;
    const filter: any = {};

    if (type) filter.type = new RegExp(type as string, "i");

    if (name) filter["name.content"] = new RegExp(name as string, "i");

    const cards = await CourseCard.find(filter);

    res.json({ message: "Fetch All Wanted Cards Successfuly", cards });
  } catch (error) {
    console.log(error);
  }
};

export { createCourseCard, getAllCourseCards };
