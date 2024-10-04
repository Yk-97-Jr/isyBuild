'use client'

import React from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'

import Card from '@mui/material/Card'

import CardHeader from '@mui/material/CardHeader'

import CardContent from '@mui/material/CardContent'

import Select from '@mui/material/Select'

import type { SelectChangeEvent } from '@mui/material/Select'

import { CircularProgress, FormHelperText } from '@mui/material'

import MenuItem from '@mui/material/MenuItem'

// Components Imports

import CustomTextField from '@core/components/mui/TextField'

// Style Imports

import '@/libs/styles/tiptapEditor.css'
import type { ProjectRead } from '@/services/IsyBuildApi'

interface addressProps {
  projectState: ProjectRead
  setProjectState: (value: ProjectRead) => void
  isLoading: boolean
  errors: any
}


const EditAddress = ({ projectState, errors, setProjectState, isLoading }: addressProps) => {

  if (isLoading || !projectState || !projectState.client || !projectState.client.address) {

    return (
      <div className='flex justify-center items-center'>
        <CircularProgress />
      </div>

    )
  }

  //Functions to handle Feilds

  function handleCountry(event: SelectChangeEvent) {

    const country = event.target.value

    setProjectState({
      ...projectState,
      client: {
        ...projectState.client,
        address: {
          ...projectState.client.address,
          country
        }
      }
    })

    console.log(projectState.client.address.country)
  }

  function handleRoadNumber(event: React.ChangeEvent<HTMLInputElement>) {

    event.preventDefault()

    const roadNumber = event.target.value

    setProjectState({
      ...projectState,
      client: {
        ...projectState.client,
        address: {
          ...projectState.client.address,
          street_number: roadNumber
        }
      }
    })

  }

  function handleRoadName(event: React.ChangeEvent<HTMLInputElement>) {

    event.preventDefault()

    const roadName = event.target.value

    setProjectState({
      ...projectState,
      client: {
        ...projectState.client,
        address: {
          ...projectState.client.address,
          street_name: roadName
        }
      }
    })

  }

  function handleDepartement(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault()

    const departement = event.target.value


    setProjectState({
      ...projectState,
      client: {
        ...projectState.client,
        address: {
          ...projectState.client.address,
          street_name: departement
        }
      }
    })

  }

  function handleVille(event: React.ChangeEvent<HTMLInputElement>) {


    event.preventDefault()
    const city = event.target.value

    setProjectState({
      ...projectState,
      client: {
        ...projectState.client,
        address: {
          ...projectState.client.address,
          city: city
        }
      }
    })

  }

  function handleCodePostal(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault()

    const postal_code = event.target.value

    setProjectState({
      ...projectState,
      client: {
        ...projectState.client,
        address: {
          ...projectState.client.address,
          postal_code: postal_code
        }
      }
    }
  )




  }

  return (
    <Card>
      <CardHeader title='Address ' />
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid item xs={12}>
            <Select
              value={projectState.client.address.country || ''}
              onChange={handleCountry}
              className='w-full'
              displayEmpty
              error={!!errors.pays}
            >
              <MenuItem value='' disabled>
                Select a country
              </MenuItem>
              <MenuItem value='FR'>France</MenuItem>
              <MenuItem value='DZ'>Algeria</MenuItem>
            </Select>
            {errors && <FormHelperText className='text-red-500'>{errors.pays}</FormHelperText>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              value={projectState?.client.address.street_number || ''}
              label='Numero de Rue'
              placeholder='Numero de Rue'
              onChange={handleRoadNumber}
              error={!!errors.roadNumber}
              helperText={errors.roadNumber}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              label='Nom de Rue'
              placeholder='Nom de Rue'
              value={projectState?.client.address.street_name || ''}
              error={!!errors.roadName}
              helperText={errors.roadName}
              onChange={handleRoadName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              label='Departement'
              placeholder='Departement'
              value={projectState?.client.address.department || ''}
              onChange={handleDepartement}
              error={!!errors.departement}
              helperText={errors.departement}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              label='Ville'
              placeholder='Ville'
              value={projectState?.client.address.city || ''}
              onChange={handleVille}
              error={!!errors.ville}
              helperText={errors.ville}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              value={projectState.client.address.postal_code}
              label='Code Postal'
              placeholder='Code Postal'
              type='number'
              onChange={handleCodePostal}
              error={!!errors.codePostal}
              helperText={errors.codePostal}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default EditAddress
