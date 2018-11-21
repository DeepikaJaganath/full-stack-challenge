'use strict';

var Joi = require('joi');

var validateBody = function validateBody(body, schema) {
  return new Promise(function (resolve, reject) {
    Joi.validate(body, schema, function (err, result) {
      if (err) {
        var error = err.details[0];
        reject({ code: 400, message: error.message + ', ' + error.path });
      }
      resolve(body);
    });
  });
};

module.exports = {
  validateBody: validateBody
};