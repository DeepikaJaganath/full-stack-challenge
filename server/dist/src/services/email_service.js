'use strict';

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var NOTIFICATION_URL = require('../constant').NOTIFICATION_URL;
var config = require('../config');

var EmailService = {

    /*
        Function to send Email to the user for account verification
    */
    verifyAccount: function verifyAccount(user) {
        var transport = nodemailer.createTransport(smtpTransport({
            service: "gmail",
            auth: {
                user: config.mailer.auth.user,
                pass: config.mailer.auth.pass
            }
        }));
        var URL = NOTIFICATION_URL + '/verify/' + user.access_token;

        var mailOptions = {
            to: user.email,
            from: config.mailer.auth.user,
            subject: 'Account Verification',
            html: '<p>You are receiving this because you (or someone) has registered for a new account.\n\n' + 'Please click on the following link to login\n\n</p>' + ('' + URL)
        };

        transport.sendMail(mailOptions, function (err, result) {
            if (err) {
                console.error(err);
            }
        });
    }
};

module.exports = EmailService;