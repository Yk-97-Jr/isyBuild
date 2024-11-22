'use client'

import React from 'react'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import type { UseFormRegister, FieldError } from 'react-hook-form'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

import type { FormValidateProductEditType } from './schemaProductEdit'

// Style Imports
import '@/libs/styles/tiptapEditor.css'

type ProductEditInfoProps = {
  register: UseFormRegister<FormValidateProductEditType>
  errors: {
    productName?: FieldError
    description?: FieldError
    technicalSheet?: FieldError
    category?: FieldError
  }
}

const ProductEditInfo: React.FC<ProductEditInfoProps> = ({ register, errors }) => {
  return (
    <Card>
      <CardHeader title="Modifier les informations du produit" />
      <CardContent>
        <Grid container spacing={6} className="mbe-6">
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              label="produit nom"
              placeholder="votre produit nom"
              {...register('productName')} // Registering the field
              error={!!errors.productName}
              helperText={errors.productName?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              label="URL"
              placeholder="Donnez l'URL"
              {...register('technicalSheet')} // Registering the field
              error={!!errors.technicalSheet}
              helperText={errors.technicalSheet?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              label="description"
              variant="outlined"
              multiline
              rows={3}
              placeholder="Entrez la description de la produit..."
              className="mbe-2"
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

export default ProductEditInfo
