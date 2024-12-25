'use client';

import React, { useContext } from 'react';

import { useRouter } from "next/navigation";

import Grid from "@mui/material/Grid";
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import FinanceSituationAddHeader from "./FinanceSituationAddHeader";

import FinanceSituationForm from "./FinanceSituationForm";

import { schemaFinanceSituationAdd } from "./schemaFinanceSituationAdd";

import type { FormValidateFinanceSituationAddType } from "./schemaFinanceSituationAdd";

import { useCreateFinanceSituationMutation } from "@/services/IsyBuildApi";
import { SnackBarContext } from "@/contexts/SnackBarContextProvider";
import type { SnackBarContextType } from "@/types/apps/snackbarType";

import useHandleBack from "@/hooks/useHandleBack";

const FinanceSituationAdd: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValidateFinanceSituationAddType>({
    resolver: yupResolver(schemaFinanceSituationAdd),
  });

  const [createFinanceSituation, { isLoading }] = useCreateFinanceSituationMutation();
  const { setOpenSnackBar, setInfoAlert } = useContext(SnackBarContext) as SnackBarContextType;
  const router = useRouter();
  const handleBack = useHandleBack();

  const onSubmit: SubmitHandler<FormValidateFinanceSituationAddType> = async (data) => {
    try {
      const response = await createFinanceSituation({
        financeSituationCreateRequest: data,
      }).unwrap();

      console.log('Financial situation added successfully!', response);
      setOpenSnackBar(true);
      setInfoAlert({ severity: "success", message: "Situation financière ajoutée avec succès" });

      // Redirect to the financial situations list or details
      router.push(`/finance-situations/${response.id}/details`);
    } catch (err: any) {
      console.error('Failed to add financial situation:', err);
      setOpenSnackBar(true);
      setInfoAlert({
        severity: "error",
        message: err.response || "Échec de la création de la situation financière",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <FinanceSituationAddHeader onSubmit={handleSubmit(onSubmit)} isLoading={isLoading} handleBack={handleBack} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <FinanceSituationForm register={register} errors={errors} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default FinanceSituationAdd;
