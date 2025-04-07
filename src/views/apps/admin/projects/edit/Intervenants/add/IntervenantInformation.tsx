"use client";

// MUI Imports
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";

// Import for form handling types
import type {UseFormRegister, FieldError} from "react-hook-form";

import CustomTextField from "@core/components/mui/TextField";
import type {
  FormValidateIntervenantAddType
} from "@views/apps/admin/projects/edit/Intervenants/add/schemaIntervenantAdd";
import {useIntervenantRolesRetrieveQuery} from "@/services/IsyBuildApi";

// Query Import

// Define the prop types based on the form schema
type Props = {
  register: UseFormRegister<FormValidateIntervenantAddType>;
  errors: {
    first_name?: FieldError;
    last_name?: FieldError;
    email?: FieldError;
    redirect_uri?: FieldError;
    is_active?: FieldError;
    role?: FieldError;
  };
};

const IntervenantInformation: React.FC<Props> = ({register, errors}) => {
  const {data: roles, isLoading, error} = useIntervenantRolesRetrieveQuery();

  return (
    <Card>
      <CardHeader title="Intervenant Information"/>
      <CardContent>
        <Grid container spacing={6} className="mbe-6">
          {/* First Name */}
          <Grid item xs={6}>
            <CustomTextField
              fullWidth
              label="Prénom"
              placeholder="Prénom"
              {...register("first_name")}
              error={!!errors.first_name}
              helperText={errors.first_name?.message}
            />
          </Grid>

          {/* Last Name */}
          <Grid item xs={6}>
            <CustomTextField
              fullWidth
              label="Nom de famille"
              placeholder="Nom de famille"
              {...register("last_name")}
              error={!!errors.last_name}
              helperText={errors.last_name?.message}
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              label="E-mail"
              placeholder="email@example.com"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>

          {/* Role Dropdown */}
          <Grid item xs={12}>
            <InputLabel error={!!errors.role} id="role-label">Role</InputLabel>
            <Select
              fullWidth
              labelId="role-label"
              id="role-select"
              disabled={isLoading || !!error} // Disable if roles are loading or there's an error
              {...register('role')}
              error={!!errors.role}
            >
              {isLoading ? (
                <MenuItem disabled>Loading...</MenuItem>
              ) : error ? (
                <MenuItem disabled>Error loading roles</MenuItem>
              ) : (
                roles?.map((role: { value: string; label: string }) => (
                  <MenuItem key={role.value} value={role.value}>
                    {role.label}
                  </MenuItem>
                ))
              )}
            </Select>
            <FormHelperText sx={{color: 'error.main'}}>
              {errors.role?.message}
            </FormHelperText>
          </Grid>

        </Grid>
      </CardContent>
    </Card>
  );
};

export default IntervenantInformation;
