import nodemailer from 'nodemailer'
import dotenv from 'dotenv';

dotenv.config();

var smtpConfig = {
  service:"gmail",
  auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
  }
};

const mailSender = async (email, title, body) => {
    try {
      // Create a Transporter to send emails
      let transporter = nodemailer.createTransport(smtpConfig);
      // Send emails to users
      let info = await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: title,
        html: body,
      });
      return info;
    } catch (error) {
      (error.message);
    }
  };

  export async function sendresetMail(email, link) {
    try {
      const mailResponse = await mailSender(
        email,
        "Reset Email",
        `<h1>Please click on the Link below </h1>
         <p>here is the link ${link}</p>`
      );
    } catch (error) {
      throw error;
    }
  }

  export default mailSender