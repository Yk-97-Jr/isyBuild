'use client'

import { useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'

import Card from '@mui/material/Card'

import CardHeader from '@mui/material/CardHeader'

import CardContent from '@mui/material/CardContent'

import Select from '@mui/material/Select'

import type { SelectChangeEvent } from '@mui/material/Select'

import { FormHelperText, InputLabel } from '@mui/material'

import MenuItem from '@mui/material/MenuItem'

// Components Imports

import CustomTextField from '@core/components/mui/TextField'

// Style Imports

import '@/libs/styles/tiptapEditor.css'

interface EditAddressProps {
  projectState: any
  setProjectState: any
  errors: Record<string, string>
}

const EditAddress = ({ projectState, setProjectState, errors }: EditAddressProps) => {
  useEffect(() => {
    if (!projectState) {
      return
    }
  }, [projectState])

  if (!projectState) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }

  console.log(projectState)

  const handleDepartement = (event: any) => {
    const value = event.target.value

    setProjectState((prevState: any) => ({
      ...prevState,
      client: {
        // Ensure you're updating the correct path
        ...prevState.client,
        address: {
          ...prevState.client.address,
          department: value
        }
      }
    }))
    console.log('Department:', value)
  }

  const handleVille = (event: any) => {
    const value = event.target.value

    setProjectState((prevState: any) => ({
      ...prevState,
      client: {
        // Ensure you're updating the correct path
        ...prevState.client,
        address: {
          ...prevState.client.address,
          city: value
        }
      }
    }))
    console.log('Ville:', value)
  }
  const handleCodePostal = (event: any) => {
    const value = event.target.value

    setProjectState((prevState: any) => ({
      ...prevState,
      client: {
        ...prevState.client,
        address: {
          ...prevState.client.address,
          postal_code: value // Ensure this is correctly updating the state
        }
      }
    }))
    console.log('Code Postal:', value)
  }

  const handlePays = (event: SelectChangeEvent) => {
    event.preventDefault()

    const value = event.target.value

    setProjectState((prevState: any) => ({
      ...prevState,
      address: {
        ...prevState.address,
        country: value
      }
    }))
    console.log('Pays:', value)
  }

  const handleRoadNumber = (event: any) => {
    event.preventDefault()

    const value = event.target.value

    setProjectState((prevState: any) => ({
      ...prevState,
      address: {
        ...prevState.address,
        street_number: value
      }
    }))
    console.log('Road Number:', value)
  }

  const handleRoadName = (event: any) => {
    const value = event.target.value

    setProjectState((prevState: any) => ({
      ...prevState,
      address: {
        ...prevState.address,
        street_name: value
      }
    }))
    console.log('Road Name:', value)
  }

  // console.log(roadNumber)

  return (
    <Card>
      <CardHeader title='Address ' />
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid item xs={12}>
            <InputLabel className='py-1'>Pays/country</InputLabel>
            <Select
              value={projectState.address?.country || ''}
              onChange={handlePays}
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
              value={projectState.address?.street_number || ''}
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
              value={projectState.address?.street_name || ''}
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
              // value={projectState?.client.address.department || ''}
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
              value={projectState.client.address.city || ''}
              onChange={handleVille}
              error={!!errors.ville}
              helperText={errors.ville}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              value={projectState.client.address.postal_code || ''}
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
