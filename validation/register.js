const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function(data){
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';
    if(!validator.isLength(data.name, { min: 3, max: 30})){
        errors.name = 'Name must be between 3 and 30 characters';
    }
    if(validator.isEmpty(data.name)){
        errors.name = 'Name field is required';
    }
    if(!validator.isEmail(data.email)){
        errors.email = 'Email is invalid';
    }
    if(validator.isEmpty(data.email)){
        errors.email = 'Email field is required';
    }
    if(!validator.isLength(data.password, { min: 8, max: 30 })){
        errors.password = 'Password must be at least 8 characters';
    }
    if(validator.isEmpty(data.password)){
        errors.password = 'Password field is required';
    }
    if(!validator.equals(data.password, data.confirmPassword)){
        errors.confirmPassword = 'Passwords do not match';
    }
    if(validator.isEmpty(data.confirmPassword)){
        errors.confirmPassword = 'Confirm password field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
}