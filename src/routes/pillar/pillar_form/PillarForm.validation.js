import { createValidator, required } from 'validations';

const pillarValidation = createValidator({
  name: [required]
});

export default pillarValidation;
