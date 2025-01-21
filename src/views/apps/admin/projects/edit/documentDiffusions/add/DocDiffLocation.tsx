"use client";

import React, { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import {
  Card,
  CardHeader,
  CardContent,
  MenuItem,
  Typography,
} from "@mui/material";

import type { UseFormRegister, FieldErrors } from "react-hook-form";

import CustomTextField from "@core/components/mui/TextField";
import CustomIconButton from "@/@core/components/mui/IconButton";
import type { FormValidateDocDiffAddType } from "./schemaDocDiffAdd";
import { useAuth } from "@/contexts/AuthContext";
import {
  useProjectsRetrieve2Query,
  useLocalisationsListQuery,
} from "@/services/IsyBuildApi";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      overflowY: "auto" as const,
    },
    sx: {
      "::-webkit-scrollbar": { display: "none" },
      scrollbarWidth: "none",
    },
  },
};

interface DocDiffLocationProps {
  register: UseFormRegister<FormValidateDocDiffAddType>;
  errors: FieldErrors<FormValidateDocDiffAddType>;
}

const DocDiffLocation: React.FC<DocDiffLocationProps> = ({
  register,
  errors,
}) => {
  const params = useParams();
  const projectId = parseInt(params?.edit as string);

  const [docDiffLocations, setDocDiffLocations] = useState<
    { id: number; name: string }[]
  >([]);

  const { data: ProjectData } = useProjectsRetrieve2Query({ projectId });
  const clientIds = ProjectData?.client?.id + "";

  const { data, refetch, isLoading } = useLocalisationsListQuery({
    page: 1,
    pageSize: 500,
    clientIds,
  });

  useEffect(() => {
    if (data?.results) {
      setDocDiffLocations((prev) => [
        ...prev,
        ...data.results.filter(
          (location) => !prev.some((existing) => existing.id === location.id),
        ),
      ]);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);

  const router = useRouter();
  const { user } = useAuth();
  const { edit } = useParams();
  const userRole = user?.role;

  const handleRedirect = () => {
    const newUrl = `/${userRole}/locations/add?return_to=${userRole}/projects/${edit}/details/documentDiffusions/add`;

    router.push(newUrl);
  };

  return (
    <Card
      sx={{
        transition: "height 0.3s ease",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardHeader title="Emplacement" />
      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <div className="flex flex-grow flex-col"></div>
        <div className="flex items-end gap-4">
          {/* Dropdown for Locations */}
          <CustomTextField
            select
            fullWidth
            label="Localisation"
            defaultValue=""
            {...register("localisation_id")}
            error={!!errors.localisation_id}
            SelectProps={{ MenuProps }}
          >
            {docDiffLocations.map((location) => (
              <MenuItem key={location.id} value={location.id}>
                <Typography>{location.name}</Typography>
              </MenuItem>
            ))}
            {isLoading && (
              <MenuItem disabled>Chargement des localisations...</MenuItem>
            )}
            {!data?.results?.length && !isLoading && (
              <MenuItem disabled>Aucune localisation disponible</MenuItem>
            )}
          </CustomTextField>

          {/* Button to Add Location */}
          <CustomIconButton
            variant="tonal"
            color="primary"
            className="min-is-fit"
            onClick={handleRedirect}
          >
            <i className="tabler-plus" />
          </CustomIconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocDiffLocation;
