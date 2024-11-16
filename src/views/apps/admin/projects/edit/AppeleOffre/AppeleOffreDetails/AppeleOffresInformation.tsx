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

import type {ProjectLotRead, Status109Enum} from "@/services/IsyBuildApi";

import {useAuth} from "@/contexts/AuthContext";
import {getStatusProps} from "@/utils/statusHelper";
import {Status109Mapping} from "@/utils/statusEnums";

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


  const {
    label,
    color
  } = getStatusProps<Status109Enum>(projectLotData?.status, Status109Mapping);


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
              {/*<Typography className='font-medium' color='text.primary'>Créé à:</Typography>*/}
              {/*<Typography>{formatDate(projectLotData.created_at)}</Typography>*/}
              <Grid item xs={12} sm={12}>
                <Typography className='font-medium' color='text.primary'>
                  Lot:
                  <Typography component="span" sx={{marginLeft: 1}}>
                    {projectLotData?.lot.name}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography className='font-medium' color='text.primary'>Document téléchargé:
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
                <Typography className='font-medium' color='text.primary'>Status:
                  {
                    <Chip sx={{marginLeft: 1}} variant="tonal" label={label}
                          color={color as any}/>
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
