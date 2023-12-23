import { Request, Response } from "express";
import UserAccount from "../../models/user/userAccount";

export async function checkUsername(req: Request, res: Response) {
  try {
    const { username } = req.query;

    if (!username) return res.json({ message: "Username is not found" });

    UserAccount.exists({ username }).then((data) => {
      if (data?._id) {
        return res.json({ isUnique: false });
      } else {
        return res.json({ isUnique: true });
      }
    });
  } catch (error) {
    console.log(error);
  }
}

export async function checkEmail(req: Request, res: Response) {
  try {
    const { email } = req.query;

    if (!email) return res.json({ message: "Email is not found" });

    UserAccount.exists({ email }).then((data) => {
      if (data?._id) {
        return res.json({ isUnique: false });
      } else {
        return res.json({ isUnique: true });
      }
    });
  } catch (error) {
    console.log(error);
  }
}
