'use client'

import React, { useEffect, useContext, useRef } from 'react'

import { useParams, useRouter } from 'next/navigation'

import { yupResolver } from '@hookform/resolvers/yup'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

import ProductEditHeader from './ProductEditHeader'
import ProductEditInfo from './ProductEditInfo'
import ProductStatus from './ProductStatus'
import ProductMediaGrid from './media/ProductMediaGrid'

import { SnackBarContext } from '@/contexts/SnackBarContextProvider'
import type { SnackBarContextType } from '@/types/apps/snackbarType'
import type { FormValidateProductEditType } from './schemaProductEdit'
import { schemaProductEdit } from './schemaProductEdit'

import { useProductDetailQuery, useProductUpdateMutation } from '@/services/IsyBuildApi'
import { useAuth } from '@/contexts/AuthContext'
import ProductImage from './Productmage'
import ProductCreatedBy from './ ProductCreatedBy'

const ProductUpdate = () => {
  const productMediaGridRef = useRef<any>();
  const { id } = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const userRole = user?.role

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormValidateProductEditType>({
    resolver: yupResolver(schemaProductEdit)
  })

  const { setOpenSnackBar, setInfoAlert } = useContext(SnackBarContext) as SnackBarContextType

  const { data: productData, refetch: refetchProduct, isLoading: isLoadingQuery } = useProductDetailQuery({ productId: +id })
  const [updateProduct, { isLoading: isUpdating }] = useProductUpdateMutation()

  const handleMediaUploadSuccess = (newMediaId: number) => {

    console.log(`Media uploaded successfully with ID: ${newMediaId}`);
    
    // Trigger the media grid update
    productMediaGridRef.current.handleMediaUpload(newMediaId);

    refetchProduct();
  };

 
  

  useEffect(() => {
    if (productData) {
      setValue('productName', productData.name ?? '')
      setValue('description', productData.description ?? '')
      setValue('technicalSheet', productData.technical_sheet ?? '')
      setValue('category', productData.category ?? '')
    }
  }, [productData, setValue])

  const onSubmit: SubmitHandler<FormValidateProductEditType> = async data => {
    try {
      await updateProduct({
        productId: +id,
        productRequest: {
          name: data.productName,
          description: data.description,
          category: data.category,
          technical_sheet: data.technicalSheet || null,
        }
      }).unwrap()

      setOpenSnackBar(true)
      setInfoAlert({ severity: 'success', message: 'Product updated successfully!' })
      router.push(`/${userRole}/product/${id}/details`)
    } catch (err: any) {
      console.error('Failed to update product:', err)
      setOpenSnackBar(true)
      setInfoAlert({
        severity: 'error',
        message: err.response?.data?.message || 'Failed to update product.'
      })
    }
  }
 

  if (isLoadingQuery)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <ProductEditHeader onSubmit={handleSubmit(onSubmit)} isLoading={isUpdating} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <ProductEditInfo register={register} errors={errors} />
            </Grid>
            <Grid item xs={12}>
            <ProductImage refetchProduct={refetchProduct}/>
          </Grid>
          <Grid item xs={12}>
          {productData?.media && (
                <ProductMediaGrid
                  media={productData.media}
                  refetchProduct={refetchProduct}
                  onMediaUploadSuccess={handleMediaUploadSuccess}
                />
              )}{/* Add media grid */}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <ProductStatus register={register} productData={productData}/>
            </Grid>
          </Grid>
          
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <ProductCreatedBy productData={productData} />
            </Grid>
          </Grid>
        </Grid>
        </Grid>
      
    </form>
  )
}

export default ProductUpdate
