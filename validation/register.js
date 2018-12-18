const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : ''; // confirms the password

  // NOTE: isLength is used to validate name length
  if(!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = '[!] Name field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = '[!] Email field is required';
  }

  // NOTE: isEmail is used to validate email format
  if (!Validator.isEmail(data.email)) {
    errors.email = '[!] Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = '[!] Password field is required';
  }

  // NOTE: isLength is used to validate password length
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = '[!] Password must be at least 6 characters';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = '[!] Confirm Password field is required';
  }

  // NOTE: equals is used to validate password & password2 match
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = '[!] Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
