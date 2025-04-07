'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import type { UseFormRegister, FieldError } from 'react-hook-form'

import type { FormValidateSubcontractorEditType } from '@/views/apps/client/subcontractor/details/schemaSubcontractorEdit'

import CustomTextField from '@core/components/mui/TextField'

// Type imports for form handling

type SubcontractorInformationProps = {
  register: UseFormRegister<FormValidateSubcontractorEditType> // Adjust the type as necessary
  errors: {
    subcontractorName?: FieldError
    sireneNumber?: FieldError
    email?: FieldError
    phoneNumber?: FieldError
  }
}

const SubcontractorInformation: React.FC<SubcontractorInformationProps> = ({ register, errors }) => {
  return (
    <Card>
      <CardHeader title='Entreprise' />
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              label='Nom'
              placeholder='Nom'
              {...register('subcontractorName')}
              error={!!errors.subcontractorName}
              helperText={errors.subcontractorName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              label='Numéro de Siren'
              placeholder='numéro de siren'
              {...register('sireneNumber')}
              error={!!errors.sireneNumber}
              helperText={errors.sireneNumber?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              label='E-mail'
              placeholder='email@example.com'
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              label='Téléphone'
              placeholder='Téléphone'
              {...register('phoneNumber')}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default SubcontractorInformation
