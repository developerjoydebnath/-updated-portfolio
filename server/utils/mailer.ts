import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendContactEmail = async (name: string, email: string, subject: string, message: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.RECEIVER_EMAIL,
    subject: `New Portfolio Inquiry: ${subject}`,
    text: `You have a new message from ${name} (${email}):\n\n${message}`,
    html: `
      <h3>New Portfolio Inquiry</h3>
      <p><strong>From:</strong> ${name} (${email})</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export const sendReplyEmail = async (to: string, originalSubject: string, replyMessage: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: `Re: ${originalSubject}`,
    text: replyMessage,
    html: `
      <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
        <p>${replyMessage.replace(/\n/g, '<br>')}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 0.8em; color: #888;">This is a reply to your inquiry from Joy's Portfolio.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Reply email sent successfully');
  } catch (error) {
    console.error('Error sending reply email:', error);
    throw error;
  }
};
