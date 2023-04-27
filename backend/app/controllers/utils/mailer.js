import nodemailer from "nodemailer";

/*
the mailer is used to send mails to the user when they register or reset their password.
*/

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "noreply.sprintify@gmail.com",
    pass: "reqzxrovgmwmiaiy",
  },
});

export const sendVerificationMail = async (emailAdress, token) => {
  const mailOptions = {
    from: "noreply.sprintify@gmail.com",
    to: emailAdress,
    subject: "Bitte aktiviere deinen Account bei Sprintify",
    text: `Bitte klicke den folgenden Link um deine Registrierung bei Sprintify zu bestätigen: \b ${process.env.frontendURL}/login/verifyAccount/${token}`, 
  };

  const response = await transporter.sendMail(mailOptions);
  return response;
};

export const sendPasswordResetMail = async (emailAdress, token) => {
  const mailOptions = {
    from: "noreply.sprintify@gmail.com",
    to: emailAdress,
    subject: "Passwort zurücksetzen",
    text: `Bitte klicke den folgenden Link um dein Passwort bei Sprintify zu zurückzusetzen: \b ${process.env.frontendURL}/login/resetPassword/${token}`, 
  };

  const response = await transporter.sendMail(mailOptions);
  return response;
};
