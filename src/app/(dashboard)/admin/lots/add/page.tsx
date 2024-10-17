'use client'

import { useContext } from 'react'

import { useRouter } from 'next/navigation'

import Grid from '@mui/material/Grid'

import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'

import { useForm, type SubmitHandler } from 'react-hook-form'

import { useAuth } from '@/contexts/AuthContext'

import AddLotsHeader from '@/views/apps/admin/lots/add/AddLotsHeader'


import LotsInfo from '@/views/apps/admin/lots/add/LotsInfo'
import { SnackBarContext } from '@/contexts/SnackBarContextProvider'
import type { SnackBarContextType } from '@/types/apps/snackbarType'
import { useLotsCreateCreateMutation } from '@/services/IsyBuildApi'


const schema = yup
  .object({
    firstName: yup.string().required('First Name is required'),
    description: yup.string().notRequired()
  })
  .required()

type FormValidateType = yup.InferType<typeof schema>

const LotsAdd = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValidateType>({
    resolver: yupResolver(schema)
  })

  const [createLot, { isLoading }] = useLotsCreateCreateMutation()
  const { setOpenSnackBar, setInfoAlert } = useContext(SnackBarContext) as SnackBarContextType
  const router = useRouter();
  const {user} = useAuth();  // Get the user from AuthContext
  const userRole = user?.role

  const onSubmit: SubmitHandler<FormValidateType> = async data => {
    try {
      const response = await createLot({
        lotCreateUpdateRequest: {
          name: data.firstName,
          description: data.description
        }
      }).unwrap()

      setOpenSnackBar(true)
      setInfoAlert({ severity: 'success', message: 'lot ajouté avec succès' })
      
      const clientId = response.id;

      router.push(`/${userRole}/lots/${clientId}/details`);

      reset()
    } catch (err: any) {
      // Vérifiez si l'erreur a un statut et est une erreur 400
      if (err.status === 400) {
        setOpenSnackBar(true)
        setInfoAlert({ severity: 'error', message: "Requête incorrecte : Données d'entrée invalides" })
      } else {
        setOpenSnackBar(true)
        setInfoAlert({ severity: 'error', message: 'La création de lot a échoué' })
      }

      // handleClose();
    }
  }

  return (
    <Grid container spacing={6} md={22}>
      <Grid item xs={12}>
        <AddLotsHeader onSubmit={handleSubmit(onSubmit)} isLoading={isLoading} />
      </Grid>
      <Grid item xs={12} md={22}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <LotsInfo register={register} errors={errors} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LotsAdd
