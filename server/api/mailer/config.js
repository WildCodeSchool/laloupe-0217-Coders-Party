import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import xoauth2 from 'xoauth2';

module.exports = () => {
  return nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    secure: true,
    auth: {
        xoauth2: xoauth2.createXOAuth2Generator({
            user: process.env.USER_MAIL,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: process.env.ACCESS_TOKEN
        })
    }
  }));
};
