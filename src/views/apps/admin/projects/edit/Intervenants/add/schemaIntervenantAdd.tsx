import * as yup from 'yup';



// Define the validation schema using Yup
export const schemaIntervenantAdd = yup.object({
  email: yup.string().email('Veuillez entrer un email valide').required('L\'email est requis'),
  first_name: yup.string().required('Le prénom est requis'),
  last_name: yup.string().required('Le nom de famille est requis'),
  is_active: yup.boolean().required('Active status is required'),
  redirect_uri: yup.string().url('Veuillez entrer une URL valide'),
  role: yup.string()
    .required('Le rôle est requis'),
}).required();

// Type definition for validation
export type FormValidateIntervenantAddType = yup.InferType<typeof schemaIntervenantAdd>;
