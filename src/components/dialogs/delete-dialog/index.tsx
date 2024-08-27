import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// Assuming CustomTextField and DialogCloseButton are components you already have
import CustomTextField from '@core/components/mui/TextField';
import DialogCloseButton from '../DialogCloseButton';
import {useAdminUsersDeleteDestroyMutation} from '@/services/IsyBuildApi';

type UserDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  id?: number;
  data?: string; // Optional: For editing, you might pass user data
  setData: (data: { firstName: string; lastName: string; email: string } | null) => void;
};

type EditProps = {
  handleClose: () => void;
  editValue: {
    first_name: string;
    last_name: string;
    email: string;
  };
};

const AddUserContent = ({handleClose}: { handleClose: () => void }) => {
  return (
    <>
      <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
        <CustomTextField
          fullWidth
          label='User Name'
          variant='outlined'
          placeholder='Enter User Name'
          className='mbe-2'
        />
        <CustomTextField
          fullWidth
          label='Email Address'
          variant='outlined'
          placeholder='Enter Email Address'
          className='mbe-2'
        />
      </DialogContent>
      <DialogActions
        className='flex max-sm:flex-col max-sm:items-center max-sm:gap-2 justify-center pbs-0 sm:pbe-16 sm:pli-16'>
        <Button type='submit' variant='contained' onClick={handleClose}>
          Create User
        </Button>
        <Button onClick={handleClose} variant='tonal' color='secondary' className='max-sm:mis-0'>
          Discard
        </Button>
      </DialogActions>
    </>
  );
};

const EditUserContent = ({handleClose, editValue}: EditProps) => {
  return (
    <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
      <div className='flex flex-col gap-4 mbe-2'>
        <div className='flex gap-4'>
          <CustomTextField
            fullWidth
            size='small'
            defaultValue={editValue.first_name}
            variant='outlined'
            label='First Name'
            placeholder='Enter First Name'
          />
          <CustomTextField
            fullWidth
            size='small'
            defaultValue={editValue.last_name}
            variant='outlined'
            label='Last Name'
            placeholder='Enter Last Name'
          />
        </div>
        <CustomTextField
          fullWidth
          size='small'
          defaultValue={editValue.email}
          variant='outlined'
          label='Email'
          placeholder='Enter Email'
        />
      </div>
      <div className='flex justify-end gap-4'>
        <Button variant='contained' onClick={handleClose}>
          Update
        </Button>
      </div>
    </DialogContent>
  );
};

const DeleteUserContent = ({handleClose, id}: { handleClose: () => void; id: number }) => {
  const [deleteUser, {isLoading, isSuccess}] = useAdminUsersDeleteDestroyMutation();

  const handleDelete = async () => {
    try {
      await deleteUser({adminUserId: id}).unwrap(); // Pass the adminUserId to the mutation
      handleClose();

      if (isSuccess) {
        console.log('User deleted successfully');
      }
    } catch (error) {
      console.error('Failed to delete the user:', error);
    }
  };

  return (
    <>

      <DialogActions
        className='flex max-sm:flex-col max-sm:items-center max-sm:gap-2 justify-center pbs-0 sm:pbe-16 sm:pli-16'>
        <Button
          variant='contained'
          color='error'
          onClick={handleDelete}
          disabled={isLoading} // Disable the button while loading
        >
          {isLoading ? 'Deleting...' : 'Delete User'}
        </Button>
        <Button onClick={handleClose} variant='tonal' color='secondary' className='max-sm:mis-0'>
          Cancel
        </Button>
      </DialogActions>
    </>
  );
};

const UserDialog = ({open, setOpen, id, editValue, setEditValue}: UserDialogProps) => {
  console.log('editValue' + editValue)
  console.log('id' + id)

  const handleClose = () => {
    setOpen(false);
    console.log("aaaaaaaaaaaaaa")
    setEditValue(null)
  };

  console.log("editValue" + editValue)
  const isDelete = !!id && !editValue;
  const isEdit = !!editValue;

  return (
    <Dialog open={open} onClose={handleClose} sx={{'& .MuiDialog-paper': {overflow: 'visible'}}}>
      <DialogCloseButton onClick={handleClose} disableRipple>
        <i className='tabler-x'/>
      </DialogCloseButton>
      <DialogTitle variant='h4' className='flex flex-col gap-2 text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
        {isDelete ? 'Delete User' : isEdit ? 'Edit User' : 'Add New User'}
        <Typography component='span' className='flex flex-col text-center'>
          {isDelete
            ? 'Are you sure you want to delete this user?'
            : isEdit
              ? 'Edit the user details below.'
              : 'Fill in the details to create a new user.'}
        </Typography>
      </DialogTitle>
      {isDelete ? (
        <DeleteUserContent handleClose={handleClose} id={id!}/>
      ) : isEdit ? (
        <EditUserContent handleClose={handleClose} editValue={editValue!}/>
      ) : (
        <AddUserContent handleClose={handleClose}/>
      )}
    </Dialog>
  );
};

export default UserDialog;
