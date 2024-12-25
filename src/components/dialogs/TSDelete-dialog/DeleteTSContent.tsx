import React, { useContext } from 'react';

import { Button, DialogActions, CircularProgress } from '@mui/material';

import { useDeleteTravailSupplementaireMutation } from '@/services/IsyBuildApi';
import { SnackBarContext } from '@/contexts/SnackBarContextProvider';
import type { SnackBarContextType } from '@/types/apps/snackbarType';

interface TravailSupplementaireProps {
  handleClose: () => void;
  handleCloseWithoutRefresh: () => void;
  id: number;
}

const DeleteTSContent: React.FC<TravailSupplementaireProps> = ({
  handleClose,
  handleCloseWithoutRefresh,
  id,
}) => {
  const [deleteTravailSupplementaire, { isLoading }] = useDeleteTravailSupplementaireMutation();
  const { setOpenSnackBar, setInfoAlert } = useContext(SnackBarContext) as SnackBarContextType;

  const handleDelete = async () => {
    try {
      await deleteTravailSupplementaire({ tsId: id }).unwrap();
      handleClose();

      console.log('Travail supplémentaire supprimé avec succès');
      setOpenSnackBar(true);
      setInfoAlert({ severity: 'success', message: 'Travail supplémentaire supprimé avec succès' });
    } catch (error) {
      console.error('Échec de la suppression du travail supplémentaire:', error);
      setOpenSnackBar(true);
      setInfoAlert({
        severity: 'error',
        message: 'Échec de la suppression du travail supplémentaire',
      });
    }
  };

  return (
    <DialogActions
      className="flex max-sm:flex-col max-sm:items-center max-sm:gap-2 justify-center pbs-0 sm:pbe-16 sm:pli-16"
    >
      <Button
        variant="contained"
        color="error"
        onClick={handleDelete}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress sx={{ color: 'white' }} size={24} /> : 'Supprimer le travail supplémentaire'}
      </Button>
      <Button
        onClick={handleCloseWithoutRefresh}
        variant="tonal"
        color="secondary"
        className="max-sm:mis-0"
      >
        Annuler
      </Button>
    </DialogActions>
  );
};

export default DeleteTSContent;
