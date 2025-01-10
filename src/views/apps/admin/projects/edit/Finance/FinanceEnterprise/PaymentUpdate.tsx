'use client';

import React, { useContext } from 'react';

import { useParams } from 'next/navigation';

import DialogTitle from '@mui/material/DialogTitle'

import Dialog from '@mui/material/Dialog'
import { Button, CircularProgress, DialogActions, Grid, MenuItem,  } from '@mui/material';
import DialogContent from '@mui/material/DialogContent'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useUpdateFinanceEnterpriseMutation, useRetrieveFinanceEnterpriseByIdQuery } from '@/services/IsyBuildApi';
import { SnackBarContext } from '@/contexts/SnackBarContextProvider';
import type { SnackBarContextType } from '@/types/apps/snackbarType';
import CustomTextField from '@core/components/mui/TextField'
import DialogCloseButton from '@/components/dialogs/DialogCloseButton';
import { DgdStatusMapping } from '@/utils/statusEnums';



type AddFinanceSituationContentProps = {
    open: boolean
    setOpen: (open: boolean) => void
    refetch: () => void
  
  }

 
  
  const schemaFinanceEnterpriseUpdate = yup.object({

    caution:yup.string().notRequired()
      .nullable(),
      dgd_status: yup
      .mixed()
      .notRequired()
      .nullable(), // Explicitly allow null or undefined
  }).required();

const UpdatePaymentContent = ({ open, setOpen,refetch }: AddFinanceSituationContentProps) => {

  const {idFe} = useParams()
  
  const {data} = useRetrieveFinanceEnterpriseByIdQuery({financeEnterpriseId:+idFe});
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: async () => {
      // Wait for data to be fetched and return default values
      if (!data) return {};

      return {
        caution: data.caution || '',
        cie: data.cie || '',
        dgd_status: data.dgd_status || '',
        
      };
    },
    resolver: yupResolver(schemaFinanceEnterpriseUpdate),
  });

 

  const handleClose = () => {
    setOpen(false)

    if (refetch) {

        refetch(); // Call refetch when the dialog is closed
      }
    
  }

   

  
  
  
  const [updateFinanceEnterprise , { isLoading}] = useUpdateFinanceEnterpriseMutation();


  const { setOpenSnackBar, setInfoAlert } = useContext(SnackBarContext) as SnackBarContextType; 

/* 
  useEffect(() => {
    if (data) {
      setValue('caution', data.caution || '');
      setValue('cie', data.cie || '');
      setValue('dgd_status', data.dgd_status );
      setValue("retention_guarantee", data.retention_guarantee|| '')
      setValue("total_contract", data.retention_guarantee|| '')
      setValue("total_ts_choix", data.total_ts_choix|| '')
      setValue("total_ts_tma", data.total_ts_tma|| '')
    }
  }, [data, setValue]); */
 

  const onSubmit = async (data:any) => {

    console.log(data);

    try {
      await updateFinanceEnterprise({
        financeEnterpriseId:+idFe,
        patchedFinanceEnterpriseUpdateRequest:data,
      }).unwrap();

      setOpenSnackBar(true);
      setInfoAlert({ severity: 'success', message: 'Situation financière ajoutée avec succès' });
      handleClose();
    } catch (error) {
      console.error('Failed to add finance situation:', error);
      setOpenSnackBar(true);
      setInfoAlert({
        severity: 'error',
        message: 'Échec de la création de la situation financière',
      });
    }
  };

  return (
      <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      maxWidth='md'
      scroll='body'
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>
      <DialogTitle variant='h4' className='flex gap-2 flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
      Ajouter une Situation Financière
      </DialogTitle>
    <form onSubmit={handleSubmit(onSubmit)} >
    <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
          <Grid container spacing={5} className='mbe-6'>
           
            
      
        <Grid item xs={12}  >

       <CustomTextField
        label="Caution"
        {...register('caution')}
        error={!!errors.caution}
        helperText={errors.caution?.message}
        fullWidth
        /> 
        </Grid>
        <Grid item xs={12}  >

                    <CustomTextField
              select
              fullWidth
              label="DGD "
              defaultValue={data?.dgd_status}
              {...register('dgd_status')}
              error={!!errors.dgd_status}
              helperText={errors.dgd_status?.message}
              >
              <MenuItem >
                <em>Sélectionnez un status</em>
              </MenuItem>
              {Object.entries(DgdStatusMapping).map(([key, {label}]) => (
                <MenuItem key={key} value={key}>
                          {label}
                        </MenuItem>
                      ))}
            </CustomTextField>
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

export default UpdatePaymentContent;
