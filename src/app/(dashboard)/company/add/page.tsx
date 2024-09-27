'use client'

import { useContext } from 'react'

import Grid from '@mui/material/Grid'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useForm, type SubmitHandler } from 'react-hook-form'

import CompanyAddHeader from '@views/apps/company/add/CompanyAddHeader'
import AdresseCompany from '@/views/apps/company/add/AdresseCompany'
import AddLotToCompany from '@/views/apps/company/add/AddLotToCompany'
import CompanyInfo from '@views/apps/company/add/CompanyInfo'
import { SnackBarContext } from '@/contexts/SnackBarContextProvider'
import type { SnackBarContextType } from '@/types/apps/snackbarType'
import { useSubcontractorsCreateCreateMutation, type SubcontractorCreateRequest } from '@/services/IsyBuildApi'

const schema = yup
  .object({
    name: yup.string().required('Name is required'),
    siren_number: yup.string().required('Siren is required'),
    contact_email: yup.string().email('Please enter a valid email').required('email is required'),
    phone_number: yup.string().required('Phone Number is required'),
    is_active: yup.boolean().optional(),
    lots_ids: yup.array().notRequired(),
    client_id: yup.number().notRequired(),
    address: yup.object().shape({
      street_number: yup.string().required('Street is required'),
      street_name: yup.string().required('Street name is required'),
      city: yup.string().required('City is required'),
      postal_code: yup.string().required('Postal Code is required'),
      country: yup.string().required('Country is required'),
      department: yup.string().notRequired()
    })
  })
  .required()

type FormValidateType = yup.InferType<typeof schema>

const CompanyAdd = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValidateType>({
    resolver: yupResolver(schema)
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [createSubcontractor, { isLoading }] = useSubcontractorsCreateCreateMutation()

  const { setOpenSnackBar, setInfoAlert } = useContext(SnackBarContext) as SnackBarContextType

  const onSubmit: SubmitHandler<SubcontractorCreateRequest> = async data => {
    try {
      console.log('DATA=', data)

      await createSubcontractor({
        subcontractorCreateRequest: {
          name: data.name,
          siren_number: data.siren_number,
          address: {
            street_number: data.address.street_number,
            street_name: data.address.street_name,
            postal_code: data.address.postal_code,
            city: data.address.city,
            country: data.address.country,
            department: data.address.department
          },
          contact_email: data.contact_email,
          phone_number: data.phone_number,
          is_active: data.is_active,
          lots_ids: data.lots_ids,
          client_id: data.client_id
        }
      }).unwrap()
      reset()
      setOpenSnackBar(true)
      setInfoAlert({ severity: 'success', message: 'subcontractor ajouté avec succès' })

      // Handle success, e.g., display a success message
    } catch (error: any) {
      // Handle error, e.g., display an error message
      if (error.status === 400) {
        setOpenSnackBar(true)
        setInfoAlert({ severity: 'error', message: "Requête incorrecte : Données d'entrée invalides" })
      } else {
        setOpenSnackBar(true)
        setInfoAlert({ severity: 'error', message: "Échec de la création de l'utilisateur" })
        console.error('Failed to create subcontractor:', error)
      }
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CompanyAddHeader onSubmit={handleSubmit(onSubmit)} />
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <CompanyInfo register={register} errors={errors} />
          </Grid>
          <Grid item xs={12}>
            <AdresseCompany register={register} errors={errors} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <AddLotToCompany register={register} errors={errors} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CompanyAdd
