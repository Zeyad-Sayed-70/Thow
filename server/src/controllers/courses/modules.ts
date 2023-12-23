import { Request, Response } from "express";

// Import the model
import CourseModules from "../../models/courses/modules";

// Create a new course module
export const createCourseModule = async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const { module_id, modules } = req.body;
    if (!module_id || !modules || !Array.isArray(modules)) {
      return res.status(400).json({ error: "Invalid input" });
    }

    // Check if the module id already exists
    const existingModule = await CourseModules.findOne({ module_id });
    if (existingModule) {
      return res.status(409).json({ error: "Module id already exists" });
    }

    // Create a new course module document
    const newCourseModule = new CourseModules({
      module_id,
      modules,
    });

    // Save the document to the database
    await newCourseModule.save();

    // Return a success response
    res.status(201).json({ message: "Course module created successfully" });
  } catch (error: any) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
};

// Fetch all course modules
export const fetchAllCourseModules = async (req: Request, res: Response) => {
  try {
    // Find all course modules from the database
    const courseModules = await CourseModules.find();

    // Return a success response with the data
    res.status(200).json({ data: courseModules });
  } catch (error: any) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
};

// Fetch a single course module by module id
export const fetchCourseModuleById = async (req: Request, res: Response) => {
  try {
    // Get the module id from the request parameters
    const { module_id } = req.params;

    // Find the course module by module id from the database
    const courseModule = await CourseModules.findOne({ module_id });
    if (!courseModule) {
      return res.status(404).json({ error: "Course module not found" });
    }

    // Return a success response with the data
    res.status(200).json({ data: courseModule });
  } catch (error: any) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
};

// Update a course module by module id
export const updateCourseModuleById = async (req: Request, res: Response) => {
  try {
    // Get the module id from the request parameters
    const { module_id } = req.params;

    // Validate the request body
    const { modules } = req.body;
    if (!modules || !Array.isArray(modules)) {
      return res.status(400).json({ error: "Invalid input" });
    }

    // Find and update the course module by module id from the database
    const updatedCourseModule = await CourseModules.findOneAndUpdate(
      { module_id },
      { modules },
      { new: true }
    );
    if (!updatedCourseModule) {
      return res.status(404).json({ error: "Course module not found" });
    }

    // Return a success response with the data
    res.status(200).json({ data: updatedCourseModule });
  } catch (error: any) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
};

// Delete a course module by module id
export const deleteCourseModuleById = async (req: Request, res: Response) => {
  try {
    // Get the module id from the request parameters
    const { module_id } = req.params;

    // Find and delete the course module by module id from the database
    const deletedCourseModule = await CourseModules.findOneAndDelete({
      module_id,
    });
    if (!deletedCourseModule) {
      return res.status(404).json({ error: "Course module not found" });
    }

    // Return a success response with the message
    res.status(200).json({ message: "Course module deleted successfully" });
  } catch (error: any) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
};
