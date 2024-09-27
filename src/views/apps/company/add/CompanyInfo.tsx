'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

// Style Imports
import '@/libs/styles/tiptapEditor.css'



const CompanyInfo = ({ register, errors }: { register: any; errors: any }) => {
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
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              label='Numéro de Siren'
              placeholder='numéro de siren'
              {...register('siren_number')}
              error={!!errors.siren_number}
              helperText={errors.siren_number?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              label='E-mail'
              placeholder='email@example.com'
              {...register('contact_email')}
              error={!!errors.contact_email}
              helperText={errors.contact_email?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              label='Téléphone'
              placeholder='Téléphone'
              {...register('phone_number')}
              error={!!errors.phone_number}
              helperText={errors.phone_number?.message}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CompanyInfo
