import React, { useContext } from 'react'

import { Button, DialogActions, CircularProgress } from '@mui/material'

import { useProductMediaDeleteMutation } from '@/services/IsyBuildApi'
import { SnackBarContext } from '@/contexts/SnackBarContextProvider'
import type { SnackBarContextType } from '@/types/apps/snackbarType'

interface DeleteProps {
  handleClose: () => void
  handleCloseWithoutRefresh: () => void
  id: number // Assurez-vous que cela correspond au type de votre identifiant média
}

const DeleteProductContent = ({ handleClose, handleCloseWithoutRefresh, id }: DeleteProps) => {
    const [deleteMedia, { isLoading }] = useProductMediaDeleteMutation();  
    const { setOpenSnackBar, setInfoAlert } = useContext(SnackBarContext) as SnackBarContextType;

  const handleDelete = async () => {
    try {
      await deleteMedia({ productMediaId: id }).unwrap() // Passez l'identifiant de l'utilisateur à la mutation
      handleClose()

        console.log('média supprimé avec succès');
        setOpenSnackBar(true);
        setInfoAlert({ severity: "success", message: "média  supprimé avec succès" });
    } catch (error) {
      console.error("Échec de la suppression de l'média :", error)
      setOpenSnackBar(true)
      setInfoAlert({ severity: 'error', message: "Échec de la suppression de média" })
    }
  }

  return (
    <DialogActions className='flex max-sm:flex-col max-sm:items-center max-sm:gap-2 justify-center pbs-0 sm:pbe-16 sm:pli-16'>
      <Button
        variant='contained'
        color='error'
        onClick={handleDelete}
        disabled={isLoading} // Désactive le bouton pendant le chargement
      >
        {isLoading ? <CircularProgress sx={{ color: 'white' }} size={24} /> : "Supprimer média"}
      </Button>
      <Button onClick={handleCloseWithoutRefresh} variant='tonal' color='secondary' className='max-sm:mis-0'>
        Annuler
      </Button>
    </DialogActions>
  )
}

export default DeleteProductContent
