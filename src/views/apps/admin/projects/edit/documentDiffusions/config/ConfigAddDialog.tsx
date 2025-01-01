'use client';

import React, { useContext, useState,useEffect } from 'react';

import { useParams } from 'next/navigation';

import type {
 SelectChangeEvent } from '@mui/material';
import {
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  MenuItem } from '@mui/material';

import type { DocumentDiffusionConfigUpdateRequest} from '@/services/IsyBuildApi';
import { useDocumentDiffusionConfigBulkUpdateMutation, useDocumentDiffusionConfigByProjectListQuery } from '@/services/IsyBuildApi';
import { SnackBarContext } from '@/contexts/SnackBarContextProvider';
import type { SnackBarContextType } from '@/types/apps/snackbarType';
import CustomTextField from '@core/components/mui/TextField';

// Define props
type AddRolesConfigProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  refetch: () => void;
};

// Define RolesEnum for role selection
type RolesEnum =
  | 'Architecte'
  | 'Bureau de contrôle'
  | "Bureau d'étude technique"
  | 'Coordonnateur sécurité et protection de la santé'
  | 'Assistance maîtrise d’ouvrage hygiène et environnement'
  | 'Client';

// Roles available for selection
const rolesEnum: RolesEnum[] = [
  'Architecte',
  'Bureau de contrôle',
  "Bureau d'étude technique",
  'Coordonnateur sécurité et protection de la santé',
  'Assistance maîtrise d’ouvrage hygiène et environnement',
  'Client',
];



const AddRolesConfig = ({ open, setOpen, refetch }: AddRolesConfigProps) => {
  // State for role configurations

  const { edit } = useParams(); // Fetch project ID from URL
  const { setOpenSnackBar, setInfoAlert } = useContext(SnackBarContext) as SnackBarContextType;

  // API mutation
  const [updateConfigs, { isLoading }] = useDocumentDiffusionConfigBulkUpdateMutation();
  const { data: fetchedConfigs, isLoading: isFetching } = useDocumentDiffusionConfigByProjectListQuery({ projectId: +edit});

  const [configs, setConfigs] = useState<{ id: number; type: string; selectedRoles: RolesEnum[] }[]>([]);

  // Close dialog
  const handleClose = () => {
    setOpen(false);
    if (refetch) refetch();
  };

  useEffect(() => {
    if (Array.isArray(fetchedConfigs)) {
      setConfigs(
        fetchedConfigs.map((config: { id: number; type: string; roles: RolesEnum[] }) => ({
          id: config.id,
          type: config.type,
          selectedRoles: config.roles,
        }))
      );
    }
  }, [fetchedConfigs]);

  // Update configurations on Save
  const handleUpdate = async () => {
    try {
  
      const body: DocumentDiffusionConfigUpdateRequest[] = configs.map((config) => ({
        id: config.id,
        roles: config.selectedRoles as RolesEnum[], // Ensure roles match the RolesEnum type
      }));

      await updateConfigs({ projectId: +edit, body }).unwrap();

      setOpenSnackBar(true);
      setInfoAlert({ severity: 'success', message: 'Configurations mises à jour avec succès' });
      handleClose();
    } catch (error) {
      console.error('Failed to update configurations:', error);
      setOpenSnackBar(true);
      setInfoAlert({
        severity: 'error',
        message: 'Échec de la mise à jour des configurations',
      });
    }
  };

  // Handle role change
  const handleChange = (id: number, event: SelectChangeEvent<unknown>) => {
    // Cast the value to RolesEnum[]
    const value = (typeof event.target.value === 'string'
      ? event.target.value.split(',')
      : event.target.value) as RolesEnum[];
  
    // Update the state
    setConfigs((prev) =>
      prev.map((config) =>
        config.id === id ? { ...config, selectedRoles: value } : config
      )
    );
  };

  // Delete role for a specific configuration
  const handleDelete = (id: number, role: string) => {
    setConfigs((prev) =>
      prev.map((config) =>
        config.id === id
          ? { ...config, selectedRoles: config.selectedRoles.filter((r) => r !== role) }
          : config
      )
    );
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose} maxWidth="sm">
      <DialogTitle>Configurer les rôles</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {configs.map((config) => (
            <Grid item xs={12}  key={config.id}>
              <CustomTextField
                select
                fullWidth
                label={config.type}
                value={config.selectedRoles}
                SelectProps={{
                  multiple: true,
                  onChange: (e) => handleChange(config.id, e ),
                  renderValue: (selected) => (
                    <div className="flex flex-wrap gap-2">
                      {(selected as string[]).map((value) => (
                        <Chip
                          key={value}
                          clickable
                          onMouseDown={(event) => event.stopPropagation()}
                          size="small"
                          label={value}
                          onDelete={() => handleDelete(config.id, value)}
                        />
                      ))}
                    </div>
                  ),
                }}
              >
                {rolesEnum.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Annuler
        </Button>
        <Button onClick={handleUpdate} variant="contained" color="primary" disabled={isLoading}>
          {isFetching ? <CircularProgress size={24} color="inherit" /> : 'Mettre à jour'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRolesConfig;
