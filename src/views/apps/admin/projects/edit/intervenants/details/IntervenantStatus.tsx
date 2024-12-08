import React from 'react';

import {Card, CardHeader, CardContent, Divider, Typography, Switch} from '@mui/material';
import type {FieldError, UseFormRegister} from "react-hook-form";

import type {ProjectIntervenantRead} from "@/services/IsyBuildApi";
import type {
  FormValidateIntervenantEditType
} from "@views/apps/admin/projects/edit/intervenants/details/schemaIntervenantEdit";

type UserStatusProps = {
  register: UseFormRegister<FormValidateIntervenantEditType>; // Adjust the type as necessary
  errors: {
    is_active?: FieldError;

  };
  intervenantData: ProjectIntervenantRead | undefined; // Adjust the type as necessary

};

const IntervenantStatus: React.FC<UserStatusProps> = ({register, errors, intervenantData}) => {

  console.log(intervenantData?.intervenant.user.is_active)

  return (
    <Card>
      <CardHeader title='Détails'/>
      <CardContent>
        <Divider className='mlb-2'/>
        <div className='flex items-center justify-between'>
          <Typography>Statut</Typography>
          <Switch
            {...register('is_active')}
            defaultChecked={intervenantData?.intervenant.user.is_active}
          />
        </div>
        {errors.is_active && <span>{errors.is_active.message}</span>}
      </CardContent>
    </Card>
  );
};

export default IntervenantStatus;
