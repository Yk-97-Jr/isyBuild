import * as yup from 'yup';

// Define the validation schema using Yup
export const schemaFileUpload = yup.object({
  name: yup.string().nullable(), // Optional string field
  tags: yup.string().nullable(), // Optional string field
  notes: yup.string().nullable(), // Optional string field
}).required();

// Type definition for validation
export type FormValidateFileUploadType = yup.InferType<typeof schemaFileUpload>;
