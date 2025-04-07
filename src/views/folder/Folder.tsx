'use client'

// MUI Imports
import React from "react";

import {useParams} from "next/navigation";

import {Alert, Box, Card, CardContent, Typography, CircularProgress} from '@mui/material';
import Grid from '@mui/material/Grid';

import FolderListTable from "@views/folder/FolderListTable";
import {useGetFolderDetailQuery} from "@/services/IsyBuildApi";
import FolderHeader from "@views/folder/FolderHeader";

const FolderList = () => {
  const {id} = useParams(); // Get clientId from route parameters
  const {data, error, isLoading} = useGetFolderDetailQuery({folderId: +id});

  // Loading state
  if (isLoading)
    return (
      <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
        <CircularProgress/>
      </Box>
    );

  // Error handling
  if (error) {
    if ('status' in error) {
      const status = error.status;

      switch (status) {
        case 404:
          return (
            <Card sx={{margin: 2}}>
              <CardContent>
                <Typography variant="h6" color="textPrimary" gutterBottom>
                  Dossier introuvable (404)
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Désolé, le dossier que vous cherchez n&#39;existe pas.
                </Typography>
                <Box mt={2}>
                  <Alert severity="error">
                    La ressource n&#39;a pas pu être trouvée. Veuillez vérifier l&#39;URL ou réessayer plus tard.
                  </Alert>
                </Box>
              </CardContent>
            </Card>
          );
        case 403:
          return (
            <Card sx={{margin: 2}}>
              <CardContent>
                <Typography variant="h6" color="textPrimary" gutterBottom>
                  Accès interdit (403)
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Vous n&#39;avez pas la permission d&#39;accéder à cette ressource.
                </Typography>
                <Box mt={2}>
                  <Alert severity="warning">
                    Vous devrez peut-être vous connecter ou obtenir les permissions appropriées pour afficher ce
                    dossier.
                  </Alert>
                </Box>
              </CardContent>
            </Card>
          );
        default:
          return (
            <Alert severity="error">
              Une erreur inattendue s&#39;est produite. Veuillez réessayer plus tard.
            </Alert>
          );
      }
    }
  }

  // Data rendering
  const documents = data?.documents || [];

  return (
    <Grid container spacing={6} justifyContent="center" alignItems="center">
      <Grid item xs={10} sx={{mt: 8}}>
        <FolderHeader/>
      </Grid>
      <Grid item xs={10} sx={{mt: 6}}>
        <Typography variant='h3' className='mbe-6'>
          Détails du dossier
        </Typography>
        <FolderListTable tableData={documents}/>
      </Grid>
    </Grid>
  );
};

export default FolderList;
