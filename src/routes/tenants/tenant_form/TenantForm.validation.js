import { createValidator, required, minLength, integer } from 'validations';

const tenantValidation = createValidator({
  name: [required]
});

export default tenantValidation;
