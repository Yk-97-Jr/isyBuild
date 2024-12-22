'use client' // Keep this label at the top

import React, { useContext, useEffect } from 'react'

import { useParams  } from 'next/navigation'



import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Box from '@mui/material/Box'

import Grid from '@mui/material/Grid'
import { CircularProgress } from '@mui/material'



import CategoryCreatedBy from './CategoryCreatedBy'
import CategoryEditInfo from '@/views/apps/admin/product/category-list/details/CategoryEditInfo'
import CategoryEditHeader from '@/views/apps/admin/product/category-list/details/CategoryEditHeader'


import type { FormValidateCategoryEditType } from '@/views/apps/admin/product/category-list/details/schemaCategory'
import type { SnackBarContextType } from '@/types/apps/snackbarType'

import { SnackBarContext } from '@/contexts/SnackBarContextProvider'

import { schemaCategoryEdit } from '@/views/apps/admin/product/category-list/details/schemaCategory'

import { useCategoriesRetrieveQuery, useCategoryUpdateMutation } from '@/services/IsyBuildApi'

const CategoryEdit = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormValidateCategoryEditType>({
    resolver: yupResolver(schemaCategoryEdit)
  })

  const { id } = useParams()

  

  const { data: categoryData, isLoading: isLoadingQuery } = useCategoriesRetrieveQuery({
    categoryId: +id
  })

  const [updateCategory, { isLoading: isUpdating }] = useCategoryUpdateMutation()

  const { setOpenSnackBar, setInfoAlert } = useContext(SnackBarContext) as SnackBarContextType
 

  useEffect(() => {
    if (categoryData) {
      setValue('firstName', categoryData.name)
      setValue('description', categoryData.description || '')
    }
  }, [categoryData, setValue])

  const onSubmit: SubmitHandler<FormValidateCategoryEditType> = async data => {
    try {
      await updateCategory({
        categoryId: +id,
        categoryRequest: {
          name: data.firstName,
          description: data.description
        }
      }).unwrap()

      setOpenSnackBar(true)
      setInfoAlert({ severity: 'success', message: 'Catégorie modifié avec succès' })
      

      

    } catch (err: any) {
      console.error('Failed to update Catégorie:', err)
      setOpenSnackBar(true)
      setInfoAlert({
        severity: 'error',
        message: err.response || 'Échec de la modification du Catégorie'
      })
    }
  }

  if (isLoadingQuery)
    return (
      <Box display='flex' justifyContent='center' alignItems='flex-start' height='100vh'>
        <CircularProgress />
      </Box>
    )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CategoryEditHeader onSubmit={handleSubmit(onSubmit)} isLoading={isUpdating}  />
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <CategoryEditInfo register={register} errors={errors} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <CategoryCreatedBy categoryData={categoryData} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export default CategoryEdit
