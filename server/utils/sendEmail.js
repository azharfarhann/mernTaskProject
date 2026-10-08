import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

// console.log("EMAIL:", process.env.EMAIL);
// console.log("EMAIL_PASSWORD:", process.env.EMAIL_PASSWORD);

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth : {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

async function sendEmail(to,subject,text){
    await transporter.sendMail({
        from: process.env.EMAIL,
        to,
        subject,
        text
    })
};

export default sendEmail;