import * as yup from 'yup';

// Define the validation schema using Yup
export const schemaFinanceSituationUpdate = yup.object({
  amount: yup
    .string()
    .matches(
      /^\d+(\.\d{1,2})?$/,
      "Le montant doit être un nombre valide avec jusqu'à deux décimales"
    )
    .required('Le montant est requis'),
}).required();

// Type definition for validation
export type FormValidateFinanceSituationUpdateType = yup.InferType<typeof schemaFinanceSituationUpdate>;
