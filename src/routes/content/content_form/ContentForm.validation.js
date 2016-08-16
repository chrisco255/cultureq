import { createValidator, required, minLength } from 'validations';

const contentValidation = createValidator({
  pillarId: [required],
  type: [required],
  data: {
    title: [minLength(3)],
    description: [minLength(10)],
    url: [minLength(5)],
    quote: [minLength(5)],
    author: [minLength(3)],
    recipient: [minLength(3)],
    recipientPosition: [minLength(3)]
  }
});

export default contentValidation;
