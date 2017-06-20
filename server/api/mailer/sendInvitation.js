let sendInvation = (event, index, mailer, mail) => {
  let guest = event.invitations[index];
  mailer.sendMail(
    mail(event, guest),
    function(error, response) {
      if (error) {
        console.log("Erreur lors de l'envoie du mail!", guest.email);
        console.log(error);
      } else {
        console.log("Mail envoyé avec succès a ", guest.email);
      }
      mailer.close();
    });
  if (index < event.invitations.length - 1) {
    setTimeout(function() {
        sendInvation(event, index + 1, mailer, mail);
      },
      10 * 1000);
  } else {
    console.log("Tous les messages ont été envoyé avec succés");
  }
};

module.exports = sendInvation;
