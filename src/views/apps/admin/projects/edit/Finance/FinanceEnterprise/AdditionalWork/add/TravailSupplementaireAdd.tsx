'use client';

import React, { useContext } from 'react';

import { useRouter } from 'next/navigation';

import Grid from '@mui/material/Grid';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import TravailSupplementaireAddHeader from './TravailSupplementaireAddHeader';
import TravailSupplementaireForm from './TravailSupplementaireForm';

import { schemaTravailSupplementaireAdd } from './schemaTravailSupplementaireAdd';
import type { FormValidateTravailSupplementaireAddType } from './schemaTravailSupplementaireAdd';

import { useCreateTravailSupplementaireMutation } from '@/services/IsyBuildApi';
import { SnackBarContext } from '@/contexts/SnackBarContextProvider';
import type { SnackBarContextType } from '@/types/apps/snackbarType';

import useHandleBack from '@/hooks/useHandleBack';

const TravailSupplementaireAdd: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValidateTravailSupplementaireAddType>({
    resolver: yupResolver(schemaTravailSupplementaireAdd),
  });

  const [createTravailSupplementaire, { isLoading }] = useCreateTravailSupplementaireMutation();
  const { setOpenSnackBar, setInfoAlert } = useContext(SnackBarContext) as SnackBarContextType;
  const router = useRouter();
  const handleBack = useHandleBack();

  const onSubmit: SubmitHandler<FormValidateTravailSupplementaireAddType> = async (data) => {
    try {
      const response = await createTravailSupplementaire({
        travailSupplementaireCreateRequest: data,
      }).unwrap();

      console.log('Travail supplémentaire ajouté avec succès!', response);
      setOpenSnackBar(true);
      setInfoAlert({ severity: 'success', message: 'Travail supplémentaire ajouté avec succès' });

      // Redirect to the travail supplémentaire details
      router.push(`/travail-supplementaires/${response.id}/details`);
    } catch (err: any) {
      console.error('Échec de l\'ajout du travail supplémentaire:', err);
      setOpenSnackBar(true);
      setInfoAlert({
        severity: 'error',
        message: err.response || 'Échec de la création du travail supplémentaire',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <TravailSupplementaireAddHeader
            onSubmit={handleSubmit(onSubmit)}
            isLoading={isLoading}
            handleBack={handleBack}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <TravailSupplementaireForm register={register} errors={errors} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default TravailSupplementaireAdd;
