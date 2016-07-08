import { createValidator, required, minLength, integer } from 'validations';

const contentValidation = createValidator({
  // content: [required]
});

export default contentValidation;
