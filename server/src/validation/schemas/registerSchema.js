const Joi = require('joi')

module.exports = Joi.object().keys({
  email: Joi.string().email().min(3).max(50).required(),
  password: Joi.string().min(6).max(80).required(),
}).strict()