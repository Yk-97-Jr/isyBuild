import React from 'react';

import { Card, CardHeader, CardContent, Divider, Typography, Switch } from '@mui/material';
import type {FieldError, UseFormRegister} from "react-hook-form";

import type {FormValidateClientEditType} from "@views/apps/admin/clients/details/info/schemaClientEdit";

type ClientStausProps = {
  register: UseFormRegister<FormValidateClientEditType>; // Adjust the type as necessary
  errors: {
    is_active?: FieldError;

  };
};

const ClientStatus : React.FC<ClientStausProps> = ({register, errors})  => {
  return (
    <Card>
      <CardHeader title='Détails' />
      <CardContent>
        <Divider className='mlb-2' />
        <div className='flex items-center justify-between'>
          <Typography>Statut</Typography>
          <Switch
            {...register('is_active')}
            defaultChecked
          />
        </div>
        {errors.is_active && <span>{errors.is_active.message}</span>}
      </CardContent>
    </Card>
  );
};

export default ClientStatus;
