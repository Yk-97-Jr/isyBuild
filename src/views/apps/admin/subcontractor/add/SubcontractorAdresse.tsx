'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import type { UseFormRegister, FieldError } from 'react-hook-form'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

import type { FormValidateSubcontractorAddType } from './SchemaSubcontractorAdd'

// Style Imports
import '@/libs/styles/tiptapEditor.css'

type SubcontractorAdresseProps = {
  register: UseFormRegister<FormValidateSubcontractorAddType>
  errors: {
    address?: {
      country?: FieldError
      streetNumber?: FieldError
      streetName?: FieldError
      department?: FieldError
      city?: FieldError
      postal_code?: FieldError
    }
  }
}

const SubcontractorAdresse: React.FC<SubcontractorAdresseProps> = ({ register, errors }) => {
  return (
    <Card>
      <CardHeader title='Adresse' />
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              label='Pays/régions'
              placeholder='Algeria'
              {...register('address.country')} // Registering the field
              error={!!errors.address?.country}
              helperText={errors.address?.country?.message}
            />
          </Grid>
          <Grid item xs={4}>
            <CustomTextField
              fullWidth
              label='Numéro De Rue'
              placeholder='Numéro De Rue'
              {...register('address.streetNumber')}
              error={!!errors.address?.streetNumber}
              helperText={errors.address?.streetNumber?.message}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              label='Nom De Rue'
              placeholder='Nom De Rue'
              {...register('address.streetName')}
              error={!!errors.address?.streetName}
              helperText={errors.address?.streetName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              label='Departement'
              placeholder='Departement'
              {...register('address.department')}
              error={!!errors.address?.department}
              helperText={errors.address?.department?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              label='Ville'
              placeholder='Ville'
              {...register('address.city')}
              error={!!errors.address?.city}
              helperText={errors.address?.city?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              label='Code Postale'
              placeholder='Code Postale'
              {...register('address.postal_code')}
              error={!!errors.address?.postal_code}
              helperText={errors.address?.postal_code?.message}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default SubcontractorAdresse
