import React, {useContext} from 'react';


import {Button, DialogActions, CircularProgress} from '@mui/material';

import DialogTitle from "@mui/material/DialogTitle";


import Dialog from "@mui/material/Dialog";

import {SnackBarContext} from '@/contexts/SnackBarContextProvider';
import type {SnackBarContextType} from '@/types/apps/snackbarType';
import {
  useDocumentDiffusionDocumentDeleteMutation,
} from '@/services/IsyBuildApi';

import DialogCloseButton from "@components/dialogs/DialogCloseButton";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  refetch?: () => void;
  id: number | undefined;
}

const DeleteDocumentDocDiff = ({open, setOpen, id, refetch}: Props) => {
  const {setOpenSnackBar, setInfoAlert} = useContext(SnackBarContext) as SnackBarContextType;
  const [deletedDocumentDocDiff, {isLoading}] = useDocumentDiffusionDocumentDeleteMutation();

  const handleClose = () => {
    setOpen(false);

    if (refetch) {
      refetch();
    }
  };

  const handleCloseWithoutRefresh = () => {
    setOpen(false);

  };

  // Handle deleting the user (you can customize this part)
  const handleDelete = async () => {

    try {
      if (id !== undefined) {
        try {
          await deletedDocumentDocDiff({documentId: +id}).unwrap();
          handleClose();
          setOpenSnackBar(true);
          setInfoAlert({severity: 'success', message: 'Fichier supprimé avec succès'});
        } catch (error) {
          // Handle error in the deletion process
          const message = error && typeof error === 'object' && 'data' in error
            ? JSON.stringify((error as { data?: unknown }).data)
            : 'Une erreur inattendue est survenue.';

          setOpenSnackBar(true);
          setInfoAlert({severity: 'error', message});
        }
      } else {
        // Handle the case where id is undefined
        setOpenSnackBar(true);
        setInfoAlert({severity: 'error', message: 'L\'identifiant du document est manquant.'});
      }
    } catch (error) {
      // General catch block for any unexpected errors
      const message = error && typeof error === 'object' && 'data' in error
        ? JSON.stringify((error as { data?: unknown }).data)
        : 'Une erreur inattendue est survenue.';

      setOpenSnackBar(true);
      setInfoAlert({severity: 'error', message});
    }
  }


  return (
    <Dialog open={open} onClose={handleCloseWithoutRefresh}
            sx={{
              '& .MuiDialog-paper': {
                overflow: 'visible',
                width: '35%', // Set the dialog width to 80% of the viewport
                maxWidth: '1200px', // Set a maximum width for larger screens
              }
            }}>
      <DialogCloseButton onClick={handleCloseWithoutRefresh} disableRipple>
        <i className='tabler-x'/>
      </DialogCloseButton>
      <DialogTitle variant='h4' className='flex flex-col gap-2 text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
        Supprimer Doucument
      </DialogTitle>
      <DialogActions
        className='flex max-sm:flex-col max-sm:items-center max-sm:gap-2 justify-center pbs-0 sm:pbe-16 sm:pli-16'>
        <Button
          variant='contained'
          color='error'
          onClick={handleDelete}
          disabled={isLoading} // Désactive le bouton pendant le chargement
        >
          {isLoading ? <CircularProgress sx={{color: 'white'}} size={24}/> : "Supprimer"}
        </Button>
        <Button onClick={handleCloseWithoutRefresh} variant='tonal' color='secondary' className='max-sm:mis-0'>
          Annuler
        </Button>
      </DialogActions>

    </Dialog>
  );
};

export default DeleteDocumentDocDiff;
