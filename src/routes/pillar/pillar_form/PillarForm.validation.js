import { createValidator, required, minLength, integer } from 'validations';

const pillarValidation = createValidator({
  name: [required]
});

export default pillarValidation;
