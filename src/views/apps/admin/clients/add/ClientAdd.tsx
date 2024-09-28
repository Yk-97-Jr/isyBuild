'use client'

import React, {useContext} from 'react';

import Grid from "@mui/material/Grid";
import type {SubmitHandler} from 'react-hook-form';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import ClientAddHeader from "@views/apps/admin/clients/add/ClientAddHeader";
import ClientInformation from "@views/apps/admin/clients/add/ClientInformation";
import ClientStatus from "@views/apps/admin/clients/add/ClientStatus";
import ClientAdresse from "@views/apps/admin/clients/add/ClientAdresse";
import {useClientsCreateCreateMutation} from "@/services/IsyBuildApi";
import {SnackBarContext} from "@/contexts/SnackBarContextProvider";
import type {SnackBarContextType} from "@/types/apps/snackbarType";
import type {FormValidateClientAddType} from "@views/apps/admin/clients/add/shemaClientAdd";
import { schemaClientAdd} from "@views/apps/admin/clients/add/shemaClientAdd";




const ClientAdd = () => {
  const {register, handleSubmit, formState: {errors}} = useForm<FormValidateClientAddType>({
    resolver: yupResolver(schemaClientAdd),
  });

  const [createClient, {isLoading}] = useClientsCreateCreateMutation();
  const {setOpenSnackBar, setInfoAlert} = useContext(SnackBarContext) as SnackBarContextType


  const onSubmit: SubmitHandler<FormValidateClientAddType> = async (data) => {
    try {

      const response = await createClient(
        {
          clientCreateUpdateRequest: {
            name: data.clientName,
            siren_number: data.sireneNumber,
            address: {
              street_number: data.address.streetNumber, // updated key
              street_name: data.address.streetName,      // updated key
              postal_code: data.address.zipCode,         // updated key
              city: data.address.city,                   // unchanged
              department: data.address.department || null, // allow null
              country: data.address.country,              // unchanged
            },
            contact_email: data.email,
            phone_number: data.phoneNumber,
            is_active: data?.is_active || false,
          }
        }
      ).unwrap();

      console.log('Client added successfully!', response);
      setOpenSnackBar(true);
      setInfoAlert({severity: "success", message: "Client ajouté avec succès"});
    } catch (err: any) {
      console.error('Failed to add client:', err);
      setOpenSnackBar(true);
      setInfoAlert({
        severity: "error",
        message: err.response?.data?.message || "Échec de la création de Client"
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <ClientAddHeader onSubmit={handleSubmit(onSubmit)} isLoading={isLoading}/>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <ClientInformation register={register} errors={errors}/>
            </Grid>
            <Grid item xs={12}>
              <ClientAdresse register={register} errors={errors}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <ClientStatus register={register} errors={errors}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default ClientAdd;
