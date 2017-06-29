let sendValidate = (event, index, mailer, mail) => {
  let guest = event.invitations[index];
  mailer.sendMail(
    mail(event, guest),
    function(error, response) {
      if (error) {
        console.log("Erreur lors de l'envoie du mail!", event.invitations[event.invitations.length - 1].email);
        console.log(error);
      } else {
        console.log("Mail envoyé avec succès a ", event.invitations[event.invitations.length - 1].email);
      }
      mailer.close();
    });
};

module.exports = sendValidate;
