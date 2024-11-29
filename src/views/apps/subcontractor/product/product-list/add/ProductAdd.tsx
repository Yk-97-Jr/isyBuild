'use client'

import React, { useContext } from 'react'

import {useRouter} from "next/navigation";

import { yupResolver } from '@hookform/resolvers/yup'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import Grid from '@mui/material/Grid'

import {useAuth} from "@/contexts/AuthContext";


import ProductAddHeader from './ProductAddHeader'


/* import AddLotToCompany from '@/views/apps/admin/Product/add/AddLotToCompany' */

import ProductInfo from './ProductInfo'
import { useProductCreateMutation } from '@/services/IsyBuildApi'
import { SnackBarContext } from '@/contexts/SnackBarContextProvider'
import type { SnackBarContextType } from '@/types/apps/snackbarType'
import type { FormValidateProductAddType } from './schemaProductAdd'
import { schemaProductAdd } from './schemaProductAdd'
import ProductStatus from './ProductStatus'

const ProductAdd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValidateProductAddType>({
    resolver: yupResolver(schemaProductAdd)
  })

  const [createProduct, { isLoading }] = useProductCreateMutation()
  const { setOpenSnackBar, setInfoAlert } = useContext(SnackBarContext) as SnackBarContextType

  const router = useRouter();
  const {user} = useAuth();  // Get the user from AuthContext
  const userRole = user?.role

  const onSubmit: SubmitHandler<FormValidateProductAddType> = async data => {
    try {
      console.log(data.category)

      const response = await createProduct({
        productRequest: {
          name: data.productName,
          description:data.description,
          category:data.category,
          technical_sheet:data.technicalSheet
        }
          
          
      }).unwrap()

      setOpenSnackBar(true)
      setInfoAlert({ severity: 'success', message: 'entreprise ajouté avec succès' })

      const clientId = response.id;

      router.push(`/${userRole}/product/${clientId}/details`);

    } catch (err: any) {
      console.error('Failed to add entreprise:', err)
      setOpenSnackBar(true)
      setInfoAlert({
        severity: 'error',
        message: err.response?.data?.message || 'Échec de la création de entreprise'
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <ProductAddHeader onSubmit={handleSubmit(onSubmit)} isLoading={isLoading} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <ProductInfo register={register} errors={errors} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <ProductStatus register={register}  />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export default ProductAdd
