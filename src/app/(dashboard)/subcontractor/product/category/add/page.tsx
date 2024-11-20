'use client'

import { useContext } from 'react'

import { useRouter } from 'next/navigation'

import Grid from '@mui/material/Grid'

import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'

import { useForm, type SubmitHandler } from 'react-hook-form'

import { useAuth } from '@/contexts/AuthContext'

import AddCategoryHeader from '@/views/apps/subcontractor/product/category-list/add/AddCategoryHeader'


import CategoryInfo from '@/views/apps/subcontractor/product/category-list/add/Categoryinfo'
import { SnackBarContext } from '@/contexts/SnackBarContextProvider'
import type { SnackBarContextType } from '@/types/apps/snackbarType'
import { useCategoryCreateMutation } from '@/services/IsyBuildApi'

const schema = yup
  .object({
    firstName: yup.string().required('First Name is required'),
    description: yup.string().notRequired()
  })
  .required()

type FormValidateType = yup.InferType<typeof schema>

const CategoryAddPage = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValidateType>({
    resolver: yupResolver(schema)
  })

  const [createCategory, { isLoading }] = useCategoryCreateMutation()
  const { setOpenSnackBar, setInfoAlert } = useContext(SnackBarContext) as SnackBarContextType
  const router = useRouter();
  const {user} = useAuth();  // Get the user from AuthContext
  const userRole = user?.role

  const onSubmit: SubmitHandler<FormValidateType> = async data => {
    try {
      const response = await createCategory({
        categoryRequest: {
          name: data.firstName,
          description: data.description
        }
      }).unwrap()

      setOpenSnackBar(true)
      setInfoAlert({ severity: 'success', message: 'catégorie  ajouté avec succès' })
      
      const clientId = response.id;

      router.push(`/${userRole}/product/category/${clientId}/details`);

      reset()
    } catch (err: any) {
      // Vérifiez si l'erreur a un statut et est une erreur 400
      if (err.status === 400) {
        setOpenSnackBar(true)
        setInfoAlert({ severity: 'error', message: "Requête incorrecte : Données d'entrée invalides" })
      } else {
        setOpenSnackBar(true)
        setInfoAlert({ severity: 'error', message: 'La création de  catégorie a échoué' })
      }

      // handleClose();
    }
  }

  return (
    <Grid container spacing={6} md={22}>
      <Grid item xs={12}>
        <AddCategoryHeader onSubmit={handleSubmit(onSubmit)} isLoading={isLoading} />
      </Grid>
      <Grid item xs={12} md={22}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <CategoryInfo register={register} errors={errors} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CategoryAddPage
