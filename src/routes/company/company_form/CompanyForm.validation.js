import { createValidator, required, maxLength, minLength, integer } from '../../../common/validations';

const companyValidation = createValidator({
  name: [required, minLength(4), maxLength(10)],
  address: [required, integer, minLength(7)]
});

export default companyValidation;
