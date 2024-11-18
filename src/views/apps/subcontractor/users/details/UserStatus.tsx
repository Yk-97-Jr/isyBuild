import React from 'react';

import { Card, CardHeader, CardContent, Divider, Typography, Switch } from '@mui/material';
import type {FieldError, UseFormRegister} from "react-hook-form";

import type {FormValidateUserStaffEditType} from "@views/apps/subcontractor/users/details/shemaUserStaffEdit";
import type { SubcontractorStaffRead } from '@/services/IsyBuildApi';


type UserStatusProps = {
  register: UseFormRegister<FormValidateUserStaffEditType>; // Adjust the type as necessary
  errors: {
    is_active?: FieldError;

  };
  userStaffData:SubcontractorStaffRead |  undefined;
};

const UserStatus : React.FC<UserStatusProps> = ({register, errors, userStaffData})  => {
  return (
    <Card>
      <CardHeader title='Détails' />
      <CardContent>
        <Divider className='mlb-2' />
        <div className='flex items-center justify-between'>
          <Typography>Statut</Typography>
          <Switch
            {...register('is_active')}
            defaultChecked={userStaffData ? userStaffData.user.is_active : false}
          />
        </div>
        {errors.is_active && <span>{errors.is_active.message}</span>}
      </CardContent>
    </Card>
  );
};

export default UserStatus;
