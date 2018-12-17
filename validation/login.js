const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.password = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmpty(data.email)) {
    errors.email = '[!] Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = '[!] Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = '[!] Passowrd field is required';
  }

  return {
    erros,
    isValid: isEmpty(errors)
  }
}
