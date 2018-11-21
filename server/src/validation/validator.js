const Joi = require('joi')

const validateBody = (body, schema) => {
  return new Promise((resolve, reject) => {
    Joi.validate(body, schema, (err, result) => {
      if (err) {
        const error = err.details[0]
        reject({code: 400, message: `${error.message}, ${error.path}`})
      }
      resolve(body)
    })
  })
}

module.exports = {
  validateBody
}
