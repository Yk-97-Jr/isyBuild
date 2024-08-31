import type {Dispatch, SetStateAction} from 'react';
import React, {useState} from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import {CircularProgress, Snackbar} from '@mui/material';

// Assuming CustomTextField and DialogCloseButton are components you already have
import {useForm} from "react-hook-form";

import CustomTextField from '@core/components/mui/TextField';
import DialogCloseButton from '../DialogCloseButton';
import {
  useAdminUsersDeleteDestroyMutation,
  useAdminStaffCreateCreateMutation,
  useAdminStaffUpdatePartialUpdateMutation
} from '@/services/IsyBuildApi';
import type {UsersType} from "@/types/apps/usersType";

type UserDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  id?: number;
  setId: Dispatch<SetStateAction<number>>
  data?: string; // Optional: For editing, you might pass user data
  setEditValue: Dispatch<SetStateAction<UsersType | undefined>>
  editValue?: UsersType; // Updated type
};

type EditProps = {
  handleClose: () => void;
  editValue: UsersType;
};
type AddUserContentProps = {
  handleClose: () => void;

  // setData: (data: any) => void;
  // userData: any[];
};

type FormValidateType = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

const AddUserContent = ({handleClose}: AddUserContentProps) => {
  const {register, handleSubmit, reset} = useForm<FormValidateType>();
  const [createUser, {isLoading, isSuccess}] = useAdminStaffCreateCreateMutation();
  const [, setShowSuccessMessage] = useState(false);

  const onSubmit = async (data: FormValidateType) => {
    try {
      console.log(data);

      await createUser({
        adminStaffCreate: {
          user: {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            redirect_uri: "http://localhost:3001/users/list",
          },
        },
      }).unwrap();

      // Handle successful response
      // setData([...(userData ?? []), response]);
      setShowSuccessMessage(true);
      handleClose();
      reset();
    } catch (err) {
      console.error('Failed to create user:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
        <CustomTextField
          fullWidth
          label='First Name'
          variant='outlined'
          placeholder='Enter First Name'
          className='mbe-2'
          {...register('firstName')}
        />
        <CustomTextField
          fullWidth
          label='Last Name'
          variant='outlined'
          placeholder='Enter Last Name'
          className='mbe-2'
          {...register('lastName')}
        />
        <CustomTextField
          fullWidth
          label='Email Address'
          variant='outlined'
          placeholder='Enter Email Address'
          className='mbe-2'
          {...register('email')}
        />
        <CustomTextField
          fullWidth
          label='Phone Number'
          variant='outlined'
          placeholder='Enter Phone Number'
          className='mbe-2'
          {...register('phoneNumber')}
        />
      </DialogContent>
      <DialogActions
        className='flex max-sm:flex-col max-sm:items-center max-sm:gap-2 justify-center pbs-0 sm:pbe-16 sm:pli-16'>
        <Button type='submit' variant='contained' disabled={isLoading}>
          {isLoading ? <CircularProgress size={24}/> : 'Create User'}
        </Button>
        <Button onClick={handleClose} variant='tonal' color='secondary' className='max-sm:mis-0'>
          Discard
        </Button>
      </DialogActions>
      <Snackbar open={isSuccess} autoHideDuration={6000} onClose={() => setShowSuccessMessage(false)}>
        <Alert onClose={() => setShowSuccessMessage(false)} severity="success" sx={{width: '100%'}}>
          User created successfully!
        </Alert>
      </Snackbar>
    </form>
  );
};

const EditUserContent = ({handleClose, editValue}: EditProps) => {
  const [updateUser, {isLoading, isSuccess, isError}] = useAdminStaffUpdatePartialUpdateMutation();
  const [formData, setFormData] = useState(editValue);

  console.log('formData' + formData.id)
  console.log('editValue' + editValue)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    // Update the nested user object within formData
    setFormData((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      // Create the updated data object, mapping formData to the corresponding fields
      const updatedData = {
        first_name: formData.user.first_name,
        last_name: formData.user.last_name,
        is_active: formData.user.is_active
      };

      // Perform the update operation
      const response = await updateUser({
        adminUserId: formData.id, // Ensure formData.id contains the user's ID
        patchedAdminStaffUpdate: updatedData // Pass the updatedData object
      }).unwrap();

      handleClose();

      if (response) {
        console.log('User updated successfully');
      }
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  return (
    <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
      <div className='flex flex-col gap-4 mbe-2'>
        <div className='flex gap-4'>
          <CustomTextField
            fullWidth
            size='small'
            name='first_name'
            value={formData.user.first_name}
            onChange={handleChange}
            variant='outlined'
            label='First Name'
            placeholder='Enter First Name'
          />
          <CustomTextField
            fullWidth
            size='small'
            name='last_name'
            value={formData.user.last_name}
            onChange={handleChange}
            variant='outlined'
            label='Last Name'
            placeholder='Enter Last Name'
          />
        </div>
        <CustomTextField
          fullWidth
          size='small'
          name='email'
          value={formData.user.email}
          onChange={handleChange}
          variant='outlined'
          label='Email'
          placeholder='Enter Email'
        />
      </div>
      <div className='flex justify-end gap-4'>
        <Button variant='contained' onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? <CircularProgress size={24}/> : 'Update'}
        </Button>
        {isError && <div className='text-red-500'>Failed to update user</div>}
        {isSuccess && <div className='text-green-500'>User updated successfully</div>}
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

    setEditValue(undefined)
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
