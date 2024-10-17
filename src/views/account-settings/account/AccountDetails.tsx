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
  useUserUpdatePartialUpdateMutation,
  useUserUpdateAvatarCreateMutation // Import the avatar mutation
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

  // Mutation for updating user avatar
  const [updateAvatar, {isLoading: isUpdatingAvatar}] = useUserUpdateAvatarCreateMutation()

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
  const [fileInput, setFileInput] = useState<File>()
  const [imgSrc, setImgSrc] = useState<string>()
  const {setOpenSnackBar, setInfoAlert} = useContext(SnackBarContext) as SnackBarContextType

  const {setUser} = useAuth(); // Get setUser from AuthContext

  // Load the data into form state when available
  useEffect(() => {
    if (data) {
      setValue('firstName', data.first_name || '')
      setValue('lastName', data.last_name || '')
      setValue('email', data.email || '')
      setImgSrc(data.avatar || '/images/avatars/1.png') // data.profile_image ||
    }
  }, [data, setValue])

  // Handle profile image change
  const handleFileInputChange = (file: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = file.target;

    if (files && files.length !== 0) {

      const selectedFile = files[0]; // Store the file object directly

      // Display the image preview if needed
      const reader = new FileReader();

      reader.onload = () => {
        const fileDataUrl = reader.result as string;

        setImgSrc(fileDataUrl); // Set the image source for preview
      };

      reader.readAsDataURL(selectedFile); // Generate the preview

      // Save the file object in state for later submission
      setFileInput(selectedFile);
    }
  };


  // Reset the profile image to default
  const handleFileInputReset = () => {
    // setFileInput()
    setImgSrc('/images/avatars/1.png')
  }

  // Handle form submission
  const onSubmit = async (formData: Data) => {
    try {
      // Update user details
      const updatedUser = await updateUser({
        patchedUserProfileUpdateRequest: {
          first_name: formData.firstName,
          last_name: formData.lastName

          // email: formData.email
        }
      }).unwrap();


      // Update avatar if a new image was uploaded
      // Check if a new file was uploaded
      if (fileInput) {
        // Create a FormData object to hold the avatar file
        const formDataToSend = new FormData();

        formDataToSend.append('avatar', fileInput); // Append the file directly

        // Now send the FormData ( need to disable eslint here cause we have a picutre to pass ( surpass the eslint error )
        await updateAvatar({
          // @ts-expect-error
          avatarUpdateRequest: formDataToSend // Pass the FormData
        }).unwrap();
      }


      // Update cookies and context with updated data
      Cookies.set('user', JSON.stringify(updatedUser));
      setUser(updatedUser);

      setOpenSnackBar(true);
      setInfoAlert({severity: 'success', message: 'User updated successfully'});
    } catch (error) {
      setOpenSnackBar(true);
      setInfoAlert({severity: 'error', message: 'Failed to update user'});
      console.error('Failed to update user:', error);
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
              <Button variant='contained' type='submit' disabled={isUpdating || isUpdatingAvatar}>
                {isUpdating || isUpdatingAvatar ? <CircularProgress sx={{color: 'white'}} size={24}/> : 'Save Changes'}
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

export default AccountDetails;
