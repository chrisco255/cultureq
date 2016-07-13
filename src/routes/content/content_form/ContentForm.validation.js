import { createValidator, required, minLength, integer } from 'validations';

const contentValidation = createValidator({
  pillarId: [required],
  type: [required],
  data: {
    title: [minLength(3)],
    description: [minLength(10)],
    url: [minLength(10)],
    quote: [minLength(5)],
    author: [minLength(3)],
    fullName: [minLength(3)],
    position: [minLength(3)]
  }
});

export default contentValidation;
