import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import xoauth2 from 'xoauth2';

module.exports = () => {
  return nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    secure: true,
    auth: {
        xoauth2: xoauth2.createXOAuth2Generator({
            user: '',
            clientId: '',
            clientSecret: '',
            refreshToken: '',
            accessToken: ''
        })
    }
  }));
};
