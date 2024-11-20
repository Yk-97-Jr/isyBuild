'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import type { UseFormRegister, FieldError } from 'react-hook-form'

import type { FormValidateCategoryEditType } from '@/views/apps/subcontractor/product/category-list/details/schemaCategory'

import CustomTextField from '@core/components/mui/TextField'

// Style Imports
import '@/libs/styles/tiptapEditor.css'

// Type imports for form handling

type CategoryInformationProps = {
  register: UseFormRegister<FormValidateCategoryEditType> // Adjust the type as necessary
  errors: {
    firstName?: FieldError
    description?: FieldError
  }
}

const CategoryEditInfo: React.FC<CategoryInformationProps> = ({ register, errors }) => {
  return (
    <Card>
      <CardHeader  />
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid item xs={12} sm={12}>
            <CustomTextField
              fullWidth
              label='Nom '
              variant='outlined'
              placeholder='Entrez la catégorie Nom'
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
              rows={5}
              placeholder='Entrez une description...'
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

export default CategoryEditInfo
