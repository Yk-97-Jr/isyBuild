'use client'

import Link from 'next/link'

import type {SubmitHandler} from 'react-hook-form';
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import classnames from 'classnames'

// Import your RTK Query mutation
import {usePasswordResetCreateMutation} from '@/services/IsyBuildApi'

// Custom Components
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

// import { useImageVariant } from '@core/hooks/useImageVariant'
import {useSettings} from '@core/hooks/useSettings'

// Styled Components
// const ForgotPasswordIllustration = styled('img')(({ theme }) => ({
//   zIndex: 2,
//   blockSize: 'auto',
//   maxBlockSize: 650,
//   maxInlineSize: '100%',
//   margin: theme.spacing(12),
//   [theme.breakpoints.down(1536)]: {
//     maxBlockSize: 550
//   },
//   [theme.breakpoints.down('lg')]: {
//     maxBlockSize: 450
//   }
// }))
//
// const MaskImg = styled('img')({
//   blockSize: 'auto',
//   maxBlockSize: 355,
//   inlineSize: '100%',
//   position: 'absolute',
//   insetBlockEnd: 0,
//   zIndex: -1
// })

// Define validation schema with Yup
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required')
})

// Define form input types
type FormValues = {
  email: string
}

const ForgotPassword = ({mode}: { mode: string }) => {
  // Hooks for various states and utilities
  const {settings} = useSettings()

  console.log(mode)

  // const theme = useTheme()

  // const hidden = useMediaQuery(theme.breakpoints.down('md'))
  // const authBackground = useImageVariant(mode, '/images/pages/auth-mask-light.png', '/images/pages/auth-mask-dark.png')

  // const characterIllustration = useImageVariant(
  //   mode,
  //   '/images/illustrations/auth/v2-forgot-password-light.png',
  //   '/images/illustrations/auth/v2-forgot-password-dark.png'
  // )

  // Initialize form with react-hook-form and Yup schema
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema)
  })

  // RTK Query hook for password reset mutation
  const [passwordReset, {isLoading, isSuccess, isError, error}] = usePasswordResetCreateMutation()

  // Form submission handler
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || ""

    try {
      await passwordReset({
        passwordResetRequestRequest: {
          email: data.email,
          redirect_uri: {appUrl} + '/reset-password',
        }
      }).unwrap()
    } catch (err) {
      console.error('Password reset failed:', err)
    }
  }

  return (
    <div className='flex bs-full justify-center'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100vh] relative p-6 max-md:hidden',
          {'border-ie': settings.skin === 'bordered'}
        )}
      >
        {/*<ForgotPasswordIllustration src={characterIllustration} alt='character-illustration' />*/}
        {/*{!hidden && <MaskImg alt='mask' src={authBackground} />}*/}
      </div>
      <div
        className='flex justify-center items-center bs-full bg-backgroundPaper p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <Link href='/login' className='absolute block-start-5 inline-start-6'>
          <Logo/>
        </Link>
        <div className='flex flex-col gap-6 is-full sm:max-is-[400px]'>
          <div className='flex flex-col gap-1'>
            <Typography variant='h4'>Forgot Password 🔒</Typography>
            <Typography>Enter your email and we&#39;ll send you instructions to reset your password</Typography>
          </div>

          {/* Form */}
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
            <CustomTextField
              autoFocus
              fullWidth
              label='Email'
              placeholder='Enter your email'
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register('email')}
            />

            {/* Submit Button */}
            <Button
              fullWidth
              variant='contained'
              type='submit'
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} color='inherit'/> : null}
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </Button>

            {/* Back to login link */}
            <Typography className='flex justify-center items-center' color='primary'>
              <Link href='/login'>
                <span>Back to login</span>
              </Link>
            </Typography>

            {/* Error Message */}
            {isError && (
              <Typography color='error'>
                {(error as any)?.data?.message || 'An error occurred while sending the reset link.'}
              </Typography>
            )}

            {/* Success Message */}
            {isSuccess && <Typography color='success'>A password reset link has been sent to your email.</Typography>}
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
