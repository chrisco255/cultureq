/*
  For examples see:
  https://github.com/erikras/react-redux-universal-hot-example/search?utf8=%E2%9C%93&q=createValidator
*/

import emailRegex from 'email-regex';

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

// rules is an array of functions.
const join = (rules) => {
  return (value, data) => {
    return rules.map(rule => rule(value, data)).filter(error => !!error)[0]; // first error
  }
}


// createValidator({
//   name: [required],
//   address: [required],
//   contact: {
//     name: [required]
//   }
// })


// TODO: Clean up logic. NOTE: only works for one level of nesting.
export function createValidator(rules) {
  return (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach( (key) => {
      if( !(rules[key] instanceof Array) ) {
        const innerRules = rules[key];
        Object.keys(innerRules).forEach( (innerKey) => {
          const innerRule = join([].concat(innerRules[innerKey])); // concat enables both functions and arrays of functions
          const error = innerRule(data[key][innerKey], data); // this might need to be data[key]
          if (error) {
            errors[key] = errors[key] || {};
            errors[key][innerKey] = error;
          }
        }); // End inner forEach
      } else {
        const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
        const error = rule(data[key], data);
        if (error) {
          errors[key] = error;
        }
      }
    }); // End outer forEach

    return errors;
  };
}
