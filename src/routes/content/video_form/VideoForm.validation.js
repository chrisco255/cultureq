import { createValidator, required, minLength } from 'validations';

const videoValidation = createValidator({
  pillarId: [required],
  type: [required],
  data: {
    title: [minLength(3)],
    description: [minLength(10)],
    url: [minLength(5)]
  }
});

export default videoValidation;
