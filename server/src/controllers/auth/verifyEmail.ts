import { Response, Request } from "express";
import { generateRandomCode } from "../../lib/generateRandomCode";
import { sendVerificationEmail } from "../../lib/verificationEmail";
import VerificationCode from "../../models/auth/verificationCode";

export async function sendValidationCode(req: Request, res: Response) {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      return res.json({ message: "Username and Email are requried" });
    }

    // create a verification code
    const code = generateRandomCode().toString();

    // send the verification code to user's email
    sendVerificationEmail(username, email, code);

    // store the verification code in db
    VerificationCode.create({
      email,
      code,
    });

    res.status(200).json({ message: `we sent a mail message to ${email}` });
  } catch (error) {
    console.log(error);
  }
}

export async function checkCodeValidation(req: Request, res: Response) {
  try {
    const { email, verificationCode: code } = req.body;

    if (!email || !code) {
      return res.json({ message: "Email and Verification Code are required" });
    }

    VerificationCode.findOne({ email, code }).then((data) => {
      if (data?._id) {
        return res.json({
          message: "The verification Code is valid",
          isValid: true,
        });
      }

      return res.json({
        message: "The verification Code is not valid",
        isValid: false,
      });
    });
  } catch (error) {
    console.log(error);
  }
}
