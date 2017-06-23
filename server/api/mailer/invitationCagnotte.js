import moment from 'moment';

module.exports = {
  options: {
    viewEngine: {
      extname: '.hbs',
      layoutsDir: '../server/api/views/email/',
      defaultLayout: 'templateCagnotte',
      partialsDir: '../server/api/views/partials/'
    },
    viewPath: '../server/api/views/email/',
    extName: '.hbs'
  },
  mail: function (event, guest) {
    return {
      from: "codersparty@gmail.com",
      to: guest.email,
      subject: "Coders Party",
      template: 'email.body',
      context: {
        variable1: 'Bonjour ' + guest.name + ' !',
        variable2: 'Tu es invité pour l\'évènement ' + event.name,
        variable3: 'Description évènement : ' + event.description,
        variable4: event.place_url,
        variable5: 'Adresse : ' + event.adresse,
        variable6: 'https://codersparty.herokuapp.com/#!/user/event/id/' + event.id,
        variable7: 'L\'évènement aura lieu le ' + moment(event.startDate).format('dddd D MMMM YYYY') + ' à ' + moment(event.startTime).format('HH:mm'),
        variable10: 'C\'est un évènement de type cagnotte, une participation financiére est demandé aux participants. Le montant est de ' + event.budget + '€ par personne, le tresorier chargé de la cagnotte est : ' + event.tresorier.name
      }
    };
  }
};
