// MUI Imports
import React from "react";

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Util Imports
import Grid from "@mui/material/Grid";


import type {ProjectLotSubcontractorRead} from "@/services/IsyBuildApi";

type Props = {
  projectLotSubcontractorData: ProjectLotSubcontractorRead | undefined // Adjust the type as necessary
}



// Vars

const AproposEntreprise: React.FC<Props> = ({projectLotSubcontractorData}) => {
  // Vars

  return (
    <Card>
      <CardContent className='flex flex-col gap-6'>
        <Typography variant='subtitle2' fontWeight='normal'>
          À Propos Entreprise
        </Typography>
        <Grid container spacing={6} className='mbe-6'>
          {projectLotSubcontractorData ? (
            <>
              <Grid item xs={12} sm={12}>
                <Typography className='font-medium' color='text.primary'>
                  Entreprise:
                  <Typography variant="body1" component="span" color="text.secondary" sx={{marginLeft: 1}}>
                    {projectLotSubcontractorData?.subcontractor.name}
                  </Typography>
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

export default AproposEntreprise
