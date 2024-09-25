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

const CompanyInfo = () => {
  return (
    <Card>
      <CardHeader title='Entreprise' />
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid item xs={12} sm={6}>
            <CustomTextField fullWidth label='Nom' placeholder='Nom' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField fullWidth label='numéro de sirène' placeholder='numéro de sirène' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField fullWidth label='E-mail' placeholder='email@example.com' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField fullWidth label='Téléphone' placeholder='Téléphone' />
          </Grid>
        </Grid>
      </CardContent>
    </Card>

  )
}

export default CompanyInfo
