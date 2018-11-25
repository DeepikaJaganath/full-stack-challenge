'use strict';

var bcrypt = require('bcrypt');
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
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

//Pre-hooks to hash password before saving the user

userSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});

module.exports = mongoose.model("user", userSchema);