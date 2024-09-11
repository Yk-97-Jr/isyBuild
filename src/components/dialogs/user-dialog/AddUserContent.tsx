import React, {useContext} from 'react';

import type {SubmitHandler} from 'react-hook-form';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Button, CircularProgress, DialogActions, DialogContent} from '@mui/material';

import CustomTextField from '@core/components/mui/TextField';
import {useAdminStaffCreateCreateMutation} from '@/services/IsyBuildApi';
import {SnackBarContext} from "@/contexts/SnackBarContextProvider";
import type {SnackBarContextType} from "@/types/apps/snackbarType";

// Define the form validation schema using Yup
const schema = yup.object({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  phoneNumber: yup.string().required('Phone Number is required'),
}).required();

type AddUserContentProps = {
  handleClose: () => void;
  handleCloseWithoutRefresh: () => void;

  // setData: (data: any) => void;
  // userData: any[];
};

type FormValidateType = yup.InferType<typeof schema>;

const AddUserContent = ({handleClose, handleCloseWithoutRefresh}: AddUserContentProps) => {
  const {register, handleSubmit, reset, formState: {errors}} = useForm<FormValidateType>({
    resolver: yupResolver(schema),
  });

  const [createUser, {isLoading}] = useAdminStaffCreateCreateMutation();
  const {setOpenSnackBar, setInfoAlert} = useContext(SnackBarContext) as SnackBarContextType

  console.log("add users")


  const onSubmit: SubmitHandler<FormValidateType> = async (data) => {
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

      setOpenSnackBar(true);
      setInfoAlert({severity: "success", message: "User added successfully"});

      handleClose();
      reset();
    } catch (err: any) {
      // Check if the error has a status and is a 400 error
      if (err.status === 400) {
        setOpenSnackBar(true);
        setInfoAlert({severity: "error", message: "Bad request: Invalid input data"});
      } else {
        setOpenSnackBar(true);
        setInfoAlert({severity: "error", message: "Failed to create users"});
      }

      // handleClose();
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
        <CustomTextField
          fullWidth
          label='Prénom'
          variant='outlined'
          placeholder='Enter First Name'
          className='mbe-2'
          {...register('firstName')}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />
        <CustomTextField
          fullWidth
          label='Nom'
          variant='outlined'
          placeholder='Enter Last Name'
          className='mbe-2'
          {...register('lastName')}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />
        <CustomTextField
          fullWidth
          label='Email Address'
          variant='outlined'
          placeholder='Enter Email Address'
          className='mbe-2'
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <CustomTextField
          fullWidth
          label='Phone Number'
          variant='outlined'
          placeholder='Enter Phone Number'
          className='mbe-2'
          {...register('phoneNumber')}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
        />
      </DialogContent>
      <DialogActions
        className='flex max-sm:flex-col max-sm:items-center max-sm:gap-2 justify-center pbs-0 sm:pbe-16 sm:pli-16'>
        <Button variant='contained' type='submit' disabled={isLoading}>
            {isLoading ? <CircularProgress sx={{ color: 'white' }} size={24}/> : 'Create User'}
          </Button>
        <Button onClick={handleCloseWithoutRefresh} variant='tonal' color='secondary' className='max-sm:mis-0'>
          Discard
        </Button>
      </DialogActions>
    </form>
  );
};

export default AddUserContent;
