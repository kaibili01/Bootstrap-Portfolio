require('dotenv').config();
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const elementMap = {
    
    "subject": "SUBJECT",
    "fromName": "YOURNAME",
    "fromEmail": "YOUREMAIL",
    "body": "BODY"
}
console.log('usergmail', process.env.usergmail);
const sendMailFromGmail = (req, res, next) => {
    console.log('req.body', req.body);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: process.env.usergmail,
               pass: process.env.password
           }
       });

let htmlTemplate = fs.readFileSync(path.resolve(__dirname, '../contact1.html'), 'UTF-8');

       for (const key in elementMap) {
           htmlTemplate = htmlTemplate.replace(new RegExp(`__${elementMap 
            [key]}__`, 'g'), req.body[key]);
     
}
htmlTemplate = htmlTemplate.replace(new RegExp(`__SITE__`,'g'), "agb.dev");

const sendTo = [process.env.usergmail];
    if (req.body.copy){
        sendTo.push(req.body.fromEmail)

    }

    const mailOptions = {
        from: `${req.body.fromName} <${req.body.fromEmail}>`, // sender address
        to: sendTo, // list of receivers
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