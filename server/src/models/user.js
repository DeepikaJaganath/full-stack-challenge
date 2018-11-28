const mongoose = require('mongoose');

const CryptoService = require('../services/crypto_service');

let userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true
    },
    password: {
        type: String
    },
    salt: {
        type: String
    },
    token: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});

//Pre-hooks to hash password before saving the user

userSchema.pre('save',function(next){
    let user = this;
    let saltHash = CryptoService.saltHashPassword(user.password);
    user.password = saltHash.passwordHash;
    user.salt = saltHash.salt;
    next();
  })
  
module.exports = mongoose.model("user", userSchema)