import * as yup from 'yup'

export const schemaProductAdd = yup
  .object({
    productName: yup.string().required('Le nom du produit est requis'),
    description: yup.string().notRequired(),
    technicalSheet: yup
      .string()
      .url('Veuillez entrer une URL valide') // Ensures the input is a valid URL
      .notRequired(), // Makes it required
      category: yup
      .number()
      .typeError('La catégorie est requise') // Validates the category is a number
      .required('La catégorie est requise'), // Makes it required
  })
  .required();

export type FormValidateProductAddType = yup.InferType<typeof schemaProductAdd>
