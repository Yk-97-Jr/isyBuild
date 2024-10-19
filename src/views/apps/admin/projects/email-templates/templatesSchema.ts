import * as Yup from 'yup';

export const Schema = Yup.object().shape({
  subject: Yup.string().required('Subject is required'),
  header: Yup.string().required('Header is required'),
  body: Yup.string().required('Body is required'),
  footer: Yup.string().required('Footer is required')
});

// Infer the type from the schema
export type templateSchemaType = Yup.InferType<typeof Schema>;
