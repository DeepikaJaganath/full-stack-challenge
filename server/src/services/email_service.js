import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import CONSTANT from '../constant';

let EmailService = {
    verifyAccount: (user) => {
        console.log('verfication user is', user);
        let transport = nodemailer.createTransport(smtpTransport({
            service: "gmail",
            auth: {
                user: 'dpkajaganathan@gmail.com',
                pass: 'DPKA19csebe'
            }
        }));

        let URL = `http://${CONSTANT.NOTIFICATION_URL}/verify/${user.access_token}`

        let mailOptions = {
            to: user.email,
            from: 'dpkajaganathan@gmail.com',
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
