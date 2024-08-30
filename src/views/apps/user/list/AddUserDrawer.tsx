

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Third-party Imports
import {useForm, Controller} from 'react-hook-form'

// API Imports

// Types Imports
import type {UsersType} from "@/types/apps/usersType"

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import {useAdminStaffCreateCreateMutation} from "@/services/IsyBuildApi";

type Props = {
  open: boolean
  handleClose: () => void
  userData?: UsersType[]
  setData: (data: UsersType[]) => void
}

type FormValidateType = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
}

const AddUserDrawer = (props: Props) => {
  // Props
  const {open, handleClose, userData, setData} = props

  // Hooks
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: {errors}
  } = useForm<FormValidateType>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: ''
    }
  })

  // Initialize mutation hook
  const [createUser, {isLoading, isError, error}] = useAdminStaffCreateCreateMutation()


  const onSubmit = async (data: FormValidateType) => {
    try {
      console.log(data) // Debugging line to see the form data

      // Ensure the data is wrapped as expected by the API
      const response = await createUser({
        adminStaffCreate: {
          user: {
            first_name: data.firstName, // API expects snake_case for these fields
            last_name: data.lastName,
            email: data.email,
            redirect_uri: "http://localhost:3001/users/list",
            contact: data.phoneNumber,
          }
        }
      }).unwrap()

      // Handle successful response
      setData([...(userData ?? []), response])
      handleClose()
      resetForm()
    } catch (err) {
      // Handle error if needed
      console.error('Failed to create user:', err)
    }
  }

  const handleReset = () => {
    handleClose()
    resetForm()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{keepMounted: true}}
      sx={{
        '& .MuiDrawer-paper': {
          width: {xs: 300, sm: 400} // Adjust width for responsiveness
        }
      }}
    >
      <div className='flex items-center justify-between pb-5 pl-6'>
        <Typography variant='h5'>Add New User</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-2xl text-textPrimary'/>
        </IconButton>
      </div>
      <Divider/>
      <div>
        <form onSubmit={handleSubmit(data => onSubmit(data))} className='flex flex-col gap-6 p-6'>
          <Controller
            name='firstName'
            control={control}
            rules={{required: true}}
            render={({field}) => (
              <CustomTextField
                {...field}
                fullWidth
                label='First Name'
                placeholder='John'
                {...(errors.firstName && {error: true, helperText: 'This field is required.'})}
              />
            )}
          />
          <Controller
            name='lastName'
            control={control}
            rules={{required: true}}
            render={({field}) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Last Name'
                placeholder='Doe'
                {...(errors.lastName && {error: true, helperText: 'This field is required.'})}
              />
            )}
          />
          <Controller
            name='email'
            control={control}
            rules={{required: true}}
            render={({field}) => (
              <CustomTextField
                {...field}
                fullWidth
                type='email'
                label='Email'
                placeholder='johndoe@gmail.com'
                {...(errors.email && {error: true, helperText: 'This field is required.'})}
              />
            )}
          />
          <Controller
            name='phoneNumber'
            control={control}
            rules={{required: true}}
            render={({field}) => (
              <CustomTextField
                {...field}
                fullWidth
                type='tel'
                label='Phone Number'
                placeholder='(123) 456-7890'
                {...(errors.phoneNumber && {error: true, helperText: 'This field is required.'})}
              />
            )}
          />
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit' disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit'}
            </Button>
            <Button variant='tonal' color='error' type='reset' onClick={handleReset}>
              Cancel
            </Button>
          </div>
          {isError && <Typography color='error'>Failed to create user: {error.message}</Typography>}
        </form>
      </div>
    </Drawer>
  )
}

export default AddUserDrawer
