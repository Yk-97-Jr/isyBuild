'use client'

// React Imports
import React, {useState, useEffect, useContext} from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Box from "@mui/material/Box";


// React Hook Form & Yup
import {useForm} from 'react-hook-form'
import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

import Cookies from "js-cookie";

import {
  useUserProfileRetrieveQuery,
  useUserUpdatePartialUpdateMutation
} from '@/services/IsyBuildApi'
import CustomTextField from '@core/components/mui/TextField'
import {SnackBarContext} from "@/contexts/SnackBarContextProvider";
import type {SnackBarContextType} from "@/types/apps/snackbarType";


import {useAuth} from "@/contexts/AuthContext";

// Validation Schema using Yup
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Email is invalid').required('Email is required')
})

// Define the initial structure for form data
type Data = {
  firstName: string
  lastName: string
  email: string
}

const AccountDetails = () => {
  // Fetch users profile data using RTK query hook
  const {data, error, isLoading} = useUserProfileRetrieveQuery()

  // Mutation for updating users data
  const [updateUser, {isLoading: isUpdating}] = useUserUpdatePartialUpdateMutation()

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors}
  } = useForm<Data>({
    resolver: yupResolver(validationSchema)
  })

  // State for profile image
  const [fileInput, setFileInput] = useState<string>('')
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')
  const {setOpenSnackBar, setInfoAlert} = useContext(SnackBarContext) as SnackBarContextType

  const {setUser} = useAuth(); // Get setUser from AuthContext


  // Load the data into form state when available
  useEffect(() => {
    if (data) {
      setValue('firstName', data.first_name || '')
      setValue('lastName', data.last_name || '')
      setValue('email', data.email || '')
      setImgSrc('/images/avatars/1.png') // data.profile_image ||
    }
  }, [data, setValue])

  // temporary for typing prb until we add it to users
  console.log(fileInput)


  // Handle profile image change
  const handleFileInputChange = (file: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    const {files} = file.target

    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)
      reader.readAsDataURL(files[0])

      if (reader.result !== null) {
        setFileInput(reader.result as string)
      }
    }
  }

  // Reset the profile image to default
  const handleFileInputReset = () => {
    setFileInput('')
    setImgSrc('/images/avatars/1.png')
  }

  // Handle form submission
  // Handle form submission
  const onSubmit = async (formData: Data) => {
    try {
      // Unwrap the result of the mutation to get the actual response
      const updatedUser = await updateUser({
        patchedUserProfileUpdate: {
          first_name: formData.firstName,
          last_name: formData.lastName,

          // email: formData.email,
          // profile_image: fileInput // Include profile image if updated
        }
      }).unwrap();

      // set the updated data in cookies
      Cookies.set('user', JSON.stringify(updatedUser));

      // Set the user data in context
      setUser(updatedUser);

      setOpenSnackBar(true);
      setInfoAlert({severity: 'success', message: 'User updated successfully'});
    } catch (error) {
      setOpenSnackBar(true);
      setInfoAlert({severity: 'error', message: 'Failed to update users'});
      console.error('Failed to update users:', error);
    }
  };


  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress/>
      </Box>
    )
  }

  if (error) {
    return <Typography color='error'>Failed to load profile data</Typography>
  }

  return (
    <Card>
      <CardContent className='mbe-4'>
        <div className='flex max-sm:flex-col items-center gap-6'>
          {/* Display profile image */}
          <img height={100} width={100} className='rounded' src={imgSrc} alt='Profile'/>
          <div className='flex flex-grow flex-col gap-4'>
            <div className='flex flex-col sm:flex-row gap-4'>
              {/* Upload new photo button */}
              <Button component='label' variant='contained' htmlFor='account-settings-upload-image'>
                Upload New Photo
                <input
                  hidden
                  type='file'
                  accept='image/png, image/jpeg'
                  onChange={handleFileInputChange}
                  id='account-settings-upload-image'
                />
              </Button>
              {/* Reset profile image button */}
              <Button variant='tonal' color='secondary' onClick={handleFileInputReset}>
                Reset
              </Button>
            </div>
            <Typography>Allowed JPG, GIF or PNG. Max size of 800K</Typography>
          </div>
        </div>
      </CardContent>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='First Name'
                {...register('firstName')}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Last Name'
                {...register('lastName')}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>
            <Grid item xs={12} className='flex gap-4 flex-wrap'>
              <Button variant='contained' type='submit' disabled={isUpdating}>
                {isUpdating ? <CircularProgress sx={{color: 'white'}} size={24}/> : 'Save Changes'}
              </Button>
              <Button
                variant='tonal'
                type='reset'
                color='secondary'
                onClick={() => {
                  setValue('firstName', data?.first_name || '');
                  setValue('lastName', data?.last_name || '');
                  setValue('email', data?.email || '');

                  // setImgSrc(data?.profile_image || '/images/avatars/1.png');
                }}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default AccountDetails
