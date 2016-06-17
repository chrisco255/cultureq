import { createValidator, required, integer } from 'validations';

const validation = createValidator({
  improvements: [required, integer],
  status: [required],
  _id: [required],
  proposal_id: [required]
});

export default validation;
