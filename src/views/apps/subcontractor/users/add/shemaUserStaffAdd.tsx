import * as yup from 'yup';

// Define the validation schema using Yup
export const schemaUserStaffAdd = yup.object({
  email: yup.string().email('Veuillez entrer un email valide').required('L\'email est requis'),
  first_name: yup.string().required('Le prénom est requis'),
  last_name: yup.string().required('Le nom de famille est requis'),
  is_active: yup.boolean().required('Active status is required'),
  redirect_uri: yup.string().url('Veuillez entrer une URL valide')
}).required();

// Type definition for validation
export type FormValidateUserStaffAddType = yup.InferType<typeof schemaUserStaffAdd>;
