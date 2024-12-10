'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

import CardContent from '@mui/material/CardContent'

// Import for form handling types
import type { UseFormRegister, FieldError } from 'react-hook-form'

import { Divider, Typography, Switch } from '@mui/material'

import CustomTextField from '@core/components/mui/TextField'
import type { FormValidateStaffEditType } from './schemaStaffEdit'
import type { SubcontractorStaffRead } from '@/services/IsyBuildApi'

type StaffInformationProps = {
  register: UseFormRegister<FormValidateStaffEditType> // Register from react-hook-form
  errors: {
    first_name?: FieldError
    last_name?: FieldError
    email?: FieldError
    redirect_uri?: FieldError
    is_active?: FieldError
  }
  subcontractorStaffData?:SubcontractorStaffRead
}

const StaffInformation: React.FC<StaffInformationProps> = ({ register, errors,subcontractorStaffData }) => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          {/* First Name */}
          <Grid item xs={6}>
            <CustomTextField
              fullWidth
              label='Prénom'
              placeholder='Prénom'
              {...register('first_name')}
              error={!!errors.first_name}
              helperText={errors.first_name?.message}
            />
          </Grid>

          {/* Last Name */}
          <Grid item xs={6}>
            <CustomTextField
              fullWidth
              label='Nom de famille'
              placeholder='Nom de famille'
              {...register('last_name')}
              error={!!errors.last_name}
              helperText={errors.last_name?.message}
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              label='E-mail '
              placeholder='email@example.com'
              {...register('email')} // Register the email field
              error={!!errors.email} // Error handling
              helperText={errors.email?.message} // Error message
              disabled // Make it read-only if you don't want to edit
            />
          </Grid>

          <Grid item xs={12}>
            <Divider className='mlb-0' />
            <div className='flex items-center justify-between'>
              <Typography>Statut</Typography>
              <Switch {...register('is_active')} defaultChecked={subcontractorStaffData ? subcontractorStaffData.user.is_active: false} />
            </div>
            {errors.is_active && <span>{errors.is_active.message}</span>}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StaffInformation