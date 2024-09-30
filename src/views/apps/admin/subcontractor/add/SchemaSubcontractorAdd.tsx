import * as yup from 'yup'

export const schemaSubcontractorAdd = yup
  .object({
    subcontractorName: yup.string().required('Le nom du entreprise est requis'),
    sireneNumber: yup
      .string()
      .required('Le numéro de Sirene est requis')
      .matches(/^\d+$/, 'Le numéro de Sirene doit contenir uniquement des chiffres')
      .length(9, 'Le numéro de Sirene doit contenir exactement 9 caractères'),
    email: yup.string().email('Veuillez entrer un email valide').required("L'email est requis"),
    phoneNumber: yup.string().required('Phone Number is required'),
    is_active: yup.boolean().required('Active status is required'),
    lots_ids: yup.array().notRequired(),
    client_id: yup.number().notRequired(),
    address: yup.object().shape({
      streetNumber: yup.string().required('Le numéro de rue est requis'),
      streetName: yup.string().required('Le nom de rue est requis'),
      postal_code: yup
        .string()
        .required('Postal Code is required')
        .max(5, 'Le code postal ne doit pas dépasser 5 caractères'),
      city: yup.string().required('La ville est requise'),
      department: yup.string().required('Le département est requis'),
      country: yup.string().required('Le pays est requis')
    })
  })
  .required()

export type FormValidateSubcontractorAddType = yup.InferType<typeof schemaSubcontractorAdd>
