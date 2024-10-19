import React, {useContext} from 'react';

import {Button, DialogActions, CircularProgress} from '@mui/material';

import {useClientsDeleteDestroyMutation} from '@/services/IsyBuildApi'; // Change the import to the client deletion mutation
import {SnackBarContext} from "@/contexts/SnackBarContextProvider";
import type {SnackBarContextType} from "@/types/apps/snackbarType";

interface DeleteProps {
  handleClose: () => void;
  handleCloseWithoutRefresh: () => void;
  id: number; // Ensure this matches the type for your clients' ID
}

const DeleteClientContent = ({handleClose, handleCloseWithoutRefresh, id}: DeleteProps) => {
  const [deleteClient, {isLoading}] = useClientsDeleteDestroyMutation(); // Use client deletion mutation
  const {setOpenSnackBar, setInfoAlert} = useContext(SnackBarContext) as SnackBarContextType;

  const handleDelete = async () => {
    try {
      await deleteClient({clientId: id}).unwrap(); // Use clientId for client deletion
      handleClose();

      console.log('Client deleted successfully');
      setOpenSnackBar(true);
      setInfoAlert({severity: "success", message: "Client deleted successfully"});
    } catch (error) {
      console.error('Failed to delete the client:', error);
      setOpenSnackBar(true);
      setInfoAlert({severity: "error", message: "Failed to delete the client"});
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
        {isLoading ? <CircularProgress sx={{color: 'white'}} size={24}/> : 'Supprimer Client'}
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

export default DeleteClientContent;
