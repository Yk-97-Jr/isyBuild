// eslint-disable-next-line import/order
import React from 'react';
import {useParams, useRouter} from "next/navigation";

import {Card, CardHeader, CardContent, Button, Typography} from '@mui/material';

import Grid from "@mui/material/Grid";

import {useAuth} from "@/contexts/AuthContext";

const HandleIntervenants: React.FC = () => {
  const router = useRouter();
  const {user} = useAuth(); // Get the user from AuthContext
  const userRole = user?.role;
  const {edit} = useParams(); // Get edit parameter from route

  const forwardIntervenants = () => {
    router.push(`/${userRole}/projects/${edit}/details/intervenants`);
  };

  return (
    <Card>
      <CardHeader title="Les intervenants"/>
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid item xs={12}>
            <Typography>
              Cliquez sur le bouton ci-dessous pour gérer les intervenants associés à ce projet.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={forwardIntervenants}>
              Aller vers Intervenants
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
    ;
};

export default HandleIntervenants;
