'use client'

// MUI Imports
import {useRouter} from 'next/navigation'

import useMediaQuery from '@mui/material/useMediaQuery'
import {styled, useTheme} from '@mui/material/styles'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'

// Type Imports
import type {SystemMode} from '@core/types'

// Hook Imports
import {useImageVariant} from '@core/hooks/useImageVariant'
import {useAuth} from "@/contexts/AuthContext";

// Styled Components
const MaskImg = styled('img')({
  blockSize: 'auto',
  maxBlockSize: 355,
  inlineSize: '100%',
  position: 'absolute',
  insetBlockEnd: 0,
  zIndex: -1
})

const NotFound = ({mode}: { mode: SystemMode }) => {
  // Vars
  const darkImg = '/images/pages/misc-mask-dark.png'
  const lightImg = '/images/pages/misc-mask-light.png'

  // Hooks
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const miscBackground = useImageVariant(mode, lightImg, darkImg)
  const router = useRouter() // Use Next.js useRouter hook for navigation
  const {user} = useAuth();  // Get the user from AuthContext
  const userRole = user?.role

  // Handle onClick event
  const handleOnClick = () => {
      router.push(`/${userRole}/dashboard`);
  }

  return (
    <div className='flex items-center justify-center min-bs-[100dvh] relative p-6 overflow-x-hidden'>
      <div className='flex items-center flex-col text-center'>
        <div className='flex flex-col gap-2 is-[90vw] sm:is-[unset] mbe-6'>
          <Typography className='font-medium text-8xl' color='text.primary'>
            404
          </Typography>
          <Typography variant='h4'>Page Not Found ⚠️</Typography>
          <Typography>we couldn&#39;t find the page you are looking for.</Typography>
        </div>
        <Button variant='contained' onClick={handleOnClick}>
          Back To Home
        </Button>
        <img
          alt='error-404-illustration'
          src='/images/illustrations/characters/1.png'
          className='object-cover bs-[400px] md:bs-[450px] lg:bs-[500px] mbs-10 md:mbs-14 lg:mbs-20'
        />
      </div>
      {!hidden && (
        <MaskImg
          alt='mask'
          src={miscBackground}
          className={classnames({'scale-x-[-1]': theme.direction === 'rtl'})}
        />
      )}
    </div>
  )
}

export default NotFound
