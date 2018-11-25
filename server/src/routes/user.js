const  _ = require('lodash');

const UserService = require ('../services/user_service');


/**
 * @api {POST} /register Register new User
 * @apiName RegisterNewUser
 * @apiGroup Authentication
 * 
 * @apiParamExample {json} Request-Example:
 *  {
 *    "email": "dummyemail@examp.com",
 *    "password" : "abcD1234@"
 *  }
 * @apiSuccess {String} token Authentication Token for user
   @apiSuccess {Number} id Users id
   @apiSuccess {Email}  Email Id of the user
   @apiSuccess {String} Encrypted password of the user
   @apiSuccess {Boolean} isVerified, checks if user is Authenticated. True if verified, Defaults false

   @apiSuccessExample Success-Response:
   HTTP 200 OK
   {
       "token"      : "hioyibas.jlasdafdsahgfasdkuygasfpqaz",
       "id"         : "1",
       "email"      : "dummyemail@examp.com",
       "password"   : "$2a$10$rUYyIbAjpfT4SjdVp6/K",
       "isVerified" : "false"
   }
 * 
 */
 const registerUser = (req, res) => {
    let userDetails = _.pick(req.body, ['email', 'password']);
    UserService.createUser(userDetails).then((user) => {
        res.status(200).send(user);
    })
    .catch((err) => {
        res.status(err.code).send(err.message);
    });
};

/**
 * @api {POST} /login Login a user
 * @apiName LoginUser
 * 
 * @apiParam {String} email Users email address
 * @apiParam {String} password Users password
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *    "email": "dummyemail@examp.com",
 *    "password" : "abcD1234@"
 * }
 * 
 * @apiSuccess {String} token Authentication Token for user
   @apiSuccess {Number} id Users id
   @apiSuccess {Email}  Email Id of the user
   @apiSuccess {String} Encrypted password of the user
   @apiSuccess {Boolean} isVerified, checks if user is Authenticated. True if verified, Defaults false

   @apiSuccessExample Success-Response:
   HTTP 200 OK
   {
       "token"      : "hioyibas.jlasdafdsahgfasdkuygasfpqaz",
       "id"         : "1",
       "email"      : "dummyemail@examp.com",
       "password"   : "$2a$10$rUYyIbAjpfT4SjdVp6/K",
       "isVerified" : "true"
   }
 */

 const login = (req, res) => {
    let userDetails = _.pick(req.body, ['email', 'password'])
    UserService.getUser(userDetails).then((user) => {
        res.status(200).send(user);
    })
    .catch((err) => {
        res.status(err.code).send(err.message);
    })

}

module.exports = {
    registerUser,
    login

}