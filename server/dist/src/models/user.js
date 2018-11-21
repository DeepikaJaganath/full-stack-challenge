'use strict';

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userSchema = new _mongoose2.default.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true
    },
    password: {
        type: String
    },
    access_token: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});

userSchema.pre('save', function (next) {
    var user = this;
    console.log('user is', user);
    _bcrypt2.default.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});

module.exports = _mongoose2.default.model("user", userSchema);