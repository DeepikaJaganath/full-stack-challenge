const crypto = require('crypto');

let CryptoService = {

    genRandomString: (length) => {
        try {
            return crypto.randomBytes(Math.ceil(length/2))
                .toString('hex')
                .slice(0,length);
        }
        catch(err) {
            console.error('Error generating random string', err);
        }
    },

    sha512: (password, salt) => {
        try {
            let hash = crypto.createHmac('sha512', salt);
            hash.update(password);
            let value = hash.digest('hex');
            return {
                salt: salt,
                passwordHash: value
            }
        }
        catch(err) {
            console.error('Error in hashing', err);
        }
    },

    saltHashPassword: (userpassword) => {
        try {
            let salt = CryptoService.genRandomString(16);
            let passwordData = CryptoService.sha512(userpassword, salt);
            return passwordData;
        }
        catch(err) {
            console.error('Error saltHashing the password', err);
        }
    },

    saltHashExistingPassword: (userpassword, salt) => {
        try {
            let passwordData = CryptoService.sha512(userpassword, salt);
            return passwordData;
        }
        catch(err) {
            console.error('Error salting existing password', err);
        }
    }

}

module.exports = CryptoService;