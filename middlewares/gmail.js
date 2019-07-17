const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const elementMap = {
    "subject": "__Subject__",
    "fromName": "__your name__",
    "fromEmail": "__your email__",
    "body": "__Body__"
}

const sendMailFromGmail = (req, res, next) => {
    console.log('req.body', req.body);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: 'adananimaldesign@gmail.com',
               pass: 'OnePiece01'
           }
       });

let htmlTemplate = fs.readFileSync(path.resolve(__dirname, '../templates/emailtest.html'), 'UTF-8');

       for (const key in elementMap) {
           htmlTemplate = htmlTemplate.replace(new RegExp(`__${elementMap 
            [key]}__`, 'g'), req.body[key]);
     
}
htmlTemplate = htmlTemplate.replace(new RegExp(`__SITE__`,'g'), "agb.dev");

const sendTo = ['adananimaldesign@gmail.com']
    if (req.body.copy){
        sendTo.push(req.body.fromEmail)

    }

    const mailOptions = {
        from: `${req.body.fromName} <${req.body.fromEmail}>`, // sender address
        to: 'adananimaldesign@gmail.com', // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.subject,// plain text body
        html: htmlTemplate// HTML body

      };

      transporter.sendMail(mailOptions, (error,info) => {
          if (error) {
              console.log('error', error);
              res.status(503).json({
                  message: 'send failed'

              });

          } else {
              console.log('Email sent:', info.response);
              res.status(200).json({
                  message: 'mail sent'
              })

          }

      })


}

module.exports = sendMailFromGmail;