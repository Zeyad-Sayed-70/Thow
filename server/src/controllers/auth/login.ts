import { Response, Request } from "express";
import UserAccount from "../../models/user/userAccount";
import jwt from "jsonwebtoken";
import { sendSessionTokenAsMail } from "../../lib/verificationEmail";
import { generateToken } from "../../lib/generateToken";
import SessionTokens from "../../models/auth/sessionTokens";

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ message: "Email and Password are requried" });
    }

    UserAccount.findOne({ email, password }).then((data) => {
      if (data?._id) {
        // create an account token
        const token = jwt.sign(
          { _id: data._id, email: data.email },
          process.env.JWT_SECRET_KEY as string
        );

        return res
          .status(200)
          .json({ message: `You Logined Successfuly`, canLogin: true, token });
      }

      res.status(200).json({
        message: `Incorrect Email or Password`,
        canLogin: false,
        token: null,
      });
    });
  } catch (error) {
    console.log(error);
  }
}

export async function createSessionToken(req: Request, res: Response) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({ message: "Email is requried" });
    }

    // create token
    const session_token = generateToken();

    // send mail to user email
    sendSessionTokenAsMail(email, session_token);

    // check first if this user has session before and delete it
    await SessionTokens.findOneAndDelete({ email });

    // store session token in db
    SessionTokens.create({
      email,
      token: session_token,
    });

    res.status(200).json({
      message:
        "You have been recived a message in your email, Please check your inbox.",
    });
  } catch (error) {
    console.log(error);
  }
}

export async function verifySessionToken(req: Request, res: Response) {
  try {
    const { email, session_token } = req.body;

    if (!email || !session_token) {
      return res.json({ message: "Email and Session_token are requried" });
    }

    SessionTokens.findOne({ email, token: session_token }).then((data) => {
      if (data?._id) {
        return res.status(200).json({
          isTokenValid: true,
        });
      }

      return res.status(200).json({
        isTokenValid: false,
      });
    });
  } catch (error) {
    console.log(error);
  }
}

export async function resetPassword(req: Request, res: Response) {
  try {
    const { email, newPassword } = req.body;

    if (!email) {
      return res.json({ message: "Email is requried" });
    }

    UserAccount.findOneAndUpdate(
      { email },
      { password: newPassword },
      { new: true }
    ).then((data) => {
      if (data?._id) {
        return res.status(200).json({
          message: "You have updated your password",
        });
      }

      return res.status(200).json({
        message:
          "It appears that this account may not exist. Please consider registering first.",
      });
    });
  } catch (error) {
    console.log(error);
  }
}
