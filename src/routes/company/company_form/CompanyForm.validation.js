import { createValidator, required, minLength, integer } from '../../../common/validations';

const companyValidation = createValidator({
  'name': [required, minLength(4)],
  'address': [required, minLength(7)]
});

// const contactValidation = createValidator({
//   'cname':  [required, minLength(4)],
//   'email': [required],
//   'phone': [required, integer]
// });

export default companyValidation;
