import React, { useContext } from 'react'

import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Button, CircularProgress, DialogActions, DialogContent } from '@mui/material'

import CustomTextField from '@core/components/mui/TextField'
import { useLotsCreateCreateMutation } from '@/services/IsyBuildApi'
import { SnackBarContext } from '@/contexts/SnackBarContextProvider'
import type { SnackBarContextType } from '@/types/apps/snackbarType'

// Define the form validation schema using Yup
const schema = yup
  .object({
    firstName: yup.string().required('First Name is required'),
    description: yup.string().notRequired()
  })
  .required()

type AddLotContentProps = {
  handleClose: () => void
  handleCloseWithoutRefresh: () => void

  // setData: (data: any) => void;
  // userData: any[];
}

type FormValidateType = yup.InferType<typeof schema>

const AddLotContent = ({ handleClose, handleCloseWithoutRefresh }: AddLotContentProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValidateType>({
    resolver: yupResolver(schema)
  })

  const [createLot, { isLoading }] = useLotsCreateCreateMutation()
  const { setOpenSnackBar, setInfoAlert } = useContext(SnackBarContext) as SnackBarContextType

  const onSubmit: SubmitHandler<FormValidateType> = async data => {
    try {
      await createLot({
        lotCreateUpdate: {
          name: data.firstName,
          description: data.description
        }
      }).unwrap()

      setOpenSnackBar(true)
      setInfoAlert({ severity: 'success', message: 'lot ajouté avec succès' })

      handleClose()
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
        <CustomTextField
          fullWidth
          label='Nom '
          variant='outlined'
          placeholder='Entrez le nom'
          className='mbe-2'
          {...register('firstName')}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />
        <CustomTextField
          fullWidth
          label='description'
          variant='outlined'
          multiline
          rows={3}
          placeholder='Entrez votre description'
          id='textarea-outlined'
          className='mbe-2'
          {...register('description')}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
      </DialogContent>
      <DialogActions className='flex max-sm:flex-col max-sm:items-center max-sm:gap-2 justify-center pbs-0 sm:pbe-16 sm:pli-16'>
        <Button variant='contained' type='submit' disabled={isLoading}>
          {isLoading ? <CircularProgress sx={{ color: 'white' }} size={24} /> : 'Créer lots'}
        </Button>
        <Button onClick={handleCloseWithoutRefresh} variant='tonal' color='secondary' className='max-sm:mis-0'>
          Abandonner
        </Button>
      </DialogActions>
    </form>
  )
}

export default AddLotContent
