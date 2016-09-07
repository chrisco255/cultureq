import { createValidator, minLength } from 'validations';

const quoteValidation = createValidator({
  pillarId: [],
  data: {
    quote: [minLength(5)],
    author: [minLength(3)],
  }
});

export default quoteValidation;
