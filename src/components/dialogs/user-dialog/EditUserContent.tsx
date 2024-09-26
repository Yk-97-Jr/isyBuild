import React, {useContext, useEffect} from 'react';

import type {SubmitHandler} from 'react-hook-form';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Button, CircularProgress, DialogContent, FormControlLabel, Switch} from '@mui/material';

import CustomTextField from '@core/components/mui/TextField';
import {useAdminStaffUpdatePartialUpdateMutation} from '@/services/IsyBuildApi';
import {SnackBarContext} from "@/contexts/SnackBarContextProvider";
import type {SnackBarContextType} from "@/types/apps/snackbarType";

// Define the form validation schema using Yup
const schema = yup.object({
  first_name: yup.string().required('First Name is required'),
  last_name: yup.string().required('Last Name is required'),
  is_active: yup.boolean().required('Active status is required'),
}).required();

type FormValidateType = yup.InferType<typeof schema>;

interface EditProps {
  handleClose: () => void;
  handleCloseWithoutRefresh: () => void;
  editValue: any; // Define this type according to your data structure
}

const EditUserContent = ({handleClose, handleCloseWithoutRefresh, editValue}: EditProps) => {
  const [updateUser, {isLoading}] = useAdminStaffUpdatePartialUpdateMutation();
  const {setOpenSnackBar, setInfoAlert} = useContext(SnackBarContext) as SnackBarContextType;

  const {register, handleSubmit, reset, formState: {errors}} = useForm<FormValidateType>({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: editValue?.user?.first_name || '',
      last_name: editValue?.user?.last_name || '',
      is_active: editValue?.user?.is_active || false,
    },
  });

  useEffect(() => {
    reset({
      first_name: editValue?.user?.first_name || '',
      last_name: editValue?.user?.last_name || '',
      is_active: editValue?.user?.is_active || false,
    });
  }, [editValue, reset]);

  const onSubmit: SubmitHandler<FormValidateType> = async (data) => {
    try {
      const updatedData = {
        first_name: data.first_name,
        last_name: data.last_name,
        is_active: data.is_active,
      };

      const response = await updateUser({
        adminUserId: editValue.id, // Assurez-vous que editValue.id contient l'identifiant de l'utilisateur
        patchedAdminStaffUpdateRequest: updatedData, // Passez l'objet updatedData
      }).unwrap();




      handleClose();

      if (response) {

        setOpenSnackBar(true);

      }
    } catch (error) {

      setOpenSnackBar(true);
      setInfoAlert({ severity: "error", message: "Échec de la mise à jour de l'utilisateur" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
        <div className='flex flex-col gap-4 mbe-2'>
          <div className='flex gap-4'>
            <CustomTextField
              fullWidth
              size="small"
              label="Prénom"
              placeholder="Entrez le prénom"
              variant="outlined"
              {...register('first_name')}
              error={!!errors.first_name}
              helperText={errors.first_name?.message}
            />
            <CustomTextField
              fullWidth
              size='small'
              label='Nom'
              placeholder='Entrez le nom'
              variant='outlined'
              {...register('last_name')}
              error={!!errors.last_name}
              helperText={errors.last_name?.message}
            />
          </div>
          <FormControlLabel
            control={
              <Switch
                {...register('is_active')}
                color='primary'
                defaultChecked={editValue?.user?.is_active || false}
              />
            }
            label='Actif'
          />
          {errors.is_active && <div className='text-red-500'>{errors.is_active.message}</div>}
        </div>
        <div className='flex justify-end gap-4'>
          <Button variant='contained' type='submit' disabled={isLoading}>
            {isLoading ? <CircularProgress sx={{ color: 'white' }} size={24} /> : 'Mettre à jour'}
          </Button>
          <Button onClick={handleCloseWithoutRefresh} variant='tonal' color='secondary'>
            Annuler
          </Button>
        </div>
      </DialogContent>
    </form>
  );
};

export default EditUserContent;
