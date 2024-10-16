'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// Import for form handling types
import type { UseFormRegister, FieldError } from 'react-hook-form'

import { Divider, Typography, Switch } from '@mui/material'

import CustomTextField from '@core/components/mui/TextField'
import type { FormValidateStaffEditType } from './schemaStaffEdit'

type StaffInformationProps = {
  register: UseFormRegister<FormValidateStaffEditType> // Register from react-hook-form
  errors: {
    first_name?: FieldError
    last_name?: FieldError
    email?: FieldError
    redirect_uri?: FieldError
    is_active?: FieldError
  }
}

const StaffInformation: React.FC<StaffInformationProps> = ({ register, errors }) => {
  return (
    <Card>
      <CardHeader title='User Information' />
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          {/* First Name */}
          <Grid item xs={6}>
            <CustomTextField
              fullWidth
              label='Prénom'
              placeholder='Prénom'
              {...register('first_name')} // Registering the first_name field from props
              error={!!errors.first_name} // Error handling
              helperText={errors.first_name?.message} // Error message
            />
          </Grid>

          {/* Last Name */}
          <Grid item xs={6}>
            <CustomTextField
              fullWidth
              label='Nom de famille'
              placeholder='Nom de famille'
              {...register('last_name')} // Registering the last_name field from props
              error={!!errors.last_name} // Error handling
              helperText={errors.last_name?.message} // Error message
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              label='E-mail'
              placeholder='email@example.com'
              
              

             
            />
          </Grid>
          <Grid item xs={12}>
            <Divider className='mlb-0' />

            <div className='flex items-center justify-between'>
              <Typography>Statut</Typography>
              <Switch {...register('is_active')} defaultChecked />
            </div>
            {errors.is_active && <span>{errors.is_active.message}</span>}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StaffInformation
