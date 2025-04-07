import React, { useContext } from 'react'

import { Button, DialogActions, CircularProgress } from '@mui/material'

import { useDocumentDiffusionDeleteMutation } from '@/services/IsyBuildApi'
import { SnackBarContext } from '@/contexts/SnackBarContextProvider'
import type { SnackBarContextType } from '@/types/apps/snackbarType'

interface DeleteProps {
  handleClose: () => void
  handleCloseWithoutRefresh: () => void
  id: number // Ensure this matches your document ID type
}

const DeleteDocumentContent = ({ handleClose, handleCloseWithoutRefresh, id }: DeleteProps) => {
  const [deleteDocument, { isLoading }] = useDocumentDiffusionDeleteMutation()
  const { setOpenSnackBar, setInfoAlert } = useContext(SnackBarContext) as SnackBarContextType

  const handleDelete = async () => {
    try {
      await deleteDocument({ documentDiffusionId: id }).unwrap() // Pass the document ID to the mutation
      handleClose()

      console.log('Document supprimé avec succès')
      setOpenSnackBar(true)
      setInfoAlert({ severity: 'success', message: "Document supprimé avec succès" })
    } catch (error) {
      console.error("Échec de la suppression du document :", error)
      setOpenSnackBar(true)
      setInfoAlert({ severity: 'error', message: "Échec de la suppression du document" })
    }
  }

  return (
    <DialogActions className='flex max-sm:flex-col max-sm:items-center max-sm:gap-2 justify-center pbs-0 sm:pbe-16 sm:pli-16'>
      <Button
        variant='contained'
        color='error'
        onClick={handleDelete}
        disabled={isLoading} // Disable the button during loading
      >
        {isLoading ? <CircularProgress sx={{ color: 'white' }} size={24} /> : "Supprimer le document"}
      </Button>
      <Button onClick={handleCloseWithoutRefresh} variant='tonal' color='secondary' className='max-sm:mis-0'>
        Annuler
      </Button>
    </DialogActions>
  )
}

export default DeleteDocumentContent
