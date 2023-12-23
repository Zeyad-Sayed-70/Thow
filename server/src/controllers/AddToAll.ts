import { Request, Response } from "express";
import UserAccount from "../models/user/userAccount";
import jwt from "jsonwebtoken";

export async function EditAll(req: Request, res: Response) {
  try {
    const {} = req.body;
    // Custom Implementation
  } catch (error: any) {
    console.log(error);
    return res.json({ isValid: false });
  }
}
