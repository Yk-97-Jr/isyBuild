import React, { useContext, useEffect } from 'react'

import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Button, CircularProgress, DialogActions, DialogContent } from '@mui/material'

import CustomTextField from '@core/components/mui/TextField'
import { useLotsUpdateUpdateMutation } from '@/services/IsyBuildApi'
import { SnackBarContext } from '@/contexts/SnackBarContextProvider'
import type { SnackBarContextType } from '@/types/apps/snackbarType'

// Define the form validation schema using Yup
const schema = yup
  .object({
    name: yup.string().required('First Name is required'),
    description: yup.string().notRequired()
  })
  .required()

type FormValidateType = yup.InferType<typeof schema>

interface EditProps {
  handleClose: () => void
  handleCloseWithoutRefresh: () => void
  editValue: any // Define this type according to your data structure
}

const EditLotContent = ({ handleClose, handleCloseWithoutRefresh, editValue }: EditProps) => {
  const [updateLots, { isLoading }] = useLotsUpdateUpdateMutation()
  const { setOpenSnackBar, setInfoAlert } = useContext(SnackBarContext) as SnackBarContextType

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValidateType>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: editValue?.name || '',
      description: editValue?.description || ''
    }
  })

  useEffect(() => {
    reset({
      name: editValue?.name || '',
      description: editValue?.description || ''
    })
  }, [editValue, reset])

  const onSubmit: SubmitHandler<FormValidateType> = async data => {
    try {
      const updatedData = {
        name: data.name,
        description: data.description
      }

      const response = await updateLots({
        lotId: editValue.id, // Assurez-vous que editValue.id contient l'identifiant de l'utilisateur
        lotCreateUpdate: updatedData // Passez l'objet updatedData
      }).unwrap()

      handleClose()

      if (response) {
        console.log('lot mis à jour avec succès')
        setOpenSnackBar(true)
        setInfoAlert({ severity: 'success', message: 'lot mis à jour avec succès' })
      }
    } catch (error) {
      console.error('Échec de la mise à jour de lot :', error)
      setOpenSnackBar(true)
      setInfoAlert({ severity: 'error', message: 'Échec de la mise à jour de lot' })
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
          className='mbe-4'
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <CustomTextField
          fullWidth
          label='description'
          variant='outlined'
          multiline
          rows={3}
          placeholder='Entrez votre description'
          id='textarea-outlined'
          className='mbe-4'
          {...register('description')}
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        <DialogActions className='flex max-sm:flex-col max-sm:items-center max-sm:gap-2 justify-center pbs-0 sm:pbe-16 sm:pli-16'>
          <Button variant='contained' type='submit' disabled={isLoading}>
            {isLoading ? <CircularProgress sx={{ color: 'white' }} size={24} /> : 'Mettre à jour'}
          </Button>
          <Button onClick={handleCloseWithoutRefresh} variant='tonal' color='secondary' className='max-sm:mis-0'>
            Abandonner
          </Button>
        </DialogActions>
      </DialogContent>
    </form>
  )
}

export default EditLotContent
