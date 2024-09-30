import React from 'react';

import {Card, CardHeader, CardContent, Divider, Typography, Switch} from '@mui/material';
import type {FieldError, UseFormRegister} from "react-hook-form";

import type {FormValidateClientEditType} from "@views/apps/admin/clients/details/info/schemaClientEdit";
import type {ClientRead} from "@/services/IsyBuildApi";

type ClientStausProps = {
  register: UseFormRegister<FormValidateClientEditType>; // Adjust the type as necessary
  errors: {
    is_active?: FieldError;

  };
  clientData: ClientRead | undefined;

};

const ClientStatus: React.FC<ClientStausProps> = ({register, errors, clientData}) => {
  return (
    <Card>
      <CardHeader title='Détails'/>
      <CardContent>
        <Divider className='mlb-2'/>
        <div className='flex items-center justify-between'>
          <Typography>Statut</Typography>
          <Switch
            {...register('is_active')}
            defaultChecked={clientData ? clientData.is_active : false}
          />
        </div>
        {errors.is_active && <span>{errors.is_active.message}</span>}
      </CardContent>
    </Card>
  );
};

export default ClientStatus;
