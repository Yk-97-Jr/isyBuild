'use client'; // Keep this label at the top

import React, {useContext, useEffect} from 'react';

import {useParams, useRouter} from 'next/navigation';

import Grid from "@mui/material/Grid";
import type {SubmitHandler} from 'react-hook-form';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import ClientAddHeader from "@views/apps/admin/clients/add/ClientAddHeader";
import ClientInformation from "@views/apps/admin/clients/add/ClientInformation";
import ClientStatus from "@views/apps/admin/clients/add/ClientStatus";
import ClientAdresse from "@views/apps/admin/clients/add/ClientAdresse";
import {useClientsRetrieve2Query} from "@/services/IsyBuildApi"; // Query to fetch client data
import {SnackBarContext} from "@/contexts/SnackBarContextProvider";
import type {SnackBarContextType} from "@/types/apps/snackbarType";
import type {FormValidateClientAddType} from "@views/apps/admin/clients/add/shemaClientAdd";
import {schemaClientAdd} from "@views/apps/admin/clients/add/shemaClientAdd";
import {useAuth} from "@/contexts/AuthContext";
import ClientCreatedBy from "@views/apps/admin/clients/details/info/ClientCreatedBy";

const ClientEdit = () => {
  const {register, handleSubmit, setValue, formState: {errors}} = useForm<FormValidateClientAddType>({
    resolver: yupResolver(schemaClientAdd),
  });

  const {id} = useParams(); // Get clientId from route parameters

  const {data: clientData, isLoading: isLoadingQuery} = useClientsRetrieve2Query({
    clientId: id,
  });

  const {setOpenSnackBar, setInfoAlert} = useContext(SnackBarContext) as SnackBarContextType;
  const router = useRouter();
  const {user} = useAuth();
  const userRole = user?.role;

  useEffect(() => {
    if (clientData) {
      // Populate form fields with fetched data
      setValue('clientName', clientData.name);
      setValue('sireneNumber', clientData.siren_number);
      setValue('address.streetNumber', clientData.address?.street_number);
      setValue('address.streetName', clientData.address?.street_name);
      setValue('address.zipCode', clientData.address?.postal_code);
      setValue('address.city', clientData.address?.city);
      setValue('address.department', clientData.address?.department || '');
      setValue('address.country', clientData.address?.country);
      setValue('email', clientData.contact_email);
      setValue('phoneNumber', clientData.phone_number);
      setValue('is_active', clientData.is_active);
    }
  }, [clientData, setValue]);

  const onSubmit: SubmitHandler<FormValidateClientAddType> = async (data) => {
    try {
      // You can call a mutation to update the client if needed
      // const response = await updateClient({ ...data }).unwrap();

      console.log('Client updated successfully!', data);
      setOpenSnackBar(true);
      setInfoAlert({severity: "success", message: "Client modifié avec succès"});

      // Redirect to client details after modification
      router.push(`/${userRole}/clients/${clientId}/details`);
    } catch (err: any) {
      console.error('Failed to update client:', err);
      setOpenSnackBar(true);
      setInfoAlert({
        severity: "error",
        message: err.response || "Échec de la modification du client"
      });
    }
  };

  if (isLoadingQuery) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <ClientAddHeader onSubmit={handleSubmit(onSubmit)} isLoading={isLoadingQuery}/>
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
            <Grid item xs={12}>
              <ClientCreatedBy register={register} errors={errors}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default ClientEdit;
