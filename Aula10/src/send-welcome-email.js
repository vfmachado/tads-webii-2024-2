import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    //   host: "smtp.ethereal.email",
    //   port: 587,
    //   secure: false, // true for port 465, false for other ports
  auth: {
    user: "",   // google app email
    pass: "",   // google app password
    //  https://myaccount.google.com/apppasswords
    // tem que estar com 2fa ativado
  },
});


const sendWelcomeEmail = async (email, name) => {
    console.log(`Bem-vindo, ${name}!`);
    console.log(`Email enviado para ${email}`);

    const info = await transporter.sendMail({
        from: '', // sender address
        to: email, // list of receivers
        // to: "email1, email2", // list of receivers
        // to: ["email1", "email2"], // list of receivers

        subject: "Hello ✔", // Subject line
        html: `<b>Welcome ${name}!!!</b>`, // html body
      });
    
    console.log("Message sent: %s", info.messageId);
}

export { sendWelcomeEmail };