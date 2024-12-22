'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import type { UseFormRegister, FieldError } from 'react-hook-form'


import CustomTextField from '@core/components/mui/TextField'

// Style Imports
import '@/libs/styles/tiptapEditor.css'
import type { FormValidateLocationsEditType } from './schemaLocations'

// Type imports for form handling

type LocationInformationProps = {
  register: UseFormRegister<FormValidateLocationsEditType> // Adjust the type as necessary
  errors: {
    firstName?: FieldError
    description?: FieldError
  }
}

const LocationsEditInfo: React.FC<LocationInformationProps> = ({ register, errors }) => {
  return (
    <Card>
      <CardHeader title="Informations de l'emplacement" />
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid item xs={12} sm={12}>
            <CustomTextField
              fullWidth
              label='Nom'
              variant='outlined'
              placeholder='Entrez le nom'
              className='mbe-2'
              {...register('firstName')}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default LocationsEditInfo
