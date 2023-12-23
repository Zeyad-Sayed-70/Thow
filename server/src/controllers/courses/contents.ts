import { Request, Response } from "express";

// Import the model
import CourseContents from "../../models/courses/modules";

// Create a new course content
export const createCourseContent = async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const { content_id, messages } = req.body;
    if (!content_id || !messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid input" });
    }

    // Check if the content id already exists
    const existingContent = await CourseContents.findOne({ content_id });
    if (existingContent) {
      return res.status(409).json({ error: "Content id already exists" });
    }

    // Create a new course content document
    const newCourseContent = new CourseContents({
      content_id,
      messages,
    });

    // Save the document to the database
    await newCourseContent.save();

    // Return a success response
    res.status(201).json({ message: "Course content created successfully" });
  } catch (error: any) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
};

// Fetch all course contents
export const fetchAllCourseContents = async (req: Request, res: Response) => {
  try {
    // Find all course contents from the database
    const courseContents = await CourseContents.find();

    // Return a success response with the data
    res.status(200).json({ data: courseContents });
  } catch (error: any) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
};

// Fetch a single course content by content id
export const fetchCourseContentById = async (req: Request, res: Response) => {
  try {
    // Get the content id from the request parameters
    const { content_id } = req.params;

    // Find the course content by content id from the database
    const courseContent = await CourseContents.findOne({ content_id });
    if (!courseContent) {
      return res.status(404).json({ error: "Course content not found" });
    }

    // Return a success response with the data
    res.status(200).json({ data: courseContent });
  } catch (error: any) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
};

// Update a course content by content id
export const updateCourseContentById = async (req: Request, res: Response) => {
  try {
    // Get the content id from the request parameters
    const { content_id } = req.params;

    // Validate the request body
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid input" });
    }

    // Find and update the course content by content id from the database
    const updatedCourseContent = await CourseContents.findOneAndUpdate(
      { content_id },
      { messages },
      { new: true }
    );
    if (!updatedCourseContent) {
      return res.status(404).json({ error: "Course content not found" });
    }

    // Return a success response with the data
    res.status(200).json({ data: updatedCourseContent });
  } catch (error: any) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
};

// Delete a course content by content id
export const deleteCourseContentById = async (req: Request, res: Response) => {
  try {
    // Get the content id from the request parameters
    const { content_id } = req.params;

    // Find and delete the course content by content id from the database
    const deletedCourseContent = await CourseContents.findOneAndDelete({
      content_id,
    });
    if (!deletedCourseContent) {
      return res.status(404).json({ error: "Course content not found" });
    }

    // Return a success response with the message
    res.status(200).json({ message: "Course content deleted successfully" });
  } catch (error: any) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
};
