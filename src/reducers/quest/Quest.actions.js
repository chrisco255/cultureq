export const CONTENT_ADD_SUBMITTED = 'CONTENT_ADD_SUBMITTED';
export const CONTENT_ADD_SUCCEEDED = 'CONTENT_ADD_SUCCEEDED';
export const CONTENT_ADD_FAILED = 'CONTENT_ADD_FAILED';

export function addContent ( {content} ) {
  return {
    type: CONTENT_ADD_SUBMITTED,
    payload: {
      content
    }
  };
}
