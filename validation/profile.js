const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : '';
  data.title = !isEmpty(data.title) ? data.title : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';

  if(!Validator.isLength(data.username, { min: 2, max: 40 })) {
    errors.username = '[!] Username needs to be between 2 and 40 characters';
  }

  if(Validator.isEmpty(data.username)) {
    errors.username = '[!] Username is required';
  }

  if(Validator.isEmpty(data.title)) {
    errors.title = '[!] Title field is required';
  }

  if(Validator.isEmpty(data.skills)) {
    errors.skills = '[!] Skills field is required';
  }

  if(!isEmpty(data.website)) {
    if(!Validator.isURL(data.website)) {
      errors.website = '[!] Not a valid URL';
    }
  }

  if(!isEmpty(data.youtube)) {
    if(!Validator.isURL(data.youtube)) {
      errors.youtube = '[!] Not a valid URL';
    }
  }

  if(!isEmpty(data.twitter)) {
    if(!Validator.isURL(data.twitter)) {
      errors.twitter = '[!] Not a valid URL';
    }
  }
  if(!isEmpty(data.facebook)) {
    if(!Validator.isURL(data.facebook)) {
      errors.facebook = '[!] Not a valid URL';
    }
  }

  if(!isEmpty(data.linkedin)) {
    if(!Validator.isURL(data.linkedin)) {
      errors.linkedin = '[!] Not a valid URL';
    }
  }

  if(!isEmpty(data.instagram)) {
    if(!Validator.isURL(data.instagram)) {
      errors.instagram = '[!] Not a valid URL';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
