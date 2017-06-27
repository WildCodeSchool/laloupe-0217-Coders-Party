import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import xoauth2 from 'xoauth2';

module.exports = () => {
  return nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    secure: true,
    auth: {
        xoauth2: xoauth2.createXOAuth2Generator({
            user: 'codersparty@gmail.com',
            clientId: '608155903190-91aeo4ou32rijaibkgso1dsuvf2r1ant.apps.googleusercontent.com',
            clientSecret: 'mZZBqeHfMQsM_C9IebMs9iXS',
            refreshToken: '1/rcxUYRhxmpIVEGvM10nM7QAL35Fe6O-zhUD6cyH6ggo',
            accessToken: 'ya29.GltyBC44ox8Q55-_t8q3scCOQnQtjdHKnHnVLlQ-3NTSgbGYu5oaK4GVJy0jOZLThzeVSDKNn0Nt_4gMNt-bhdQgwovHjv87eXFd9dq_3i6kwSrLIecmMI3RQXdH'
        })
    }
  }));
};
