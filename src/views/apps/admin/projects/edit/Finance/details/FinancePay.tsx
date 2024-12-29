import React from 'react';

import { Card, CardHeader, CardContent, Typography } from '@mui/material';

import type { FinanceRead,  } from '@/services/IsyBuildApi';

type DocDiffTypeAndLotProps = {
 
  data?:FinanceRead 
 
};

const FinancePay: React.FC<DocDiffTypeAndLotProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader title="Paiement " />
      <CardContent>
      <div className='flex items-center gap-4'>
    <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
      <div className='flex flex-col'>
        <Typography className='font-medium' variant="body1"  color='text.primary'>
          {"Paiement cumule"}
        </Typography>
      </div>
      <Typography>{`${data?.payment_cumulated}$`}</Typography>
    </div>
  </div>
  <div className='flex items-center gap-4'>
    <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
      <div className='flex flex-col'>
        <Typography className='font-medium' variant="body1"  color='text.primary'>
          {"Paiement cumule%"}
        </Typography>
      </div>
      <Typography>{`${data?.payment_cumulated_percentage}$`}</Typography>
    </div>
  </div>
      </CardContent>
    </Card>
  );
};

export default FinancePay;



