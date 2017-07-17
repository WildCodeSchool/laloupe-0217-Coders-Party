import moment from 'moment';

module.exports = {
  options: {
    viewEngine: {
      extname: '.hbs',
      layoutsDir: '../server/api/views/email/',
      defaultLayout: 'template',
      partialsDir: '../server/api/views/partials/'
    },
    viewPath: '../server/api/views/email/',
    extName: '.hbs'
  },
  mail: function(event, guest) {
    return {
      from: "codersparty@gmail.com",
      to: event.invitations[event.invitations.length - 1].email,
      subject: "Coders Party",
      template: 'email.body',
      context: {
        variable1: 'Bonjour ' + event.invitations[event.invitations.length - 1].name + ' !',
        variable2: 'Tu es invité pour l\'évènement ' + event.name,
        variable3: 'Description évènement : ' + event.description,
        variable4: event.place_url,
        variable5: 'Adresse : ' + event.adresse,
        variable6: process.env.ADRESSE_VPS + event.id,
        variable7: 'L\'évènement aura lieu le ' + moment(event.startDate).format('dddd D MMMM YYYY') + ' à ' + moment(event.startTime).format('HH:mm'),
      }
    };
  }
};
