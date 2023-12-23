import { Request, Response } from "express";

// Import the model
import CourseLessons from "../../models/courses/lessons";

// Create a new course lesson
export const createCourseLesson = async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const { lesson_id, lessons } = req.body;
    if (!lesson_id || !lessons || !Array.isArray(lessons)) {
      return res.status(400).json({ error: "Invalid input" });
    }

    // Check if the lesson id already exists
    const existingLesson = await CourseLessons.findOne({ lesson_id });
    if (existingLesson) {
      return res.status(409).json({ error: "Lesson id already exists" });
    }

    // Create a new course lesson document
    const newCourseLesson = new CourseLessons({
      lesson_id,
      lessons,
    });

    // Save the document to the database
    await newCourseLesson.save();

    // Return a success response
    res.status(201).json({ message: "Course lesson created successfully" });
  } catch (error: any) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
};

// Fetch all course lessons
export const fetchAllCourseLessons = async (req: Request, res: Response) => {
  try {
    // Find all course lessons from the database
    const courseLessons = await CourseLessons.find();

    // Return a success response with the data
    res.status(200).json({ data: courseLessons });
  } catch (error: any) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
};

// Fetch a single course lesson by lesson id
export const fetchCourseLessonById = async (req: Request, res: Response) => {
  try {
    // Get the lesson id from the request parameters
    const { lesson_id } = req.params;

    // Find the course lesson by lesson id from the database
    const courseLesson = await CourseLessons.findOne({ lesson_id });
    if (!courseLesson) {
      return res.status(404).json({ error: "Course lesson not found" });
    }

    // Return a success response with the data
    res.status(200).json({ data: courseLesson });
  } catch (error: any) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
};

// Update a course lesson by lesson id
export const updateCourseLessonById = async (req: Request, res: Response) => {
  try {
    // Get the lesson id from the request parameters
    const { lesson_id } = req.params;

    // Validate the request body
    const { lessons } = req.body;
    if (!lessons || !Array.isArray(lessons)) {
      return res.status(400).json({ error: "Invalid input" });
    }

    // Find and update the course lesson by lesson id from the database
    const updatedCourseLesson = await CourseLessons.findOneAndUpdate(
      { lesson_id },
      { lessons },
      { new: true }
    );
    if (!updatedCourseLesson) {
      return res.status(404).json({ error: "Course lesson not found" });
    }

    // Return a success response with the data
    res.status(200).json({ data: updatedCourseLesson });
  } catch (error: any) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
};

// Delete a course lesson by lesson id
export const deleteCourseLessonById = async (req: Request, res: Response) => {
  try {
    // Get the lesson id from the request parameters
    const { lesson_id } = req.params;

    // Find and delete the course lesson by lesson id from the database
    const deletedCourseLesson = await CourseLessons.findOneAndDelete({
      lesson_id,
    });
    if (!deletedCourseLesson) {
      return res.status(404).json({ error: "Course lesson not found" });
    }

    // Return a success response with the message
    res.status(200).json({ message: "Course lesson deleted successfully" });
  } catch (error: any) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
};
