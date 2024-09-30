'use client'; // Keep this label at the top

import React, {useContext, useEffect} from 'react';

import {useParams} from 'next/navigation';

import Grid from "@mui/material/Grid";
import type {SubmitHandler} from 'react-hook-form';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import Box from "@mui/material/Box";

import {CircularProgress} from "@mui/material";

import ClientInformation from "@views/apps/admin/clients/details/info/ClientInformation";
import ClientStatus from "@views/apps/admin/clients/details/info/ClientStatus";
import ClientAdresse from "@views/apps/admin/clients/details/info/ClientAdresse";
import {useClientsRetrieve2Query, useClientsUpdateUpdateMutation} from "@/services/IsyBuildApi"; // Query to fetch client data
import {SnackBarContext} from "@/contexts/SnackBarContextProvider";
import type {SnackBarContextType} from "@/types/apps/snackbarType";
import type {FormValidateClientEditType} from "@views/apps/admin/clients/details/info/schemaClientEdit";
import {schemaClientEdit} from "@views/apps/admin/clients/details/info/schemaClientEdit";
import ClientCreatedBy from "@views/apps/admin/clients/details/info/ClientCreatedBy";
import ClientModifyHeader from "@views/apps/admin/clients/details/info/ClientModifyHeader";
import useHandleBack from "@components/useHandleBack";

const ClientEdit = () => {
  const {register, handleSubmit, setValue, formState: {errors}} = useForm<FormValidateClientEditType>({
    resolver: yupResolver(schemaClientEdit),
  });

  const {id} = useParams(); // Get clientId from route parameters

  const {data: clientData, isLoading: isLoadingQuery} = useClientsRetrieve2Query({
    clientId: +id,
  });

  const [updateClient, {isLoading: isUpdating}] = useClientsUpdateUpdateMutation();

  const {setOpenSnackBar, setInfoAlert} = useContext(SnackBarContext) as SnackBarContextType;
  const handleBack = useHandleBack();

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
      setValue('address.country', clientData.address?.country || '');
      setValue('email', clientData.contact_email);
      setValue('phoneNumber', clientData.phone_number);
      setValue('is_active', clientData.is_active as boolean);
    }
  }, [clientData, setValue]);

  const onSubmit: SubmitHandler<FormValidateClientEditType> = async (data) => {
    try {

      // Call the mutation to update the client
      await updateClient(
        {
          clientId: +id,
          clientCreateUpdateRequest: {
            // Include the updated client fields here
            name: data.clientName,
            siren_number: data.sireneNumber,

            address: {
              street_number: data.address.streetNumber,
              street_name: data.address.streetName,
              postal_code: data.address.zipCode,
              city: data.address.city,
              department: data.address.department,

              // region: data.address.region | null,
              country: data.address.country,

            },
            contact_email: data.email,
            phone_number: data.phoneNumber,
            is_active: data.is_active,
          },
        }
      ).unwrap();

      setOpenSnackBar(true);
      setInfoAlert({severity: "success", message: "Client modifié avec succès"});

      // Optionally, redirect after successful submission

    } catch (err: any) {
      console.error('Failed to update client:', err);
      setOpenSnackBar(true);
      setInfoAlert({
        severity: "error",
        message: err.response || "Échec de la modification du client"
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
          <ClientModifyHeader onSubmit={handleSubmit(onSubmit)} isLoading={isUpdating} handleBack={handleBack}/>
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
              <ClientStatus register={register} errors={errors} clientData={clientData}/>
            </Grid>
            <Grid item xs={12}>
              <ClientCreatedBy clientData={clientData}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default ClientEdit;
