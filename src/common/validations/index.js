/*
  For examples see:
  https://github.com/erikras/react-redux-universal-hot-example/search?utf8=%E2%9C%93&q=createValidator
*/

import emailRegex from 'email-regex';
import _ from 'underscore';

const isEmpty = (value) => { return value === undefined || value === null || value === '' };

export function email(value) {
  // This is used to see if email fields are "email like", it's not perfect.
  // See this: https://davidcel.is/posts/stop-validating-email-addresses-with-regex/
  if ( !isEmpty(value) && !emailRegex({exact: true}).test(value) ) {
    return 'Invalid email address';
  }
}

export function required(value) {
  if (isEmpty(value)) {
    return 'Required';
  }
}

export function integer(value) {
  if (!Number.isInteger(Number(value))) {
    return 'Must be an integer';
  }
}

export function match(field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return 'Do not match';
      }
    }
  };
}

export function minLength(min) {
  return (value) => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters`;
    }
  };
}

export function maxLength(max) {
  return (value) => {
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters`;
    }
  };
}

export function oneOf(enumeration) {
  return (value) => {
    if ( !enumeration.includes(value) ) {
      return `Must be one of: ${enumeration.join(', ')}`;
    }
  };
}

export function notOneOf(enumeration) {
  return (value) => {
    if ( enumeration.includes(value) ) {
      return `Must not be one of: ${enumeration.join(', ')}`;
    }
  };
}


export function unique(value, data, key, collection) {
  let values = _.pluck(collection, key);
  let duplicate = _.find(values, v => v === value);
  if(duplicate) {
    return `${key} must be unique. That one is already taken.`;
  }
}

export function valueExistsInCollection(value, data, key, collection) {
  let values = _.pluck(collection, key);
  let duplicate = _.find(values, v => v === value);
  if(!duplicate) {
    return `${key} must exist.  No resource found.`;
  }
}

// rules is an array of functions.
const join = (rules) => {
  return (value, data, key, collection) => {
    return rules.map(rule => rule(value, data, key, collection)).filter(error => !!error)[0]; // first error
  }
}


// createValidator({
//   name: [required],
//   address: [required],
//   contact: {
//     name: [required],
//     friend: {
//       name: [required],
//       phone: [required]    
//     }
//   }
// })

export function createValidator (rules) {
  return (data = {}, collection = {}) => {
    let getErrorsForRules = (rules, data, collection) => {
      const errors = {};
      for (let key of Object.keys(rules)) {
        if(rules[key] instanceof Array) {
          const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
          const error = rule(data[key], data, key, collection);
          if (error) {
            errors[key] = error;
          }          
        } else {
          if (data.hasOwnProperty(key)) {
            let subErrors = getErrorsForRules(rules[key], data[key], _.pluck(collection, key));
            if (Object.keys(subErrors).length > 0) {
              errors[key] = subErrors;
            }            
          } else {
            throw new Error (`Data (${JSON.stringify(data)}) to be validated is missing key ${key}`);
          }
        }
      }
      return errors;
    }
    const errors = getErrorsForRules(rules, data, collection);
    return errors;
  };
}
