import * as yup from 'yup'

// Define the validation schema using Yup
export const schemaLocationsEdit = yup
  .object({
    firstName: yup.string().required('Le nom est obligatoire'),
  })
  .required()

export type FormValidateLocationsEditType = yup.InferType<typeof schemaLocationsEdit>
