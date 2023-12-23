import { Request, Response } from "express";

// Import the model
import CourseSections from "../../models/courses/sections";

// Create a new course section
export const createCourseSection = async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const { course_name, sections } = req.body;
    if (!course_name || !sections || !Array.isArray(sections)) {
      return res.status(400).json({ error: "Invalid input" });
    }

    // Check if the course name already exists
    const existingCourse = await CourseSections.findOne({ course_name });
    if (existingCourse) {
      return res.status(409).json({ error: "Course name already exists" });
    }

    // Create a new course section document
    const newCourseSection = new CourseSections({
      course_name,
      sections,
    });

    // Save the document to the database
    await newCourseSection.save();

    // Return a success response
    res.status(201).json({ message: "Course section created successfully" });
  } catch (error: any) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
};

// Fetch all course sections
export const fetchAllCourseSections = async (req: Request, res: Response) => {
  try {
    // Find all course sections from the database
    const courseSections = await CourseSections.find();

    // Return a success response with the data
    res.status(200).json({ data: courseSections });
  } catch (error: any) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
};

// Fetch a single course section by course name
export const fetchCourseSectionByName = async (req: Request, res: Response) => {
  try {
    // Get the course name from the request parameters
    const { course_name } = req.params;

    // Find the course section by course name from the database
    const courseSection = await CourseSections.findOne({ course_name });
    if (!courseSection) {
      return res.status(404).json({ error: "Course section not found" });
    }

    // Return a success response with the data
    res.status(200).json({ data: courseSection });
  } catch (error: any) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
};

// Update a course section by course name
export const updateCourseSectionByName = async (
  req: Request,
  res: Response
) => {
  try {
    // Get the course name from the request parameters
    const { course_name } = req.params;

    // Validate the request body
    const { sections } = req.body;
    if (!sections || !Array.isArray(sections)) {
      return res.status(400).json({ error: "Invalid input" });
    }

    // Find and update the course section by course name from the database
    const updatedCourseSection = await CourseSections.findOneAndUpdate(
      { course_name },
      { sections },
      { new: true }
    );
    if (!updatedCourseSection) {
      return res.status(404).json({ error: "Course section not found" });
    }

    // Return a success response with the data
    res.status(200).json({ data: updatedCourseSection });
  } catch (error: any) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
};

// Delete a course section by course name
export const deleteCourseSectionByName = async (
  req: Request,
  res: Response
) => {
  try {
    // Get the course name from the request parameters
    const { course_name } = req.params;

    // Find and delete the course section by course name from the database
    const deletedCourseSection = await CourseSections.findOneAndDelete({
      course_name,
    });
    if (!deletedCourseSection) {
      return res.status(404).json({ error: "Course section not found" });
    }

    // Return a success response with the message
    res.status(200).json({ message: "Course section deleted successfully" });
  } catch (error: any) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
};
