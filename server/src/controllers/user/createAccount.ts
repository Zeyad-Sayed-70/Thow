import { Request, Response } from "express";
import UserAccount from "../../models/user/userAccount";
import jwt from "jsonwebtoken";

export async function createNewAccount(req: Request, res: Response) {
  try {
    const { username, email, password, by } = req.body;

    if (!username || !email)
      return res.json({
        message: "The Username and Email are required fields.",
      });

    // sign in/up by Google
    if (by === "google") {
      const data = await UserAccount.findOne({ email });

      if (data?._id) {
        // create an account token
        const token = jwt.sign(
          { _id: data._id, email: data.email },
          process.env.JWT_SECRET_KEY as string
        );

        return res
          .status(200)
          .json({ message: "Account Logined Successfully!", token });
      }
    }

    // create the account
    UserAccount.create({
      username,
      email,
      password,
      verified: true,
    })
      .then((data) => {
        // create an account token
        const token = jwt.sign(
          { _id: data._id, email: data.email },
          process.env.JWT_SECRET_KEY as string
        );

        res
          .status(200)
          .json({ message: "Account Created Successfully!", token });
      })
      .catch((err) =>
        res.json({
          message: "There is something wrong when creating account",
          error: err,
        })
      );
  } catch (error) {
    console.log(error);
  }
}
