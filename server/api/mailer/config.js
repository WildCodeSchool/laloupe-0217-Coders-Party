import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

module.exports = () => {
  return nodemailer.createTransport(smtpTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: "",
      pass: ""
    }
  }));
};
