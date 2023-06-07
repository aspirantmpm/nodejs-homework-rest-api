const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
// const sgMail = require('@sendgrid/mail');

const authRouter = require("./routes/api/auth");

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const msg = {
//   to: 'tishchenkompm@gmail.com', // Change to your recipient
//   from: 'aspirantmpm@gmail.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email send sucess');
//   })
//   .catch(error => {
//     console.error(error.messege);
//   });

module.exports = app;
