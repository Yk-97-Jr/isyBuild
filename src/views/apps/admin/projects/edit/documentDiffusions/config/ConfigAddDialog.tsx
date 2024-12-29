'use client';

import React, { useContext, useState } from 'react';

import { useParams } from 'next/navigation';

import type { SelectChangeEvent } from '@mui/material';
import { Button, Chip, CircularProgress, Grid, MenuItem } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';


import { useDocumentDiffusionConfigBulkUpdateMutation } from '@/services/IsyBuildApi';
import { SnackBarContext } from '@/contexts/SnackBarContextProvider';
import type { SnackBarContextType } from '@/types/apps/snackbarType';
import CustomTextField from '@core/components/mui/TextField';

type AddRolesConfigProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  refetch: () => void;
};

// Define the RolesEnum
type RolesEnum =
  | 'Architecte'
  | 'Bureau de contrôle'
  | "Bureau d'étude technique"
  | 'Coordonnateur sécurité et protection de la santé'
  | 'Assistance maîtrise d’ouvrage hygiène et environnement'
  | 'Client';

// Initialize the roles array
const rolesEnum: RolesEnum[] = [
  'Architecte',
  'Bureau de contrôle',
  "Bureau d'étude technique",
  'Coordonnateur sécurité et protection de la santé',
  'Assistance maîtrise d’ouvrage hygiène et environnement',
  'Client',
];

const dataStatic = [
    {
      "id": 5,
      "type": "plan_technique",
      "roles": [
        "Architecte",
        "Client",
        "Bureau d'étude technique"
      ]
    },
    {
      "id": 6,
      "type": "avis_technique",
      "roles": [
        "Architecte",
        "Client",
        "Bureau d'étude technique"
      ]
    },
    {
      "id": 7,
      "type": "fiche_question",
      "roles": [
        "Architecte",
        "Client",
        "Bureau d'étude technique"
      ]
    },
    {
      "id": 8,
      "type": "fiche_technique",
      "roles": [
        "Architecte",
        "Client",
        "Bureau d'étude technique"
      ]
    },
    {
      "id": 9,
      "type": "plan_de_coffrage",
      "roles": [
        "Architecte",
        "Client",
        "Bureau d'étude technique"
      ]
    },
    {
      "id": 10,
      "type": "note_de_calcul",
      "roles": [
        "Bureau d'étude technique"
      ]
    },
    {
      "id": 11,
      "type": "autre",
      "roles": [
        "Architecte"
      ]
    }
  ]

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    console.log("data",event);
    
  }

  
  const handleDelete = (value: string) => {
   console.log(value);
   
  }
  
  const AddRolesConfig = ({ open, setOpen, refetch }: AddRolesConfigProps) => {
      const [selectedRoles, ] = useState<Record<RolesEnum, RolesEnum[]>>(() =>
        rolesEnum.reduce((acc, role) => {
            acc[role] = [];
            
            return acc;
        }, {} as Record<RolesEnum, RolesEnum[]>)
    );
    
    const { projectId } = useParams(); // Assuming projectId is the dynamic parameter
    const { setOpenSnackBar, setInfoAlert } = useContext(SnackBarContext) as SnackBarContextType;
    const [availblRole, ] = useState<string[]>(rolesEnum)

  const [updateConfigs, { isLoading }] = useDocumentDiffusionConfigBulkUpdateMutation();

  const handleClose = () => {
    setOpen(false);
    if (refetch) refetch();
  };



  const handleUpdate = async () => {
    try {
      const body = Object.entries(selectedRoles).map(([key, value]) => ({
        id: rolesEnum.indexOf(key as RolesEnum) + 1, // Example ID logic
        roles: value,
      }));

      await updateConfigs({ projectId: +projectId, body }).unwrap();

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

  return (
    <Dialog fullWidth open={open} onClose={handleClose} maxWidth="sm">
      <DialogTitle>Configurer les rôles</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {dataStatic.map((cfg) => (
            <Grid item xs={12} sm={6} key={cfg.id}>
                <CustomTextField
                select
                fullWidth
                label='Language'
            value={cfg.roles}
                SelectProps={{
                  multiple: true, // @ts-ignore
                  onChange: handleChange,
                  renderValue: selected => (
                    <div className='flex flex-wrap gap-2'>
                      {(selected as string[]).map(value => (
                        <Chip
                          key={value}
                          clickable
                          onMouseDown={event => event.stopPropagation()}
                          size='small'
                          label={value}

                          onDelete={() => handleDelete(value)}
                        />
                      ))}
                    </div>
                  )
                }}
              >
                {availblRole.map(name => (
                  <MenuItem key={name} value={name}>
                    {name}
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
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Mettre à jour'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRolesConfig;
