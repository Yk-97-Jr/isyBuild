'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

import CardContent from '@mui/material/CardContent'

import type { UseFormRegister, FieldError } from 'react-hook-form'

// Components Imports
import { Divider, Switch, Typography } from '@mui/material'

import CustomTextField from '@core/components/mui/TextField'

import type { FormValidateStaffAddType } from './SchemaStaffAdd'

// Style Imports
import '@/libs/styles/tiptapEditor.css'

type SubcontractorInformationProps = {
  register: UseFormRegister<FormValidateStaffAddType> // Adjust the type as necessary
  errors: {
    first_name?: FieldError
    last_name?: FieldError
    email?: FieldError
    is_active?: FieldError
  }
}

const SubcontractorInfo: React.FC<SubcontractorInformationProps> = ({ register, errors }) => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              label='Nom'
              placeholder='Nom'
              {...register('first_name')}
              error={!!errors.first_name}
              helperText={errors.first_name?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              label='nom de famille'
              placeholder='nom de famille'
              {...register('last_name')}
              error={!!errors.last_name}
              helperText={errors.last_name?.message}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <CustomTextField
              fullWidth
              label='E-mail'
              placeholder='email@example.com'
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
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

export default SubcontractorInfo
