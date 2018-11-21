'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.login = exports.registerUser = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _user_service = require('../services/user_service');

var _user_service2 = _interopRequireDefault(_user_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var registerUser = exports.registerUser = function registerUser(req, res) {
    console.log('req is', req.body);
    var userDetails = _lodash2.default.pick(req.body, ['email', 'password']);
    _user_service2.default.createUser(userDetails).then(function (user) {
        res.status(200).send(user);
    }).catch(function (err) {
        res.status(500).send(err);
    });
};

var login = exports.login = function login(req, res) {
    var userDetails = _lodash2.default.pick(req.body, ['email', 'password']);
    _user_service2.default.getUser(userDetails).then(function (user) {
        res.status(200).send(user);
    }).catch(function (err) {
        res.status(500).send(err);
    });
};