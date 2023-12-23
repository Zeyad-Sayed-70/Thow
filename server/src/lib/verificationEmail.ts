import nodemailer from "nodemailer";

// create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "games99912345@gmail.com",
    pass: "dfhi vldr ymni clic",
  },
});

export function sendVerificationEmail(
  name: string,
  email: string,
  validationToken: string
) {
  const mailOptions = {
    from: "games99912345@gmail.com",
    to: email,
    subject: "Welcome to The House of Wisdom - Confirm Your Email",
    text: `
    Dear ${name},

    Thank you for joining The House of Wisdom! We're excited to have you on board.

    To complete your registration, please enter the following verification code in the provided space on our website:

    Verification Code: ${validationToken}

    This token is a one-time code to verify your email address. If you did not request this verification, please disregard this email.

    Welcome to our community! If you have any questions or need assistance, feel free to reach out.

    Best regards,
    The House of Wisdom Team
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

export function sendSessionTokenAsMail(email: string, session_token: string) {
  const mailOptions = {
    from: "games99912345@gmail.com",
    to: email,
    subject: "Welcome to The House of Wisdom - Reset Your Password",
    html: `
      <p>You are receiving this email because a password reset request was made for your account.</p>
      <p>Click <a href="${process.env.BASE_URL}/reset-password/${session_token}">here</a> to reset your password.</p>
      <p>If you did not request this, please ignore this email.</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
