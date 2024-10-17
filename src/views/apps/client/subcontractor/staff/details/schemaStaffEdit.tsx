import * as yup from 'yup'

// Define the validation schema using Yup
export const schemaStaffEdit = yup
  .object({
    first_name: yup.string().required('Le prénom est requis'),
    last_name: yup.string().required('Le nom de famille est requis'),
    is_active: yup.boolean().required('Active status is required'),
    email: yup.string().email('Veuillez entrer un email valide').optional(), // Optional email field
  })
  .required()


// Type definition for validation
export type FormValidateStaffEditType = yup.InferType<typeof schemaStaffEdit>
