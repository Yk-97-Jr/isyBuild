'use client';

import React, { useContext, useEffect } from 'react';



import DialogTitle from '@mui/material/DialogTitle'

import Dialog from '@mui/material/Dialog'
import { Box, Button, CircularProgress, DialogActions, Grid } from '@mui/material';
import DialogContent from '@mui/material/DialogContent'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {  useRetrieveFinanceSituationQuery, useUpdateFinanceSituationMutation } from '@/services/IsyBuildApi';
import { SnackBarContext } from '@/contexts/SnackBarContextProvider';
import type { SnackBarContextType } from '@/types/apps/snackbarType';
import CustomTextField from '@core/components/mui/TextField'
import DialogCloseButton from '@/components/dialogs/DialogCloseButton';
import { useRefetch } from '@/contexts/RefetchContextProvider';



type AddFinanceSituationContentProps = {
    open: boolean
    setOpen: (open: boolean) => void
    refetch: () => void
    id: number
  
  }
  export const schemaFinanceSituationUpdate = yup.object({
    amount: yup
      .string()
      .matches(
        /^\d+(\.\d{1,2})?$/,
        "Le montant doit être un nombre valide avec jusqu'à deux décimales"
      )
      .required('Le montant est requis'),
  }).required();



const EditFinanceSituationContent = ({ open, setOpen,refetch,id }: AddFinanceSituationContentProps) => {
  const refetchCard = useRefetch()

  const handleClose = () => {
    setOpen(false)

    if (refetch) {

        refetch(); // Call refetch when the dialog is closed
        refetchCard()
      }
    
  }

  const { data: financeSituation, isLoading: isQueryLoading, refetch:refetchData } = useRetrieveFinanceSituationQuery({ situationId: +id });

  const [updateFinanceSituation, { isLoading,  }] = useUpdateFinanceSituationMutation();

      const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schemaFinanceSituationUpdate),
      });

       useEffect(() => {
          if (financeSituation) {
            setValue('amount', financeSituation.amount || '');
          }
        }, [financeSituation, setValue]);

  const { setOpenSnackBar, setInfoAlert } = useContext(SnackBarContext) as SnackBarContextType;


  const onSubmit = async (data: { amount: string }) => {
    try {
      await updateFinanceSituation({
        situationId: id,
        patchedFinanceSituationUpdateRequest: {
          amount: data.amount,
        },
      }).unwrap();

      setOpenSnackBar(true);
      setInfoAlert({ severity: 'success', message: 'Situation financière mise à jour avec succès' });
      refetchData()
      handleClose();
    } catch (error) {
      console.error('Failed to update finance situation:', error);
      setOpenSnackBar(true);
      setInfoAlert({
        severity: 'error',
        message: 'Échec de la mise à jour de la situation financière',
      });
    }
  };

  if (isQueryLoading)
    return (
      <Box display="flex" justifyContent="center" alignItems="flex-start" height="100vh">
        <CircularProgress />
      </Box>
    );

  return (
      <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      maxWidth='xs'
      scroll='body'
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>
      <DialogTitle variant='h4' className='flex gap-2 flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
      Mise à jour Situation Financière
      </DialogTitle>
    <form onSubmit={handleSubmit(onSubmit)} >
    <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
          <Grid container spacing={5}>
            <Grid item xs={12} >
      <CustomTextField
        label="Le montant"
        {...register('amount')}
        error={!!errors.amount}
        helperText={errors.amount?.message}
        fullWidth
      />
      </Grid>
      </Grid>
      </DialogContent>
      <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress sx={{ color: 'white' }} size={24} /> : 'Ajouter'}
        </Button>
        <Button
         onClick={handleClose}
          variant="tonal"
          color="secondary"
        >
          Annuler
        </Button>
      </DialogActions>
    </form>
    </Dialog>
  );
};

export default EditFinanceSituationContent;
