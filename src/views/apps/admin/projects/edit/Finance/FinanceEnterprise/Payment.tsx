import React, { useEffect, useState } from 'react';

import { Card, CardHeader, CardContent } from '@mui/material';

import type { DgdStatusEnum, FinanceEnterpriseRead,  } from '@/services/IsyBuildApi';
import LabeledData from '@/components/LabledData';
import { DgdStatusMapping } from '@/utils/statusEnums';
import { getStatus } from '@/utils/statusHelper';

type DocDiffTypeAndLotProps = {
 
  data?:FinanceEnterpriseRead 
 
};



const Payment: React.FC<DocDiffTypeAndLotProps> = ({ data }) => {

  const [status, setStatus] = useState<keyof typeof DgdStatusMapping>(
              data?.dgd_status || "abandon"
            );
        
    
        
          const {
            label,
            color
          } = getStatus<DgdStatusEnum >(status, DgdStatusMapping);
  
  
          useEffect(() => {
            if (data?.dgd_status) setStatus(data.dgd_status);
          }, [data?.dgd_status]);

          
          

  return (
    <Card>
      <CardHeader title="Paiement " />
      <CardContent className='flex flex-col gap-[1.638rem]'>
      <LabeledData label="Paiement cumule" value={`${data?.payment_cumulated}€`}/>
      <LabeledData label="Paiement cumule %" value={`${data?.payment_cumulated_percentage }%`} />
      <LabeledData label="Caution" value={`${data?.caution}`} />
      <LabeledData label="Dgd" value={`${data?.dgd_status}`} chipProps={{
    label: label,
    color: color ,
    variant: 'tonal',
  }}/>
      </CardContent>
    </Card>
  );
};

export default Payment;






