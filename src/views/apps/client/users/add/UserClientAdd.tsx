'use client'

import React, {useContext} from 'react';

import {useRouter} from "next/navigation";

import Grid from "@mui/material/Grid";
import type {SubmitHandler} from 'react-hook-form';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {useClientsStaffCreateCreateMutation} from "@/services/IsyBuildApi";
import {SnackBarContext} from "@/contexts/SnackBarContextProvider";
import type {SnackBarContextType} from "@/types/apps/snackbarType";

import {useAuth} from "@/contexts/AuthContext";
import useHandleBack from "@/hooks/useHandleBack";
import type {FormValidateUserAddType} from "@views/apps/admin/users/add/shemaUserAdd";
import {schemaUserAdd} from "@views/apps/admin/users/add/shemaUserAdd";
import UserAddHeader from "@views/apps/client/users/add/UserAddHeader";
import UserInformation from "@views/apps/client/users/add/UserInformation";
import UserStatus from "@views/apps/client/users/add/UserStatus";


const UserClientAdd = () => {
  const {register, handleSubmit, formState: {errors}} = useForm<FormValidateUserAddType>({
    resolver: yupResolver(schemaUserAdd),
  });

  const [createUser, {isLoading}] = useClientsStaffCreateCreateMutation();
  const {setOpenSnackBar, setInfoAlert} = useContext(SnackBarContext) as SnackBarContextType
  const router = useRouter();
  const {user} = useAuth();  // Get the user from AuthContext
  const userRole = user?.role
  const handleBack = useHandleBack();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL


  const onSubmit: SubmitHandler<FormValidateUserAddType> = async (data) => {

    try {

      const response = await createUser(
        {
          clientStaffCreateRequest: {
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
      const ClientStaffId = response.id;

      router.push(`/${userRole}/users/${ClientStaffId}/details/`);

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
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserClientAdd;
