'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import CustomTextField from '@core/components/mui/TextField'

// Style Imports
import '@/libs/styles/tiptapEditor.css'

const ClientAdresse = () => {


  return (
    <Card>
      <CardHeader title='Adresse'/>
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid item xs={12}>
            <CustomTextField fullWidth label='Pays/régions' placeholder='Algeria'/>
          </Grid>
          <Grid item xs={4}>
            <CustomTextField fullWidth label='Numéro De Rue' placeholder='Numéro De Rue'/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField fullWidth label='Nom De Rue' placeholder='Nom De Rue'/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField fullWidth label='Departement' placeholder='Departement'/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField fullWidth label='Ville' placeholder='Ville'/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField fullWidth label='Code Postale' placeholder='Code Postale'/>
          </Grid>
        </Grid>

      </CardContent>
    </Card>
  )
}

export default ClientAdresse
