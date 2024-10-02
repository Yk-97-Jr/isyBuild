import * as yup from 'yup'

export const ProjectUpdateSchema = yup.object({
  code: yup.string().required('Code of the project is required'),
  name: yup.string().required('The name of the project is required'),
  description: yup.string().notRequired(),
  start_date: yup.string().nullable(),
  budget: yup.string().notRequired(),
  address: yup
    .object({
      street_address: yup.string().required('Street address is required'),
      city: yup.string().required('City is required'),
      state: yup.string().required('State is required'),
      postal_code: yup.string().required('Postal code is required'),
      country: yup.string().required('Country is required')
    })
    .required('Address is required')

  //   map_coordinate: MapCoordinateSchema.required('Map coordinate is required')
  
})
export type FormValidateEditProjectSchema = yup.InferType<typeof ProjectUpdateSchema>;
