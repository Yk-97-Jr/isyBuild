// MUI Imports
import React from "react";

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Util Imports
import Grid from "@mui/material/Grid";

import Chip from "@mui/material/Chip";

import type {ProjectLotSubcontractorRead} from "@/services/IsyBuildApi";

type Props = {
  projectLotSubcontractorData: ProjectLotSubcontractorRead | undefined // Adjust the type as necessary
}



// Vars

const Apropos: React.FC<Props> = ({projectLotSubcontractorData}) => {
  // Vars

  return (
    <Card>
      <CardContent className='flex flex-col gap-6'>
        <Typography variant='subtitle2' fontWeight='normal'>
          Responsable
        </Typography>
        <Grid container spacing={6} className='mbe-6'>
          {projectLotSubcontractorData ? (
            <>
              <Grid item xs={12} sm={12}>
                <Typography variant="h5" color="text.primary">
                  Entreprise:
                  <Typography variant="body1" component="span" color="text.secondary" sx={{marginLeft: 1}}>
                    {projectLotSubcontractorData?.subcontractor.name}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography variant="h5" color='text.primary'>Staus:
                  {
                    <Chip
                      sx={{marginLeft: 1}}
                      variant='tonal'
                      label={projectLotSubcontractorData.status ? projectLotSubcontractorData.status : 'completed'}
                      color={projectLotSubcontractorData.status ? 'warning' : 'secondary'}
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
  )
}

export default Apropos
