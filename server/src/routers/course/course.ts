import express from "express";
import {
  createCourseCard,
  getAllCourseCards,
} from "../../controllers/courses/CourseCard";
import {
  createCourseDetails,
  getCourseDetails,
} from "../../controllers/courses/CourseDetails";
import {
  CreateCourseContents,
  getCourseContents,
} from "../../controllers/courses/CourseContents";
const router = express.Router();

router.route("/create-card").post(createCourseCard);
router.route("/fetch-cards").get(getAllCourseCards);
router.route("/create-details").post(createCourseDetails);
router.route("/fetch-details").get(getCourseDetails);
router.route("/create-contents").post(CreateCourseContents);
router.route("/fetch-contents").get(getCourseContents);

export default router;
