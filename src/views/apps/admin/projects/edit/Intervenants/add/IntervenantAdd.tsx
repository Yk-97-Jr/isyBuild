'use client'

import React, {useContext} from 'react';

import {useParams, useRouter} from "next/navigation";

import Grid from "@mui/material/Grid";
import type {SubmitHandler} from 'react-hook-form';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import type {
  FormValidateIntervenantAddType
} from "@views/apps/admin/projects/edit/Intervenants/add/schemaIntervenantAdd";

import {
  schemaIntervenantAdd
} from "@views/apps/admin/projects/edit/Intervenants/add/schemaIntervenantAdd";

import {
  useProjectIntervenantCreateMutation
} from "@/services/IsyBuildApi";
import {SnackBarContext} from "@/contexts/SnackBarContextProvider";
import type {SnackBarContextType} from "@/types/apps/snackbarType";

import {useAuth} from "@/contexts/AuthContext";
import useHandleBack from "@/hooks/useHandleBack";
import IntervenantStatus from "@views/apps/admin/projects/edit/Intervenants/add/IntervenantStatus";
import IntervenantInformation from "@views/apps/admin/projects/edit/Intervenants/add/IntervenantInformation";
import IntervenantAddHeader from "@views/apps/admin/projects/edit/Intervenants/add/IntervenantAddHeader";


const IntervenantAdd = () => {
  const {register, handleSubmit, formState: {errors}} = useForm<FormValidateIntervenantAddType>({
    resolver: yupResolver(schemaIntervenantAdd),
  });

  const [createIntervenant, {isLoading}] = useProjectIntervenantCreateMutation();
  const {setOpenSnackBar, setInfoAlert} = useContext(SnackBarContext) as SnackBarContextType
  const router = useRouter();
  const {user} = useAuth();  // Get the user from AuthContext
  const userRole = user?.role
  const handleBack = useHandleBack();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL
  const {edit} = useParams(); // Get edit parameter from route


  const onSubmit: SubmitHandler<FormValidateIntervenantAddType> = async (data) => {

    try {

      const response = await createIntervenant(
        {

          projectId: +edit,
          intervenantCreateRequest: {
            user: {
              ...data, redirect_uri: appUrl + '/set-password',
            },
            role: data.role as any
          },
        }
      ).unwrap();

      setOpenSnackBar(true);
      setInfoAlert({severity: "success", message: "Intervenant ajouté avec succès"});

      // Redirect to client details after creation
      const intervenantId = response.id;

      router.push(`/${userRole}/projects/${edit}/details/intervenants/${intervenantId}/details`);


    } catch (err: any) {
      setOpenSnackBar(true);
      setInfoAlert({
        severity: "error",
        message: err.response || "Échec de la création de Intervenant"
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <IntervenantAddHeader onSubmit={handleSubmit(onSubmit)} isLoading={isLoading} handleBack={handleBack}/>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <IntervenantInformation register={register} errors={errors}/>
            </Grid>
            {/*<Grid item xs={12}>*/}
            {/*  <ClientAdresse register={register} errors={errors}/>*/}
            {/*</Grid>*/}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <IntervenantStatus register={register} errors={errors}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default IntervenantAdd;
