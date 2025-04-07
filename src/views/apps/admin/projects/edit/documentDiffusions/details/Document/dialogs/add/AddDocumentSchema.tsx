import * as yup from 'yup';

// Define the validation schema using Yup
export const schemaDocumentUpload = yup.object({
  name: yup.string().nullable(), // Optional string field
  tags: yup.string().nullable(), // Optional string field
  notes: yup.string().nullable(), // Optional string field
}).required();

// Type definition for validation
export type FormValidateDocumentUploadType = yup.InferType<typeof schemaDocumentUpload>;
