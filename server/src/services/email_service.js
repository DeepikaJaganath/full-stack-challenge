const nodemailer = require('nodemailer');
const smtpTransport  = require('nodemailer-smtp-transport');
const NOTIFICATION_URL = require('../constant').NOTIFICATION_URL;
const config = require('../config');

let EmailService = {

    /*
        Function to send Email to the user for account verification
    */
    verifyAccount: (user) => {
        let transport = nodemailer.createTransport(smtpTransport({
            service: "gmail",
            auth: {
                user: config.mailer.auth.user,
                pass: config.mailer.auth.pass
            }
        }));
        let URL = `${NOTIFICATION_URL}/verify/${user.token}`

        let mailOptions = {
            to: user.email,
            from: config.mailer.auth.user,
            subject: 'Account Verification',
            html: `<p>You are receiving this because you (or someone) has registered for a new account.\n\n` +
                     `Please click on the following link to login\n\n</p>`+ 
                     `${URL}`
        };

        transport.sendMail(mailOptions, (err, result) => {
            if(err) {
                console.error(err);
            } 
        })
    }
}

module.exports = EmailService;
