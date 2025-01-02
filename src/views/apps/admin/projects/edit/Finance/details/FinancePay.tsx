import React from 'react';

import { Card, CardHeader, CardContent } from '@mui/material';

import LabeledData from '@/components/LabledData'; // Adjust the import path as needed
import type { FinanceRead } from '@/services/IsyBuildApi';

type DocDiffTypeAndLotProps = {
  data?: FinanceRead;
};

const FinancePay: React.FC<DocDiffTypeAndLotProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader title="Paiement" />
      <CardContent className='flex flex-col gap-[1.638rem]'>
        <LabeledData label="Paiement cumulé" value={`${data?.payment_cumulated}€`} />
        <LabeledData label="Paiement cumulé %" value={`${data?.payment_cumulated_percentage}€`} />
      </CardContent>
    </Card>
  );
};

export default FinancePay;
