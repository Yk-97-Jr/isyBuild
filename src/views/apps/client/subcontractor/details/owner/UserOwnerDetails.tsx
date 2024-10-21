'use client'

import React, {useContext, useEffect, useState} from 'react';

import {useParams} from "next/navigation";

import Grid from "@mui/material/Grid";
import type {SubmitHandler} from 'react-hook-form';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import Box from "@mui/material/Box";

import {CircularProgress} from "@mui/material";

import UserInformation from "@views/apps/client/subcontractor/details/owner/UserInformation";

import UserStatus from "@views/apps/client/subcontractor/details/owner/UserStatus";

import UserCreatedBy from "@views/apps/client/subcontractor/details/owner/UserCreatedBy";

import UserOwnerEditHeader from "@views/apps/client/subcontractor/details/owner/UserOwnerEditHeader";

import {
  useSubcontractorsOwnerAssignUpdateMutation,
  useSubcontractorsOwnerRetrieveQuery,
  useSubcontractorsOwnerUpdateUpdateMutation,
} from "@/services/IsyBuildApi";
import {SnackBarContext} from "@/contexts/SnackBarContextProvider";
import type {SnackBarContextType} from "@/types/apps/snackbarType";

import useHandleBack from "@/hooks/useHandleBack";
import type {FormValidateUserEditType} from "./shemaUserEdit";
import {schemaUserEdit} from "./shemaUserEdit";


const UserOwnerDetails = () => {
  const {register, handleSubmit, setValue, formState: {errors}} = useForm<FormValidateUserEditType>({
    resolver: yupResolver(schemaUserEdit),
  });

  const {id} = useParams(); // Get clientId from route parameters

  const {data: userData, isLoading: isLoadingQuery} = useSubcontractorsOwnerRetrieveQuery({
    subcontractorId: +id,
  });

  const [assignUser, {isLoading: isLoadingCreate}] = useSubcontractorsOwnerAssignUpdateMutation();
  const [modifyassignedUser, {isLoading: isLoadingUpdate}] = useSubcontractorsOwnerUpdateUpdateMutation();
  const {setOpenSnackBar, setInfoAlert} = useContext(SnackBarContext) as SnackBarContextType
  const handleBack = useHandleBack();
  const [isAdding, setIsAdding] = useState(true); // Default to adding
  const appUrl = process.env.NEXT_PUBLIC_APP_URL


  useEffect(() => {

    if (userData) {
      setValue('email', userData.email ?? '');
      setValue('first_name', userData.first_name ?? '');
      setValue('last_name', userData.last_name ?? '');
      setValue('is_active', userData.is_active ?? false);

      // logic for adding and modifying
      setIsAdding(false);
    }


  }, [userData, setValue]);

  const onSubmit: SubmitHandler<FormValidateUserEditType> = async (data) => {

    try {
      if (isAdding) {
        const response = await assignUser({
          subcontractorId: +id,
          subcontractorOwnerCreateRequest: {
            user: {...data, redirect_uri: appUrl + '/set-password',}

          }

        }).unwrap();


        console.log('User affected successfully!', response);
        setOpenSnackBar(true);
        setInfoAlert({severity: "success", message: "User Affecté avec succès"});
      } else {
        const response = await modifyassignedUser({
          subcontractorId: +id,
          subcontractorOwnerUpdateRequest: {
            user: {...data}

          }

        }).unwrap();


        console.log('User affected successfully!', response);
        setOpenSnackBar(true);
        setInfoAlert({severity: "success", message: "User Affecté avec succès"});

      }


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
          <UserOwnerEditHeader onSubmit={handleSubmit(onSubmit)}
                               isLoading={isLoadingCreate || isLoadingUpdate}
                               handleBack={handleBack}
                               isAdding={isAdding}/>
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

export default UserOwnerDetails;
