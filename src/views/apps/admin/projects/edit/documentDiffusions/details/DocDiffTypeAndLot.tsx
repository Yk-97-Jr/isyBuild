import React, { useState } from "react";

import { useParams, useRouter } from "next/navigation";

import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Grid,
  MenuItem,
  Button,
} from "@mui/material";
import type { FieldError, UseFormRegister } from "react-hook-form";

import CustomTextField from "@/@core/components/mui/TextField";
import type { FormValidateDocDiffUpdateType } from "./schemaDocDiffEdit";
import type {
  LocalisationRead,
  StatusE51Enum,
  Type94BEnum,
} from "@/services/IsyBuildApi";
import CustomIconButton from "@/@core/components/mui/IconButton";
import { useAuth } from "@/contexts/AuthContext";
import LabeledData from "@/components/LabledData";
import { getStatus } from "@/utils/statusHelper";
import { StatusE51Mapping, Type474Mapping } from "@/utils/statusEnums";
import AddDiffuse from "./diffuse/AddDiffuse"; // Import the dialog component
import OpenFinanceOnElementClick from "@components/dialogs/OpenFinanceOnElementClick"; // Adjust the import path
import HistoryFile from "./history/HistoryFile";

type DocDiffTypeAndLotProps = {
  type?: Type94BEnum;
  lot?: string;
  date?: string | null;
  indice?: string | null;
  status?: StatusE51Enum;
  refetch: () => void;
  register: UseFormRegister<FormValidateDocDiffUpdateType>;
  errors: {
    title?: FieldError;
    phase?: FieldError;
    localisation?: FieldError;
  };
  localisations: LocalisationRead;
  localisation?: LocalisationRead[];
};

const DocDiffTypeAndLotInfo: React.FC<DocDiffTypeAndLotProps> = ({
  register,
  errors,
  refetch,
  localisations,
  localisation,
  type,
  lot,
  date,
  indice,
  status,
}) => {
  const router = useRouter();
  const { edit, docDiffId } = useParams();
  const { user } = useAuth();
  const userRole = user?.role;

  const [types] = useState<keyof typeof Type474Mapping>(type || "autre");
  const { label, color } = getStatus<Type94BEnum>(types, Type474Mapping);

  const { label: labelStatus, color: colorStatus } = getStatus<StatusE51Enum>(
    status,
    StatusE51Mapping,
  );

  const handleRedirect = () => {
    const newUrl = `/${userRole}/locations/add?return_to=${userRole}/projects/${edit}/details/documentDiffusions/${docDiffId}/details`;

    router.push(newUrl);
  };

  // Define button props
  const buttonProps = {
    variant: "contained",
    color: "primary",
    children: "diffuse",
  };

  const buttonProp = {
    variant: "tonal",
    color: "secondary",
    children: "Historique",
  };

  return (
    <Card>
      <CardHeader title="Informations du Document" />
      <CardContent className="flex flex-col gap-[1.638rem]">
        {type && (
          <LabeledData
            label="Type"
            chipProps={{ label: label, color: color, variant: "tonal" }}
          />
        )}
        {lot && <LabeledData label="Lot" value={lot} />}
        {status ? (
          <LabeledData
            label="Statut"
            chipProps={{
              label: labelStatus,
              color: colorStatus,
              variant: "tonal",
            }}
          />
        ) : (
          <Typography variant="body1" color="textSecondary">
            Aucune information disponible
          </Typography>
        )}
        {date && <LabeledData label="Date De Diffusion" value={date} />}
        {indice ? (
          <LabeledData label="Indice" value={indice} />
        ) : (
          <Box display="flex" alignItems="center" className="mb-1">
            <Typography variant="body1" color="textSecondary">
              Aucune information disponible
            </Typography>
          </Box>
        )}
        {!type && !lot && (
          <Typography variant="body1" color="textSecondary">
            Aucune information disponible
          </Typography>
        )}
        <Grid container spacing={6} >
          <Grid item xs={12}>
            <div className="flex items-end gap-4 mb-8">
              <CustomTextField
                select
                fullWidth
                label="Localisation"
                defaultValue={localisations?.id}
                {...register("localisation")}
                error={!!errors.localisation}
                helperText={errors.localisation?.message}
              >
                <MenuItem value="">
                  <em>Sélectionnez une localisation</em>
                </MenuItem>
                {localisation?.map((location) => (
                  <MenuItem key={location.id} value={location.id}>
                    {location.name}
                  </MenuItem>
                ))}
              </CustomTextField>
              <CustomIconButton
                variant="tonal"
                color="primary"
                className="min-is-fit"
                onClick={handleRedirect}
              >
                <i className="tabler-plus" />
              </CustomIconButton>
            </div>
          </Grid>
        </Grid>
        {/* Use the reusable component to open the dialog */}
        <div className="flex flex-col sm:flex-row max-sm:is-full items-start sm:items-center gap-4">
          <OpenFinanceOnElementClick
            element={Button}
            elementProps={buttonProps}
            dialog={AddDiffuse}
            dialogProps={{
              refetch,
            }}
          />
          <OpenFinanceOnElementClick
            element={Button}
            elementProps={buttonProp}
            dialog={HistoryFile}
            dialogProps={{
              refetch,
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DocDiffTypeAndLotInfo;
