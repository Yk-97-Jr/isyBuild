import * as yup from 'yup'

// Define the validation schema using Yup
export const schemaLotsEdit = yup
  .object({
    firstName: yup.string().required('First Name is required'),
    description: yup.string().notRequired()
  })
  .required()

export type FormValidateLotsEditType = yup.InferType<typeof schemaLotsEdit>
