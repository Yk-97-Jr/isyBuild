'use client';

// MUI Imports
import React from "react";

import {useParams, useRouter} from "next/navigation";

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import Typography from "@mui/material/Typography";

import {Button} from "@mui/material";

import Chip from "@mui/material/Chip";

import type {ProjectLotRead} from "@/services/IsyBuildApi";

import {useAuth} from "@/contexts/AuthContext";

// Type imports for form handling

type Props = {
  projectLotData: ProjectLotRead | undefined; // Adjust the type as necessary


};

const AppeleOffresInformation: React.FC<Props> = ({projectLotData}) => {
  const router = useRouter();
  const {user} = useAuth();  // Get the user from AuthContext
  const userRole = user?.role
  const {edit: projectId} = useParams();
  const {id: projectLotId} = useParams();

  const redirectFolder = () => {
    router.push(`/${userRole}/projects/${projectId}/details/${projectLotId}/folder`);

  }

  return (
    <Card>
      <CardHeader title='Détails'
                  titleTypographyProps={{variant: 'h3'}}
                  action={
                    <Button variant="contained" color="primary" onClick={redirectFolder}>
                      Afficher le dossier
                    </Button>
                  }/>
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          {projectLotData ? (
            <>
              <Grid item xs={12} sm={12}>
                <Typography variant="h5" color="text.primary">
                  Lot:
                  <Typography variant="body1" component="span" color="text.secondary" sx={{marginLeft: 1}}>
                    {projectLotData?.lot.name}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography variant="h5" color='text.primary'>Document téléchargé:
                  {
                    <Chip
                      sx={{marginLeft: 1}}
                      variant='tonal'
                      label={projectLotData.folder && projectLotData.folder.documents.length > 0 ? 'Existé' : 'Non existé'}
                      color={projectLotData.folder && projectLotData.folder.documents.length > 0 ? 'success' : 'error'}
                    />
                  }
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography variant="h5" color='text.primary'>Staus:
                  {
                    <Chip
                      sx={{marginLeft: 1}}
                      variant='tonal'
                      label={projectLotData.status ? projectLotData.status : 'completed'}
                      color={projectLotData.status ? 'warning' : 'secondary'}
                    />
                  }
                </Typography>
              </Grid>
            </>
          ) : (
            <Typography variant="body1" color="text.secondary">Aucune information disponible</Typography>
          )}

        </Grid>
      </CardContent>
    </Card>
  );
};

export default AppeleOffresInformation;
