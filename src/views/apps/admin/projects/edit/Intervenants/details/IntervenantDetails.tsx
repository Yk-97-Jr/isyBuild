'use client'

import React, {useContext, useEffect} from 'react';

import {useParams} from "next/navigation";

import Grid from "@mui/material/Grid";
import type {SubmitHandler} from 'react-hook-form';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import Box from "@mui/material/Box";

import {CircularProgress} from "@mui/material";

import {
  useProjectIntervenantDetailQuery, useProjectIntervenantUpdateMutation,
} from "@/services/IsyBuildApi";
import {SnackBarContext} from "@/contexts/SnackBarContextProvider";
import type {SnackBarContextType} from "@/types/apps/snackbarType";

import useHandleBack from "@/hooks/useHandleBack";
import IntervenantEditHeader from "@views/apps/admin/projects/edit/Intervenants/details/IntervenantEditHeader";
import IntervenantInformation from "@views/apps/admin/projects/edit/Intervenants/details/IntervenantInformation";
import IntervenantStatus from "@views/apps/admin/projects/edit/Intervenants/details/IntervenantStatus";
import IntervenantCreatedBy from "@views/apps/admin/projects/edit/Intervenants/details/IntervenantCreatedBy";
import type {
  FormValidateIntervenantEditType
} from "@views/apps/admin/projects/edit/Intervenants/details/schemaIntervenantEdit";
import {
  schemaIntervenantEdit
} from "@views/apps/admin/projects/edit/Intervenants/details/schemaIntervenantEdit";


const IntervenantDetails = () => {
  const {register, handleSubmit, setValue, formState: {errors}} = useForm<FormValidateIntervenantEditType>({
    resolver: yupResolver(schemaIntervenantEdit),
  });

  const {id} = useParams();

  const {data: intervenantData, isLoading: isLoadingQuery} = useProjectIntervenantDetailQuery({
    projectIntervenantId: +id,
  });

  const [updateIntervenant, {isLoading}] = useProjectIntervenantUpdateMutation();
  const {setOpenSnackBar, setInfoAlert} = useContext(SnackBarContext) as SnackBarContextType
  const handleBack = useHandleBack();

  useEffect(() => {
    if (intervenantData && intervenantData.intervenant.user) {
      setValue('email', intervenantData.intervenant.user.email ?? '');
      setValue('first_name', intervenantData.intervenant.user.first_name ?? '');
      setValue('last_name', intervenantData.intervenant.user.last_name ?? '');
      setValue('is_active', intervenantData.intervenant.user.is_active ?? false);
      setValue('role', intervenantData.intervenant.role ?? undefined);
    }

  }, [intervenantData, setValue]);

  const onSubmit: SubmitHandler<FormValidateIntervenantEditType> = async (data) => {

    try {
      await updateIntervenant({
        projectIntervenantId: +id,
        intervenantUpdateRequest: {
          user: {
            ...data
          },
          role: data.role as any
        }
      }).unwrap();


      setOpenSnackBar(true);
      setInfoAlert({severity: "success", message: "intervenant Modifié avec succès"});


    } catch (err: any) {
      setOpenSnackBar(true);
      setInfoAlert({
        severity: "error",
        message: err.response || "Échec de la modification de intervenant"
      });
    }
  };

  if (isLoadingQuery) return (
    <Box display="flex" justifyContent="center" alignItems="flex-start" height="100vh">
      <CircularProgress/>
    </Box>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <IntervenantEditHeader onSubmit={handleSubmit(onSubmit)} isLoading={isLoading} handleBack={handleBack}/>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <IntervenantInformation register={register} errors={errors} intervenantData={intervenantData}/>
            </Grid>
            {/*<Grid item xs={12}>*/}
            {/*  <ClientAdresse register={register} errors={errors}/>*/}
            {/*</Grid>*/}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <IntervenantStatus register={register} errors={errors} intervenantData={intervenantData}/>
            </Grid>
            <Grid item xs={12}>
              <IntervenantCreatedBy intervenantData={intervenantData}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default IntervenantDetails;
