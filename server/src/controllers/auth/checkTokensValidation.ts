import { Request, Response } from "express";
import UserAccount from "../../models/user/userAccount";
import jwt from "jsonwebtoken";

export async function checkTokensValidation(req: Request, res: Response) {
  try {
    const { token } = req.body;

    if (!token) return res.json({ message: "Token is not found" });

    // decode token
    const data: any = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

    if (!data?._id) return res.json({ isValid: false });

    UserAccount.findById(data._id).then((data) => {
      if (data?._id) {
        return res.json({ isValid: true });
      } else {
        return res.json({ isValid: false });
      }
    });
  } catch (error: any) {
    console.log(error);
    return res.json({ isValid: false });
  }
}
