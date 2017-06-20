import moment from 'moment';

module.exports = {
  options: {
    viewEngine: {
      extname: '.hbs',
      layoutsDir: '../server/api/views/email/',
      defaultLayout: 'templateCancel',
      partialsDir: '../server/api/views/partials/'
    },
    viewPath: '../server/api/views/email/',
    extName: '.hbs'
  },
  mail: function(event, guest) {
    console.log(guest);
    return {
      from: "codersparty@gmail.com",
      to: guest.email,
      subject: "Coders Party",
      template: 'email.body',
      context: {
        variable1: 'Bonjour ' + guest.name + ' !',
        variable2: 'L\'évènement ' + event.name + ' est annulé',
        variable3: 'Nous sommes désolés, et esperons te voir lors d\'un prochain évènement.'
      }
    };
  }
};
