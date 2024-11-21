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
  useSubcontractorsStaffRetrieveQuery, useSubcontractorsStaffUpdatePartialUpdateMutation,
} from "@/services/IsyBuildApi";
import {SnackBarContext} from "@/contexts/SnackBarContextProvider";
import type {SnackBarContextType} from "@/types/apps/snackbarType";

import useHandleBack from "@/hooks/useHandleBack";
import UserStaffInformation from "@views/apps/subcontractor/users/details/UserStaffInformation";
import UserStatus from "@views/apps/subcontractor/users/details/UserStatus";
import type {FormValidateUserStaffEditType} from "@views/apps/subcontractor/users/details/shemaUserStaffEdit";
import UserEditHeader from "@views/apps/subcontractor/users/details/UserEditHeader";
import UserStaffCreatedBy from "@views/apps/subcontractor/users/details/UserStaffCreatedBy";
import {schemaUserStaffEdit} from "@views/apps/subcontractor/users/details/shemaUserStaffEdit";


const UserStaffDetails = () => {
  const {register, handleSubmit, setValue, formState: {errors}} = useForm<FormValidateUserStaffEditType>({
    resolver: yupResolver(schemaUserStaffEdit),
  });

  const {id} = useParams(); // Get clientId from route parameters


  const {data: userStaffData, isLoading: isLoadingQuery} = useSubcontractorsStaffRetrieveQuery({
    subcontractorStaffId: +id,
  });

  const [updateUser, {isLoading}] = useSubcontractorsStaffUpdatePartialUpdateMutation();
  const {setOpenSnackBar, setInfoAlert} = useContext(SnackBarContext) as SnackBarContextType
  const handleBack = useHandleBack();
  

  useEffect(() => {
    if (userStaffData && userStaffData.user) {
      setValue('email', userStaffData.user.email ?? '');
      setValue('first_name', userStaffData.user.first_name ?? '');
      setValue('last_name', userStaffData.user.last_name ?? '');
      setValue('is_active', userStaffData.user.is_active ?? false);
    }

  }, [userStaffData, setValue]);

  const onSubmit: SubmitHandler<FormValidateUserStaffEditType> = async (data) => {

    try {
      const response = await updateUser({
        subcontractorStaffId: +id,
        patchedSubcontractorStaffUpdateRequest: {
          user: {...data }
        }
      }).unwrap();


      console.log('User modifyed successfully!', response);
      setOpenSnackBar(true);
      setInfoAlert({severity: "success", message: "User Modifié avec succès"});


    } catch (err: any) {
      console.error('Failed to modify user:', err);
      setOpenSnackBar(true);
      setInfoAlert({
        severity: "error",
        message: err.response || "Échec de la modification de User"
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
          <UserEditHeader onSubmit={handleSubmit(onSubmit)} isLoading={isLoading} handleBack={handleBack}/>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <UserStaffInformation register={register} errors={errors}/>
            </Grid>
            {/*<Grid item xs={12}>*/}
            {/*  <ClientAdresse register={register} errors={errors}/>*/}
            {/*</Grid>*/}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <UserStatus register={register} errors={errors} userStaffData={userStaffData}/>
            </Grid>
            <Grid item xs={12}>
              <UserStaffCreatedBy userStaffData={userStaffData}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserStaffDetails;
