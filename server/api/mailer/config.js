import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

module.exports = () => {
  return nodemailer.createTransport(smtpTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "66e1f962f78743",
      pass: "a44fac6378fd80"
    }
  }));
};
