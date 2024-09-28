import * as yup from 'yup';


// Define the validation schema using Yup
export const schemaClientAdd = yup.object({
  clientName: yup.string().required('Le nom du client est requis'),
  sireneNumber: yup
    .string()
    .required('Le numéro de Sirene est requis')
    .matches(/^\d+$/, 'Le numéro de Sirene doit contenir uniquement des chiffres')
    .length(9, 'Le numéro de Sirene doit contenir exactement 9 caractères'),
  email: yup.string().email('Veuillez entrer un email valide').required('L\'email est requis'),
  phoneNumber: yup.string().required('Le numéro de téléphone est requis'),
  address: yup.object({
    country: yup.string().required('Le pays est requis'),
    streetNumber: yup.string().required('Le numéro de rue est requis'),
    streetName: yup.string().required('Le nom de rue est requis'),
    department: yup.string().required('Le département est requis'),
    city: yup.string().required('La ville est requise'),
    zipCode: yup.string().required('Le code postal est requis').max(5, 'Le code postal ne doit pas dépasser 5 caractères'),
  }).required(),
  is_active: yup.boolean().required('Active status is required'),

}).required();

export type FormValidateClientAddType = yup.InferType<typeof schemaClientAdd>;
