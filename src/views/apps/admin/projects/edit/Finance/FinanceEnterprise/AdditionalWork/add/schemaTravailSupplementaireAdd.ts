import * as yup from 'yup';

// Define the validation schema using Yup
export const schemaTravailSupplementaireAdd = yup.object({
  finance_enterprise_id: yup
    .number()
    .required("L'identifiant de l'entreprise est requis"),
  amount: yup
    .string()
    .matches(/^\d+(\.\d{1,2})?$/, 'Le montant doit être un nombre valide avec jusqu\'à deux décimales')
    .required('Le montant est requis'),
}).required();

// Type definition for validation
export type FormValidateTravailSupplementaireAddType = yup.InferType<typeof schemaTravailSupplementaireAdd>;
