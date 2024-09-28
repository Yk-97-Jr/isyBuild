import React from 'react';

import {Card, CardHeader, CardContent, Divider, Typography, Switch} from '@mui/material';
import type {FieldError, UseFormRegister} from "react-hook-form";

import type {FormValidateClientAddType} from "@views/apps/admin/clients/add/shemaClientAdd";

type ClientStausProps = {
  register: UseFormRegister<FormValidateClientAddType>; // Adjust the type as necessary
  errors: {
    is_active?: FieldError;

  };
};

const ClientCreatedBy: React.FC<ClientStausProps> = ({register, errors}) => {
  return (
    <Card>
      <CardHeader title='Créé par'/>
      <CardContent>
        <Typography variant="subtitle2" className='mt-4' fontWeight="normal">Créé par
        </Typography>
        <Divider className='mlb-2' sx={{height: '1px', width: '50%', marginLeft: '0'}}/>
        <Typography variant="h6" fontWeight="bold">Mahdadi Zakaria</Typography>
        <Typography variant="body1">zaki.mahdadi@gmail.com</Typography>

        {/* Adjusted styling for "Plus De Détails" */}

        <Typography variant="subtitle2" className='mt-4' fontWeight="normal">Plus De Détails</Typography>
        <Divider className='mlb-2' sx={{height: '1px', width: '50%', marginLeft: '0'}}/>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center flex-wrap gap-x-1.5'>
            <Typography className='font-medium' color='text.primary'>
              Créé à:
            </Typography>
            <Typography>zaki.mahdadi@gmail.com</Typography>

          </div>
          <div className='flex items-center flex-wrap gap-x-1.5'>
            <Typography className='font-medium' color='text.primary'>
              Mise à jour à:
            </Typography>
            <Typography>2024-09-01</Typography>
          </div>
        </div>
      </CardContent>
    </Card>

  );
};

export default ClientCreatedBy;
