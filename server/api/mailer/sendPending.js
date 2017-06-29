let sendPending = (event, index, mailer, mail) => {
  let guest = event.invitations[index];
  mailer.sendMail(
    mail(event, guest),
    function(error, response) {
      if (error) {
        console.log("Erreur lors de l'envoie du mail!", event.author.email);
        console.log(error);
      } else {
        console.log("Mail envoyé avec succès a ", event.author.email);
      }
      mailer.close();
    });
};

module.exports = sendPending;
