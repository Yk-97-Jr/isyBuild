'use client'

import { useContext } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import Grid from '@mui/material/Grid'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm, type SubmitHandler } from 'react-hook-form'

import { useAuth } from '@/contexts/AuthContext'

import { SnackBarContext } from '@/contexts/SnackBarContextProvider'
import type { SnackBarContextType } from '@/types/apps/snackbarType'
import { useLocalisationCreateMutation } from '@/services/IsyBuildApi'
import AddLocationsHeader from './AddLocationsHeader'
import LocationsInfo from './LocationsInfo'


const schema = yup
  .object({
    firstName: yup.string().required('Le prénom est obligatoire'),
    client_id: yup.number().nullable().required('Le client est obligatoire'), // Add client_id validation
  })
  .required()

export type FormValidateType = yup.InferType<typeof schema>

const LocationsAdd = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValidateType>({
    resolver: yupResolver(schema)
  })

  const [createLocation, { isLoading }] = useLocalisationCreateMutation()
  const { setOpenSnackBar, setInfoAlert } = useContext(SnackBarContext) as SnackBarContextType
  const router = useRouter();
  const { user } = useAuth(); // Obtenez l'utilisateur depuis AuthContext
  const userRole = user?.role
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('return_to'); 

  const onSubmit: SubmitHandler<FormValidateType> = async data => {
    try {
      const response = await createLocation({
        localisationCreateRequest: {
          name: data.firstName,
          client_id: data.client_id, 
         
        }
      }).unwrap()

      setOpenSnackBar(true)
      setInfoAlert({ severity: 'success', message: 'Emplacement ajouté avec succès' })

      const clientId = response.id;

      router.push(`/${userRole}/locations/${clientId}/details`);

      if (returnTo) {
        router.push(`/${userRole}/locations/${clientId}/details?return_to=${returnTo}`);
      }
      else{
        router.push(`/${userRole}/locations/${clientId}/details`);
      }

      reset()
    } catch (err: any) {
      // Vérifiez si l'erreur a un statut et est une erreur 400
      if (err.status === 400) {
        setOpenSnackBar(true)
        setInfoAlert({ severity: 'error', message: "Requête incorrecte : Données d'entrée invalides" })
      } else {
        setOpenSnackBar(true)
        setInfoAlert({ severity: 'error', message: "L'ajout de l'emplacement a échoué" })
      }
    }
  }

  return (
    <Grid container spacing={6} md={22}>
      <Grid item xs={12}>
        <AddLocationsHeader onSubmit={handleSubmit(onSubmit)} isLoading={isLoading} />
      </Grid>
      <Grid item xs={12} md={22}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <LocationsInfo register={register} errors={errors}  />
          </Grid>

        </Grid>
      </Grid>
    </Grid>
  )
}

export default LocationsAdd
