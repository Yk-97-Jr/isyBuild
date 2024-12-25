'use client';

import React, { useEffect, useContext } from 'react';

import { useParams, useRouter } from 'next/navigation';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  useUpdateFinanceSituationMutation,
  useRetrieveFinanceSituationQuery,
} from '@/services/IsyBuildApi';
import type { FormValidateFinanceSituationUpdateType } from './schemaFinanceSituationUpdate';
import { schemaFinanceSituationUpdate } from './schemaFinanceSituationUpdate';
import FinanceSituationUpdateForm from './FinanceSituationUpdateForm';
import FinanceSituationHeader from './FinanceSituationHeader'; // Reusable header component
import { SnackBarContext } from '@/contexts/SnackBarContextProvider';
import type { SnackBarContextType } from '@/types/apps/snackbarType';
import useHandleBack from '@/hooks/useHandleBack';

const FinanceSituationUpdate: React.FC = () => {
  const { editFinance } = useParams(); // Get situationId from route parameters
  const { data: financeSituation, isLoading: isQueryLoading } = useRetrieveFinanceSituationQuery({ situationId: +editFinance });
  const [updateFinanceSituation, { isLoading }] = useUpdateFinanceSituationMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValidateFinanceSituationUpdateType>({
    resolver: yupResolver(schemaFinanceSituationUpdate),
  });

  const { setOpenSnackBar, setInfoAlert } = useContext(SnackBarContext) as SnackBarContextType;
  const handleBack = useHandleBack();
  const router = useRouter();

  useEffect(() => {
    if (financeSituation) {
      setValue('amount', financeSituation.amount || '');
    }
  }, [financeSituation, setValue]);

  const onSubmit = async (data: FormValidateFinanceSituationUpdateType) => {
    try {
      const response = await updateFinanceSituation({
        situationId: +editFinance,
        patchedFinanceSituationUpdateRequest: data,
      }).unwrap();

      console.log('Finance situation updated successfully!', response);
      setOpenSnackBar(true);
      setInfoAlert({ severity: 'success', message: 'Situation financière mise à jour avec succès' });
      router.push(`/finance-situations/${editFinance}/details`); // Redirect to details page
    } catch (error: any) {
      console.error('Failed to update finance situation:', error);
      setOpenSnackBar(true);
      setInfoAlert({
        severity: 'error',
        message: error.message || "Échec de la mise à jour de la situation financière",
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <FinanceSituationHeader onSubmit={handleSubmit(onSubmit)} isLoading={isLoading} handleBack={handleBack} />
        </Grid>
        <Grid item xs={12}>
          <FinanceSituationUpdateForm register={register} errors={errors} />
        </Grid>
      </Grid>
    </form>
  );
};

export default FinanceSituationUpdate;
