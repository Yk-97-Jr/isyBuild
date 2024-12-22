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

const CategoryInfo = ({ register, errors }: { register: any; errors: any }) => {
  return (
    <Card>
      <CardHeader title='' />
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid item xs={12} sm={12}>
            <CustomTextField
              fullWidth
              label='Nom '
              variant='outlined'
              placeholder='Entrez le Nom de la catégorie'
              className='mbe-2'
              {...register('firstName')}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <CustomTextField
              fullWidth
              label='description'
              variant='outlined'
              multiline
              rows={3}
              placeholder='Entrez la description de la catégorie...'
              id='textarea-outlined'
               className='mbe-2'
              {...register('description')}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CategoryInfo
