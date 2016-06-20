import { createValidator, required, minLength, integer } from 'validations';

const companyValidation = createValidator({
  name: [required, minLength(4)],
  address: [required, minLength(7)],
  contact: {
    name: [required, minLength(5)],
    email: [required],
    phone: [required, integer]
  }
});

export default companyValidation;
