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

const AdresseCompany = () => {
  return (
    <Card>
      <CardHeader title='Adresse' />
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid item xs={12} sm={16}>
            <CustomTextField fullWidth label='Pays/région' placeholder='Algeria' />
          </Grid>

          <Grid item xs={12} sm={4}>
            <CustomTextField fullWidth label='Numéro De Rue' placeholder='Adresse' />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField fullWidth label='Nom De Rue' placeholder='nom de rue' />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField fullWidth label='Département' placeholder='département' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField fullWidth label='Ville' placeholder='Ville' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField fullWidth label='Code Postal' placeholder='Code Postal' />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AdresseCompany
