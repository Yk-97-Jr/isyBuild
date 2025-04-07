'use client'

import React, {useContext} from 'react';

import {useRouter} from "next/navigation";

import Grid from "@mui/material/Grid";
import type {SubmitHandler} from 'react-hook-form';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import UserStaffInformation from "@views/apps/subcontractor/users/add/UserStaffInformation";

import UserStaffStatus from "@views/apps/subcontractor/users/add/UserStaffStatus";

import {useCreateSubcontractorBySubcontractorUserMutation} from "@/services/IsyBuildApi";
import {SnackBarContext} from "@/contexts/SnackBarContextProvider";
import type {SnackBarContextType} from "@/types/apps/snackbarType";

import {useAuth} from "@/contexts/AuthContext";
import useHandleBack from "@/hooks/useHandleBack";
import UserAddHeader from "@views/apps/subcontractor/users/add/UserAddHeader";

import type  {FormValidateUserStaffAddType} from "@views/apps/subcontractor/users/add/shemaUserStaffAdd";
import {schemaUserStaffAdd} from "@views/apps/subcontractor/users/add/shemaUserStaffAdd";


const UserStaffAdd = () => {
  const {register, handleSubmit, formState: {errors}} = useForm<FormValidateUserStaffAddType>({
    resolver: yupResolver(schemaUserStaffAdd),
  });

  const [createUserStaff, {isLoading}] = useCreateSubcontractorBySubcontractorUserMutation();
  const {setOpenSnackBar, setInfoAlert} = useContext(SnackBarContext) as SnackBarContextType
  const router = useRouter();
  const {user} = useAuth();  // Get the user from AuthContext
  const userRole = user?.role
  const handleBack = useHandleBack();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL


  const onSubmit: SubmitHandler<FormValidateUserStaffAddType> = async (data) => {

    try {

      const response = await createUserStaff(
        {
          subcontractorStaffCreateRequest: {
            user: {
              ...data, redirect_uri: appUrl + '/set-password',
            }
          },
        }
      ).unwrap();

      console.log('User added successfully!', response);
      setOpenSnackBar(true);
      setInfoAlert({severity: "success", message: "User ajouté avec succès"});

      // Redirect to client details after creation
      const clientId = response.id;

      router.push(`/${userRole}/users/${clientId}/details`);

    } catch (err: any) {
      console.error('Failed to add user:', err);
      setOpenSnackBar(true);
      setInfoAlert({
        severity: "error",
        message: err.response || "Échec de la création de User"
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <UserAddHeader onSubmit={handleSubmit(onSubmit)} isLoading={isLoading} handleBack={handleBack}/>
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
              <UserStaffStatus register={register} errors={errors}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserStaffAdd;
