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
  useClientsStaffRetrieve2Query,
  useClientsStaffUpdateUpdateMutation,
} from "@/services/IsyBuildApi";
import {SnackBarContext} from "@/contexts/SnackBarContextProvider";
import type {SnackBarContextType} from "@/types/apps/snackbarType";

import useHandleBack from "@/hooks/useHandleBack";
import UserStatus from "@views/apps/admin/users/details/UserStatus";
import type {FormValidateUserEditType} from "@views/apps/admin/users/details/shemaUserEdit";
import UserEditHeader from "@views/apps/admin/users/details/UserEditHeader";
import UserCreatedBy from "@views/apps/admin/users/details/UserCreatedBy";
import {schemaUserEdit} from "@views/apps/admin/users/details/shemaUserEdit";
import UserInformation from "@views/apps/admin/clients/details/users/details/UserInformation";


const UserCLientDetails = () => {
  const {register, handleSubmit, setValue, formState: {errors}} = useForm<FormValidateUserEditType>({
    resolver: yupResolver(schemaUserEdit),
  });

  const {clientstaffId} = useParams(); // Get clientId from route parameters

  const {data: userData, isLoading: isLoadingQuery} = useClientsStaffRetrieve2Query({
    clientStaffId: +clientstaffId,
  });

  const [updateUser, {isLoading}] = useClientsStaffUpdateUpdateMutation();
  const {setOpenSnackBar, setInfoAlert} = useContext(SnackBarContext) as SnackBarContextType
  const handleBack = useHandleBack();

  useEffect(() => {
    if (userData && userData.user) {
      setValue('email', userData.user.email ?? '');
      setValue('first_name', userData.user.first_name ?? '');
      setValue('last_name', userData.user.last_name ?? '');
      setValue('is_active', userData.user.is_active ?? false);
    }

  }, [userData, setValue]);

  const onSubmit: SubmitHandler<FormValidateUserEditType> = async (data) => {

    try {
      const response = await updateUser({

        clientStaffId: +clientstaffId,
        clientStaffUpdateRequest: {
          user: {...data}
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
              <UserInformation register={register} errors={errors}/>
            </Grid>
            {/*<Grid item xs={12}>*/}
            {/*  <ClientAdresse register={register} errors={errors}/>*/}
            {/*</Grid>*/}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <UserStatus register={register} errors={errors}/>
            </Grid>
            <Grid item xs={12}>
              <UserCreatedBy userData={userData}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserCLientDetails;
