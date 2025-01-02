import React from 'react';

import { Card, CardHeader, CardContent } from '@mui/material';

import type { FinanceEnterpriseRead,  } from '@/services/IsyBuildApi';
import LabeledData from '@/components/LabledData';

type DocDiffTypeAndLotProps = {
 
  data?:FinanceEnterpriseRead 
 
};

const Payment: React.FC<DocDiffTypeAndLotProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader title="Paiement " />
      <CardContent className='flex flex-col gap-[1.638rem]'>
      <LabeledData label="Paiement cumule" value={`${data?.payment_cumulated}€`}/>
      <LabeledData label="Paiement cumule %" value={`${data?.payment_cumulated_percentage }%`} />
      </CardContent>
    </Card>
  );
};

export default Payment;



