'use client'

import React, { useContext } from 'react'

import {useParams, useRouter} from "next/navigation";

import { yupResolver } from '@hookform/resolvers/yup'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import Grid from '@mui/material/Grid'

import {useAuth} from "@/contexts/AuthContext";


import DocDiffInfo from './DocDiffInfo'
import { useDocumentDiffusionCreateMutation, useProjectsLotsRetrieveQuery } from '@/services/IsyBuildApi'
import { SnackBarContext } from '@/contexts/SnackBarContextProvider'
import type { SnackBarContextType } from '@/types/apps/snackbarType'
import type { FormValidateDocDiffAddType } from './schemaDocDiffAdd'
import { schemaDocDiffAdd } from './schemaDocDiffAdd'

import DocDiffLocation from './DocDiffLocation'
import DocDiffHeader from './DocDiffHeader' 

const DocDiffAdd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValidateDocDiffAddType>({
    resolver: yupResolver(schemaDocDiffAdd)
  })

  const {edit} = useParams()

  const {data:projectLots} = useProjectsLotsRetrieveQuery({
    projectId:+72,
  })

  console.log(edit);
  

  const [createDocDiff, { isLoading }] = useDocumentDiffusionCreateMutation()
  const { setOpenSnackBar, setInfoAlert } = useContext(SnackBarContext) as SnackBarContextType

  const router = useRouter();
  const {user} = useAuth();  // Get the user from AuthContext
  const userRole = user?.role

  console.log(projectLots?.results);
  

  const onSubmit: SubmitHandler<FormValidateDocDiffAddType> = async data => {
    try {
        
        const response = await createDocDiff({
            documentDiffusionCreateRequest: {
                title:data.title,
                localisation:data.localisation,
                phase:data.phase,
                type:data.type,
                project_lot:data.project_lot
                
            }
        }).unwrap()
        
        console.log(data)
      setOpenSnackBar(true)
      setInfoAlert({ severity: 'success', message: 'entreprise ajouté avec succès' })

      const clientId = response.id;

      
      
      router.push(`/${userRole}/projects/${edit}/details/documentDiffusions/${clientId}/details`);
      
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
          <DocDiffHeader onSubmit={handleSubmit(onSubmit)} isLoading={isLoading} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <DocDiffInfo register={register} errors={errors} projectLots={projectLots?.results} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
             <DocDiffLocation register={register} errors={errors} /> 
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export default DocDiffAdd
