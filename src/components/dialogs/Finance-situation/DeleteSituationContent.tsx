import React, { useContext } from 'react';

import { Button, DialogActions, CircularProgress } from '@mui/material';

import { useDeleteFinanceSituationMutation } from '@/services/IsyBuildApi'; // Change the import to the client deletion mutation
import { SnackBarContext } from "@/contexts/SnackBarContextProvider";
import type { SnackBarContextType } from "@/types/apps/snackbarType";

interface FinanceSituationProps {
  handleClose: () => void;
  handleCloseWithoutRefresh: () => void;
  id: number; // Ensure this matches the type for your clients' ID
}

const DeleteSituationContent = ({ handleClose, handleCloseWithoutRefresh, id }: FinanceSituationProps) => {
  const [deleteFinanceSituation, { isLoading }] = useDeleteFinanceSituationMutation(); // Use client deletion mutation
  const { setOpenSnackBar, setInfoAlert } = useContext(SnackBarContext) as SnackBarContextType;

  const handleDelete = async () => {
    try {
      await deleteFinanceSituation({ situationId: id }).unwrap(); // Use clientId for client deletion
      handleClose();

      console.log('Situation financière supprimée avec succès');
      setOpenSnackBar(true);
      setInfoAlert({ severity: "success", message: "Situation financière supprimée avec succès" });
    } catch (error) {
      console.error('Échec de la suppression de la situation financière:', error);
      setOpenSnackBar(true);
      setInfoAlert({ severity: "error", message: "Échec de la suppression de la situation financière" });
    }
  };

  return (
    <DialogActions
      className='flex max-sm:flex-col max-sm:items-center max-sm:gap-2 justify-center pbs-0 sm:pbe-16 sm:pli-16'>
      <Button
        variant='contained'
        color='error'
        onClick={handleDelete}
        disabled={isLoading} // Disable the button while loading
      >
        {isLoading ? <CircularProgress sx={{ color: 'white' }} size={24} /> : 'Supprimer la situation financière'}
      </Button>
      <Button
        onClick={handleCloseWithoutRefresh}
        variant='tonal'
        color='secondary'
        className='max-sm:mis-0'
      >
        Annuler
      </Button>
    </DialogActions>
  );
};

export default DeleteSituationContent;
