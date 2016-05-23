import { createValidator, required, maxLength, minLength, integer } from '../../common/validations';
//yay
const signUpValidation = createValidator({
  companyName: [required, minLength(4), maxLength(10)],
  address: [required, integer, minLength(7)]
});

export default signUpValidation;
