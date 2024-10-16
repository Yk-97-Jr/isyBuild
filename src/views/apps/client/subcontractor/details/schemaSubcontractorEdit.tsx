import * as yup from 'yup'

// Define the validation schema using Yup
export const schemaSubcontractorEdit = yup
  .object({
    subcontractorName: yup.string().required('Le nom du entreprise est requis'),
    sireneNumber: yup
      .string()
      .required('Le numéro de Sirene est requis')
      .matches(/^\d+$/, 'Le numéro de Sirene doit contenir uniquement des chiffres')
      .length(9, 'Le numéro de Sirene doit contenir exactement 9 caractères'),
    email: yup.string().email('Veuillez entrer un email valide').required("L'email est requis"),
    phoneNumber: yup.string().required('Le numéro de téléphone est requis'),
    address: yup
      .object({
        streetNumber: yup
          .string()
          .required('Le numéro de rue est requis')
          .matches(/^\d+$/, 'Le numéro de rue doit contenir uniquement des chiffres'),
        streetName: yup.string().required('Le nom de rue est requis'),
        postal_code: yup
          .string()
          .required('Postal Code is required')
          .max(5, 'Le code postal ne doit pas dépasser 5 caractères'),
        city: yup.string().required('La ville est requise'),
        department: yup.string().required('Le département est requis'),
        country: yup.string().required('Le pays est requis')
      })
      .required(),
    is_active: yup
      .boolean()
      .required('Active status is required')
      .oneOf([true, false], 'Active status must be true or false'), // Ensures it's a boolean
    lots_ids: yup.array().notRequired(),
    client_id: yup.number().notRequired()
  })
  .required()

export type FormValidateSubcontractorEditType = yup.InferType<typeof schemaSubcontractorEdit>
