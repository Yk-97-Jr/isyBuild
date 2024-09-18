import React, {useContext} from 'react';

import type {SubmitHandler} from 'react-hook-form';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Button, CircularProgress, DialogActions, DialogContent} from '@mui/material';

import CustomTextField from '@core/components/mui/TextField';
import {useClientsCreateCreateMutation} from '@/services/IsyBuildApi';
import {SnackBarContext} from "@/contexts/SnackBarContextProvider";
import type {SnackBarContextType} from "@/types/apps/snackbarType";

// Define the form validation schema using Yup
const schema = yup.object({
  name: yup.string().required('Name is required'),
  siren_number: yup.string().required('SIREN number is required'),
  contact_email: yup.string().email('Please enter a valid email').required('Email is required'),
  phone_number: yup.string().required('Phone Number is required'),
  address: yup.object({
    street_number: yup.string().required('Street number is required'),
    street_name: yup.string().required('Street name is required'),
    postal_code: yup.string().required('Postal code is required'),
    city: yup.string().required('City is required'),
    department: yup.string().nullable(),
    region: yup.string().nullable(),
    country: yup.string().required('Country is required'),
  }).required(),
}).required();

type AddClientContentProps = {
  handleClose: () => void;
  handleCloseWithoutRefresh: () => void;
};

type FormValidateType = yup.InferType<typeof schema>;

const AddClientContent = ({handleClose, handleCloseWithoutRefresh}: AddClientContentProps) => {
  const {register, handleSubmit, reset, formState: {errors}} = useForm<FormValidateType>({
    resolver: yupResolver(schema),
  });

  const [createClient, {isLoading}] = useClientsCreateCreateMutation();
  const {setOpenSnackBar, setInfoAlert} = useContext(SnackBarContext) as SnackBarContextType;

  const onSubmit: SubmitHandler<FormValidateType> = async (data) => {
    try {
      await createClient({
        clientCreateUpdate: {
          name: data.name,
          siren_number: data.siren_number,
          contact_email: data.contact_email,
          phone_number: data.phone_number,
          address: {
            street_number: data.address.street_number,
            street_name: data.address.street_name,
            postal_code: data.address.postal_code,
            city: data.address.city,
            department: data.address.department || null,
            region: data.address.region || null,
            country: data.address.country,
          },
        }

      }).unwrap();

      setOpenSnackBar(true);
      setInfoAlert({severity: "success", message: "Client added successfully"});

      handleClose();
      reset();
    } catch (err: any) {
      if (err.status === 400) {
        setOpenSnackBar(true);
        setInfoAlert({severity: "error", message: "Bad request: Invalid input data"});
      } else {
        setOpenSnackBar(true);
        setInfoAlert({severity: "error", message: "Failed to create client"});
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Add scrollable content with a maximum height */}
      <DialogContent
        className='overflow-auto pbs-0 sm:pli-16'
        sx={{
          maxHeight: {xs: '300px', sm: '500px'}, // Scrollbar height on small/large devices
          overflowY: 'auto',
        }}
      >
        <div className="mt-4">
          <div className="grid gap-y-4 gap-x-3">
            {/* Form Fields */}
            <CustomTextField
              fullWidth
              label='Client Name'
              variant='outlined'
              placeholder='Enter Client Name'
              className='mbe-2'
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <CustomTextField
              fullWidth
              label='SIREN Number'
              variant='outlined'
              placeholder='Enter SIREN Number'
              className='mbe-2'
              {...register('siren_number')}
              error={!!errors.siren_number}
              helperText={errors.siren_number?.message}
            />
            <CustomTextField
              fullWidth
              label='Contact Email'
              variant='outlined'
              placeholder='Enter Contact Email'
              className='mbe-2'
              {...register('contact_email')}
              error={!!errors.contact_email}
              helperText={errors.contact_email?.message}
            />
            <CustomTextField
              fullWidth
              label='Phone Number'
              variant='outlined'
              placeholder='Enter Phone Number'
              className='mbe-2'
              {...register('phone_number')}
              error={!!errors.phone_number}
              helperText={errors.phone_number?.message}
            />
            <CustomTextField
              fullWidth
              label='Street Number'
              variant='outlined'
              placeholder='Enter Street Number'
              className='mbe-2'
              {...register('address.street_number')}
              error={!!errors.address?.street_number}
              helperText={errors.address?.street_number?.message}
            />
            <CustomTextField
              fullWidth
              label='Street Name'
              variant='outlined'
              placeholder='Enter Street Name'
              className='mbe-2'
              {...register('address.street_name')}
              error={!!errors.address?.street_name}
              helperText={errors.address?.street_name?.message}
            />
            <CustomTextField
              fullWidth
              label='Postal Code'
              variant='outlined'
              placeholder='Enter Postal Code'
              className='mbe-2'
              {...register('address.postal_code')}
              error={!!errors.address?.postal_code}
              helperText={errors.address?.postal_code?.message}
            />
            <CustomTextField
              fullWidth
              label='City'
              variant='outlined'
              placeholder='Enter City'
              className='mbe-2'
              {...register('address.city')}
              error={!!errors.address?.city}
              helperText={errors.address?.city?.message}
            />
            <CustomTextField
              fullWidth
              label='Country'
              variant='outlined'
              placeholder='Enter Country'
              className='mbe-2'
              {...register('address.country')}
              error={!!errors.address?.country}
              helperText={errors.address?.country?.message}
            />
          </div>
        </div>
      </DialogContent>

      {/* Responsive DialogActions with stacking on small screens */}
      <DialogActions
        className='flex max-sm:flex-col max-sm:items-center max-sm:gap-2 justify-center pbs-0 sm:pbe-16 sm:pli-16'>
        <Button variant='contained' type='submit' disabled={isLoading}>
          {isLoading ? <CircularProgress sx={{color: 'white'}} size={24}/> : 'Create Client'}
        </Button>
        <Button onClick={handleCloseWithoutRefresh} variant='tonal' color='secondary' className='max-sm:mis-0'>
          Discard
        </Button>
      </DialogActions>
    </form>
  );
};

export default AddClientContent;
