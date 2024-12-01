



import React from 'react'
 
import { Card,  CardContent, Typography } from '@mui/material'


import type { ProjectSubcontractorRead } from '@/services/IsyBuildApi'

type  ClinetShowcaseProps = {
  clinetShowcaseData: ProjectSubcontractorRead | undefined // Adjust the type as necessary
}









const ClinetShowcase: React.FC<ClinetShowcaseProps> = ({ clinetShowcaseData }) => {


  return (
    <Card>
      <CardContent className='flex flex-col gap-6'>
        <Typography variant='subtitle2' fontWeight='normal'>
        à propos
        </Typography>
        
        {clinetShowcaseData ? (
            <div className='flex items-center gap-3'>
          
          <div className='flex flex-col'>
            <Typography color='text.primary' className='normal'>
            Projet: {clinetShowcaseData?.name} 
            </Typography>
          </div>
        </div>
           
        
          
            
          ) : (
            <Typography variant='body1' color='text.secondary'>
              Aucune information disponible
            </Typography>
          )}
        
      </CardContent>
    </Card>
  )
}

export default ClinetShowcase






