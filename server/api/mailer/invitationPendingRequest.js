import moment from 'moment';

module.exports = {
  options: {
    viewEngine: {
      extname: '.hbs',
      layoutsDir: '../server/api/views/email/',
      defaultLayout: 'templatePendingRequest',
      partialsDir: '../server/api/views/partials/'
    },
    viewPath: '../server/api/views/email/',
    extName: '.hbs'
  },
  mail: function(event, guest) {
    return {
      from: "codersparty@gmail.com",
      to: event.author.email,
      subject: "Coders Party",
      template: 'email.body',
      context: {
        variable1: 'Bonjour ' + event.author.name + ' !',
        variable2: 'Pour l\'évènement ' + event.name + ' l\'utilisateur ' + event.pending[event.pending.length - 1].name + ' souhaite rejoindre la fête !',
        variable3: 'Tu peux consulter l\'évènement ici : ',
        variable4: event.place_url,
        variable5: 'Adresse : ' + event.adresse,
        variable6: 'https://codersparty.herokuapp.com/#!/user/event/id/' + event.id,
        variable7: 'L\'évènement aura lieu le ' + moment(event.startDate).format('dddd D MMMM YYYY') + ' à ' + moment(event.startTime).format('HH:mm'),
      }
    };
  }
};
