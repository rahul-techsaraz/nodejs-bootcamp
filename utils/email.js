const nodemailer = require('nodemailer');

const sendMail = async (options) => {
    //CREATE THE TRANSPORTER
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass:process.env.EMAIL_PASSWORD
        }
    })
    //DEFINE OPTIONS
    const mailOptions = {
        from: "Rahul Singh <rahul@test.com>",
        to: options.email,
        subject: options.subject,
        text:options.message
    }
    //SEND THE EMAIL
    await transporter.sendMail(mailOptions)

}
module.exports = sendMail;