import { createValidator, required, minLength } from 'validations';

const quoteValidation = createValidator({
  pillarId: [required],
  type: [required],
  data: {
    quote: [minLength(5)],
    author: [minLength(3)],
  }
});

export default quoteValidation;
