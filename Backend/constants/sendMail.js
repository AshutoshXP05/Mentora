import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

 const sendMail = async (to, otp) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.USER_EMAIL, 
      to : to,
      subject: "Password Reset Verification Code",
      text: `Your 6-digit OTP is ${otp}. Please use it to reset your password.`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f6f9;">
          <div style="max-width: 500px; margin: auto; background: #fff; border-radius: 8px; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <h2 style="color: #4f46e5; text-align: center;">Password Reset Request</h2>
            <p style="font-size: 15px; color: #333;">Hello,</p>
            <p style="font-size: 15px; color: #333;">
              We received a request to reset your password. Please use the verification code below to proceed:
            </p>
            <div style="text-align: center; margin: 25px 0;">
              <span style="display: inline-block; font-size: 24px; letter-spacing: 5px; background: #eef2ff; color: #4f46e5; padding: 10px 20px; border-radius: 6px; font-weight: bold;">
                ${otp}
              </span>
            </div>
            <p style="font-size: 14px; color: #555;">
              This code will expire in <b>10 minutes</b>. If you didn't request this, please ignore this email.
            </p>
            <p style="font-size: 14px; color: #555; margin-top: 30px;">Best regards, <br/> <b>SecureAuth Team</b></p>
          </div>
        </div>
      `,
    });

    console.log("✅ Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};


export default sendMail;