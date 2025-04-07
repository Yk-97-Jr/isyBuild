import React, { useContext } from 'react'

import { Button, DialogActions, CircularProgress } from '@mui/material'

import { SnackBarContext } from '@/contexts/SnackBarContextProvider'
import type { SnackBarContextType } from '@/types/apps/snackbarType'
import {useProjectIntervenantDeleteMutation} from "@/services/IsyBuildApi";

interface DeleteProps {
  handleClose: () => void
  handleCloseWithoutRefresh: () => void
  id: number // Assurez-vous que cela correspond au type de votre identifiant utilisateur
}

const DeleteIntervenantContent = ({ handleClose, handleCloseWithoutRefresh, id }: DeleteProps) => {
  const [deleteIntervenant, { isLoading }] = useProjectIntervenantDeleteMutation();
  const { setOpenSnackBar, setInfoAlert } = useContext(SnackBarContext) as SnackBarContextType;

  const handleDelete = async () => {
    try {
      await deleteIntervenant({ projectIntervenantId: id }).unwrap() // Passez l'identifiant de l'utilisateur à la mutation
      handleClose()

        setOpenSnackBar(true);
        setInfoAlert({ severity: "success", message: "Intervenant supprimé avec succès" });
    } catch (error) {
      setOpenSnackBar(true)
      setInfoAlert({ severity: 'error', message: "Échec de la suppression de l'Intervenant" })
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
        {isLoading ? <CircularProgress sx={{ color: 'white' }} size={24} /> : "Supprimer l'Intervenant"}
      </Button>
      <Button onClick={handleCloseWithoutRefresh} variant='tonal' color='secondary' className='max-sm:mis-0'>
        Annuler
      </Button>
    </DialogActions>
  )
}

export default DeleteIntervenantContent
