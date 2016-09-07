import { createValidator, minLength } from 'validations';

const videoValidation = createValidator({
  pillarId: [],
  data: {
    title: [minLength(3)],
    description: [minLength(10)],
    url: [minLength(5)]
  }
});

export default videoValidation;
