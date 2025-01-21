import * as yup from 'yup';

export const schema = yup.object({
  indice: yup.string().optional(), // `indice` is optional and must be a string if provided
}).required();

// Type definition for validation
export type FormValidateDocumentUploadType = yup.InferType<typeof schema>;
