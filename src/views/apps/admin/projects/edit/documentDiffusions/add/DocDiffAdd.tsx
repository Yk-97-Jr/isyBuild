"use client";

import React, { useContext } from "react";

import { useParams, useRouter } from "next/navigation";

import { yupResolver } from "@hookform/resolvers/yup";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid";

import { useAuth } from "@/contexts/AuthContext";
import DocDiffInfo from "./DocDiffInfo";
import {
  useDocumentDiffusionCreateMutation,
  useProjectsLotsRetrieveQuery,
} from "@/services/IsyBuildApi";
import { SnackBarContext } from "@/contexts/SnackBarContextProvider";
import type { SnackBarContextType } from "@/types/apps/snackbarType";
import type { FormValidateDocDiffAddType } from "./schemaDocDiffAdd";
import { schemaDocDiffAdd } from "./schemaDocDiffAdd";
import DocDiffLocation from "./DocDiffLocation";
import DocDiffHeader from "./DocDiffHeader";

const DocDiffAdd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValidateDocDiffAddType>({
    resolver: yupResolver(schemaDocDiffAdd),
  });

  const { edit } = useParams();

  const { data: projectLots } = useProjectsLotsRetrieveQuery({
    projectId: +edit,
  });

  const [createDocDiff, { isLoading }] = useDocumentDiffusionCreateMutation();

  const { setOpenSnackBar, setInfoAlert } = useContext(
    SnackBarContext,
  ) as SnackBarContextType;

  const router = useRouter();
  const { user } = useAuth(); // Get the user from AuthContext
  const userRole = user?.role;

  const onSubmit: SubmitHandler<FormValidateDocDiffAddType> = async (data) => {
    // Add debugging log for form data
    console.log("Form Data Submitted:", data);

    try {
      const response = await createDocDiff({
        documentDiffusionCreateRequest: {
          title: data.title,
          localisation_id: data.localisation_id ?? null, // Ensure localisation_id is null if not provided
          phase: data.phase,
          type: data.type,
          project_lot_id: data.project_lot,
          subcontractor_id: data.subcontractor_id,
        },
      }).unwrap();

      // Add debugging log for response data
      console.log("Response Data:", response);

      setOpenSnackBar(true);
      setInfoAlert({
        severity: "success",
        message: "Document diffusion ajouté avec succès",
      });

      const clientId = response.id;

      router.push(
        `/${userRole}/projects/${edit}/details/documentDiffusions/${clientId}/details`,
      );
    } catch (err: any) {
      console.error("Failed to add document diffusion:", err);
      setOpenSnackBar(true);
      setInfoAlert({
        severity: "error",
        message:
          err.response?.data?.message ||
          "Échec de la création du document diffusion",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <DocDiffHeader
            onSubmit={handleSubmit(onSubmit)}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <DocDiffInfo
                register={register}
                errors={errors}
                projectLots={projectLots?.results}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <DocDiffLocation register={register} errors={errors} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default DocDiffAdd;
