const nodemailer = require("nodemailer");
require("dotenv").config();
const { generateToken } = require("../util/generateToken");

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: `${process.env.email}`,
    pass: `${process.env.password}`,
  },
});

const sendConfirmationEmail = (user) => {
  const token = generateToken(user);
  const url = `http://localhost:5000/confirmation/${token}`;

  transporter.sendMail({
    from: `${process.env.email}`,
    to: `${user.rows[0].user_first_name} <${user.rows[0].user_email}>`,
    subject: "hello world",
    html: `Confirmation email <a href=${url}> ${url}</a>`,
  }),
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("email sent : " + info.response);
      }
    };
};

exports.sendConfirmationEmail = sendConfirmationEmail;
