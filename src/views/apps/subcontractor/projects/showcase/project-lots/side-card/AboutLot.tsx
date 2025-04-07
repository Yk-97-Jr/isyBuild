



import React from 'react'
 
import { Card,  CardContent, Grid, Typography } from '@mui/material'


import type { ProjectLotRead  } from '@/services/IsyBuildApi'

type  LotAboutProps = {
  LotData: ProjectLotRead  | undefined // Adjust the type as necessary
}









const AboutLot: React.FC<LotAboutProps> = ({ LotData }) => {


  return (
    <Card>
      <CardContent className='flex flex-col gap-6 mbe-6'>
        <Typography variant='subtitle2' fontWeight='normal'>
        à propos
        </Typography>
        
        {LotData ? (
          <>
            
          <Grid item >
                <Typography className='font-medium' color='text.primary'>
                  Lot:
                  <Typography component="span" sx={{marginLeft: 1}}>
                    {LotData?.lot.name}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item >
                <Typography className='font-medium' color='text.primary'>
                  project:
                  <Typography component="span" sx={{marginLeft: 1}}>
                    {LotData?.project.name}
                  </Typography>
                </Typography>
              </Grid>
</>
           
        
          
            
          ) : (
            <Typography variant='body1' color='text.secondary'>
              Aucune information disponible
            </Typography>
          )}
        
      </CardContent>
    </Card>
  )
}

export default AboutLot






