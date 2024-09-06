import React from 'react';

import {Button, DialogActions, CircularProgress} from '@mui/material';

import {useAdminUsersDeleteDestroyMutation} from '@/services/IsyBuildApi';

interface DeleteProps {
  handleClose: () => void;
  id: string; // Ensure this matches the type for your user ID
  setOpenSnackBar: (open: boolean) => void;
  setInfoAlert: (alert: { severity: string; message: string }) => void;
}

const DeleteUserContent = ({handleClose, id, setOpenSnackBar, setInfoAlert}: DeleteProps) => {
  const [deleteUser, {isLoading, isSuccess}] = useAdminUsersDeleteDestroyMutation();

  const handleDelete = async () => {
    try {
      await deleteUser({adminUserId: id}).unwrap(); // Pass the adminUserId to the mutation
      handleClose();

      if (isSuccess) {
        console.log('User deleted successfully');
        setOpenSnackBar(true);
        setInfoAlert({severity: "success", message: "User deleted successfully"});
      }
    } catch (error) {
      console.error('Failed to delete the user:', error);
      setOpenSnackBar(true);
      setInfoAlert({severity: "error", message: "Failed to delete the user"});
    }
  };

  return (
    <DialogActions
      className='flex max-sm:flex-col max-sm:items-center max-sm:gap-2 justify-center pbs-0 sm:pbe-16 sm:pli-16'
    >
      <Button
        variant='contained'
        color='error'
        onClick={handleDelete}
        disabled={isLoading} // Disable the button while loading
      >
        {isLoading ? <CircularProgress size={24}/> : 'Delete User'}
      </Button>
      <Button
        onClick={handleClose}
        variant='tonal'
        color='secondary'
        className='max-sm:mis-0'
      >
        Cancel
      </Button>
    </DialogActions>
  );
};

export default DeleteUserContent;
