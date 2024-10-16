import React from 'react'

import { Card, CardHeader, CardContent, Divider, Typography, Switch } from '@mui/material'
import type { FieldError, UseFormRegister } from 'react-hook-form'

import type { FormValidateSubcontractorEditType } from '@/views/apps/client/subcontractor/details/schemaSubcontractorEdit'

import type { SubcontractorRead } from '@/services/IsyBuildApi'

type ClientStausProps = {
  register: UseFormRegister<FormValidateSubcontractorEditType> // Adjust the type as necessary
  errors: {
    is_active?: FieldError
  }
  subcontractorData: SubcontractorRead | undefined
}

const SubcontractorStatus: React.FC<ClientStausProps> = ({ register, errors, subcontractorData }) => {
  return (
    <Card>
      <CardHeader title='Détails' />
      <CardContent>
        <Divider className='mlb-2' />
        <div className='flex items-center justify-between'>
          <Typography>Statut</Typography>
          <Switch {...register('is_active')} defaultChecked={subcontractorData ? subcontractorData.is_active : false} />
        </div>
        {errors.is_active && <span>{errors.is_active.message}</span>}
      </CardContent>
    </Card>
  )
}

export default SubcontractorStatus
