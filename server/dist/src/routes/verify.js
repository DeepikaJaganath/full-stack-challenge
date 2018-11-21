'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config');

var _constant = require('../constant');

var _constant2 = _interopRequireDefault(_constant);

var _verification_service = require('../services/verification_service');

var _verification_service2 = _interopRequireDefault(_verification_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var verifyUser = async function verifyUser(req, res) {
    var token = req.params.token;
    if (token) {
        _jsonwebtoken2.default.verify(token, _config.tokenSecret, async function (err, decoded) {
            if (err) {
                return res.status(403).json({
                    message: 'Failed to authenticate token.'
                });
            } else {
                console.log('decoded email', decoded);
                await _verification_service2.default.authenticateUser(decoded.userEmail);
                console.log('THIS should print after authentication ****************', _constant2.default.REDIRECT_URL);
                res.redirect('' + _constant2.default.REDIRECT_URL);
            }
        });
    } else {
        return res.status(403).json({
            message: 'No token provided.'
        });
    }
};

var isAuthenticated = function isAuthenticated(req, res, next) {
    var spec = {
        email: req.body.email,
        password: req.body.password
    };
    console.log('spec is', spec);
    _verification_service2.default.checkAuthenticated(spec).then(function (isVerified) {
        return next();
    });
};

module.exports = {
    verifyUser: verifyUser,
    isAuthenticated: isAuthenticated
};