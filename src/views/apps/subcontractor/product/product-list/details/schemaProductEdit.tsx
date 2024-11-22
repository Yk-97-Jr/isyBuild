import * as yup from 'yup'

// Define the validation schema using Yup
export const schemaProductEdit =  yup
.object({
  productName: yup.string().required('Le nom du produit est requis'),
  description: yup.string().notRequired(),
  technicalSheet: yup
    .string()
    .url('Veuillez entrer une URL valide').notRequired(), // Ensures the input is a valid URL
    category: yup
    .number()
    .typeError('La catégorie est requise') // Validates the category is a number
    .required('La catégorie est requise'), // Makes it required
    image: yup
    .mixed()
    .notRequired(),
    
})
.required();


export type FormValidateProductEditType = yup.InferType<typeof schemaProductEdit>
