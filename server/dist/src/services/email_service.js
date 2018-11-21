'use strict';

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _nodemailerSmtpTransport = require('nodemailer-smtp-transport');

var _nodemailerSmtpTransport2 = _interopRequireDefault(_nodemailerSmtpTransport);

var _constant = require('../constant');

var _constant2 = _interopRequireDefault(_constant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EmailService = {
    verifyAccount: function verifyAccount(user) {
        console.log('verfication user is', user);
        var transport = _nodemailer2.default.createTransport((0, _nodemailerSmtpTransport2.default)({
            service: "gmail",
            auth: {
                user: 'dpkajaganathan@gmail.com',
                pass: 'DPKA19csebe'
            }
        }));

        var URL = 'http://' + _constant2.default.NOTIFICATION_URL + '/verify/' + user.access_token;

        var mailOptions = {
            to: user.email,
            from: 'dpkajaganathan@gmail.com',
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