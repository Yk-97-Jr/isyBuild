import React from 'react';

import { Card, CardHeader, CardContent, Typography } from '@mui/material';

import type { FinanceRead,  } from '@/services/IsyBuildApi';

type DocDiffTypeAndLotProps = {
 
  data?:FinanceRead  
 
};

const FinanceDataCard: React.FC<DocDiffTypeAndLotProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader title="Informations " />
      <CardContent className='flex flex-col gap-[1.638rem]'>
        {/* Display Project Lot */}
        {data?.project_lot.lot.name && (
         <div>
             <div className='flex items-center gap-4'>
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>

         
              <div className='flex flex-col'>
           <Typography variant="body1" color='text.primary'>
             Lot :
           </Typography>
              </div>
           <Typography   >
             {data?.project_lot.lot.name}
           </Typography>
      
         </div>
         </div>
       </div>
        )}
         {/* Display Project Lot */}
         {data?.project_lot.project.name && (
         <div>
             <div className='flex items-center gap-4'>
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>

         
              <div className='flex flex-col'>
           <Typography variant="body1" color='text.primary'>
             Project:
           </Typography>
              </div>
           <Typography   >
             {data?.project_lot.project.name}
           </Typography>
      
         </div>
         </div>
       </div>
        )}
     


        {/* Handle case where no data is available */}
        {!data?.project_lot.lot.name 
 && (
          <Typography variant="body1" color="textSecondary">
            Aucune information disponible
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default FinanceDataCard;


