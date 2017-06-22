let sendInvitation = (event, index, mailer, mail) => {
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
        sendInvitation(event, index + 1, mailer, mail);
      },
      10 * 1000);
  }
   else {
     mailer.sendMail(mail(event,event.author),
     function(error, response) {
       if (error) {
         console.log("Erreur lors de l'envoie du mail!", event.author.email);
         console.log(error);
       } else {
         console.log("Mail envoyé avec succès a ", event.author.email);
         console.log("Tous les messages ont été envoyé avec succés");
       }
       mailer.close();
     });
  }
};

module.exports = sendInvitation;
