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

const AdresseCompany = ({ register, errors }: { register: any; errors: any }) => {
  /*  address: {
            street_number: data.address.street_number,
            street_name: data.address.street_name,
            postal_code: data.address.postal_code,
            city: data.address.city
          }, */

  return (
    <Card>
      <CardHeader title='Adresse ' />
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid item xs={12} sm={16}>
            <CustomTextField
              fullWidth
              label='Pays/région'
              placeholder='Algeria'
              {...register('address.country')}
              error={!!errors.address?.country}
              helperText={errors.address?.country?.message}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              label='numéro de rue'
              placeholder='Adresse'
              {...register('address.street_number')}
              error={!!errors.address?.street_number}
              helperText={errors.address?.street_number?.message}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              label='Nom De Rue'
              placeholder='Nom De Rue'
              {...register('address.street_name')}
              error={!!errors.address?.street_name}
              helperText={errors.address?.street_name?.message}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              fullWidth
              label='Département'
              placeholder='Département'
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
              label='Code Postal'
              placeholder='Code Postal'
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

export default AdresseCompany
