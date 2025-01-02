import React, { useEffect, useState } from 'react';

import { Card, CardHeader, CardContent, Typography, Chip } from '@mui/material';

import type { DgdStatusEnum, FinanceEnterpriseRead,  } from '@/services/IsyBuildApi';
import { DgdStatusMapping } from '@/utils/statusEnums';
import { getStatusProps } from '@/utils/statusHelper';

type DocDiffTypeAndLotProps = {
 
  data?:FinanceEnterpriseRead 
 
};

const FEDataCard: React.FC<DocDiffTypeAndLotProps> = ({ data }) => {

  const [status, setStatus] = useState<keyof typeof DgdStatusMapping>(
            data?.dgd_status || "abandon"
          );
      
  
      
        const {
          label,
          color
        } = getStatusProps<DgdStatusEnum >(status, DgdStatusMapping);


        useEffect(() => {
          if (data?.dgd_status) setStatus(data.dgd_status);
        }, [data?.dgd_status]);
        

  return (
    <Card>
      <CardHeader title="Informations " />
      <CardContent className='flex flex-col gap-[1.638rem]'>
        {/* Display Project Lot */}
        {data?.subcontractor.name && (
         <div>
             <div className='flex items-center gap-4'>
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
              <div className='flex flex-col'>
           <Typography variant="body1" color='text.primary'>
             Enterprise 
           </Typography>
              </div>
           <Typography   >
             {data.subcontractor.name}
           </Typography>
      
         </div>
         </div>
       </div>

       
       
        )}
     
     <div className='flex items-center gap-4'>
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
              <div className='flex flex-col'>
                <Typography className='font-medium' color='text.primary'>
                  {"Caution"}
                </Typography>
              </div>
              <Typography>{`${data?.caution}`}</Typography>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
              <div className='flex flex-col'>
                <Typography className='font-medium' color='text.primary'>
                  {"Dgd"}
                </Typography>
              </div>
              <Chip
              label={label}
              color={color as 'default' | 'primary' | 'secondary' | 'error' | 'success' | 'warning'}
              variant='tonal'/>

            </div>
          </div>

        {/* Handle case where no data is available */}
        {!data?.subcontractor.name 
 && (
          <Typography variant="body1" color="textSecondary">
            Aucune information disponible
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default FEDataCard;


