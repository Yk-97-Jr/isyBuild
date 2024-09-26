'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import CustomTextField from '@core/components/mui/TextField'

// Style Imports
import '@/libs/styles/tiptapEditor.css'

const ClientInformation = () => {


  return (
    <Card>
      <CardHeader title='Information Client'/>
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid item xs={6}>
            <CustomTextField fullWidth label='Nome' placeholder='Nome'/>
          </Grid>
          <Grid item xs={6}>
            <CustomTextField fullWidth label='Numéro De Sirene' placeholder='Numéro De Sirene'/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField fullWidth label='E-mail' placeholder='email@example.com'/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField fullWidth label='Téléphone' placeholder='Téléphone'/>
          </Grid>
        </Grid>

      </CardContent>
    </Card>
  )
}

export default ClientInformation
