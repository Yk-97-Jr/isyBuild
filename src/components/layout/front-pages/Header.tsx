'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports

import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import type { Theme } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

// Type Imports
import { Button } from '@mui/material'

import type { Mode } from '@core/types'

// Component Imports
import Logo from '@components/layout/shared/Logo'

import ModeDropdown from '@components/layout/shared/ModeDropdown'
import FrontMenu from './FrontMenu'


// Util Imports
import { frontLayoutClasses } from '@layouts/utils/layoutClasses'

// Styles Imports
import styles from './styles.module.css'
import CustomIconButton from '@/@core/components/mui/IconButton'


const Header = ({ mode }: { mode: Mode }) => {
  // States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const baseUrl = process.env.NEXT_PUBLIC_LOGIN_URL || ''; // Default to an empty string if env var is not set
  const loginUrl = `${baseUrl}/login`;
  
  // Hooks
  const isBelowLgScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  // Detect window scroll
  const trigger = useScrollTrigger({
    threshold: 0,
    disableHysteresis: true
  })

  return (
    <header className={classnames(frontLayoutClasses.header, styles.header)}>
      <div className={classnames(frontLayoutClasses.navbar, styles.navbar, { [styles.headerScrolled]: trigger })}>
        <div className={classnames(frontLayoutClasses.navbarContent, styles.navbarContent)}>
          {isBelowLgScreen ? (
            <div className='flex items-center gap-2 sm:gap-4'>
              <IconButton onClick={() => setIsDrawerOpen(true)} className='-mis-2'>
                <i className='tabler-menu-2 text-textPrimary' />
              </IconButton>
              <Link href='/home'>
                <Logo />
              </Link>
              <FrontMenu mode={mode} isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
            </div>
          ) : (
            <div className='flex items-center gap-10'>
              <Link href='/home'>
                <Logo />
              </Link>
              <FrontMenu mode={mode} isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
            </div>
          )}
          <div className='flex items-center gap-2 sm:gap-4'>
            <ModeDropdown /> 
            {isBelowLgScreen ? (
        <CustomIconButton
          component={Link}
          variant='contained'
          href={loginUrl}
          color='primary'
          target='_blank'
        >
          <i className='tabler-login text-xl' />
        </CustomIconButton>
      ) : (
        <Button
          component={Link}
          variant='contained'
          href={loginUrl}
          startIcon={<i className='tabler-login text-xl' />}
          className='whitespace-nowrap'
          target='_blank'
        >
          Se connecter
        </Button>
      )}
          </div>
          
        </div>
      </div>
    </header>
  )
}

export default Header
