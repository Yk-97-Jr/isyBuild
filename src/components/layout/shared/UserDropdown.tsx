'use client'

// React Imports
import React, {useRef, useState} from 'react'
import type {MouseEvent} from 'react'

// Next Imports
import {useRouter} from 'next/navigation'

// MUI Imports
import Avatar from '@mui/material/Avatar'
import Popper from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MenuList from '@mui/material/MenuList'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import { CircularProgress } from '@mui/material'

// Hook Imports
import Cookies from "js-cookie";

import { useSettings } from '@core/hooks/useSettings'
import { useLogoutCreateMutation } from "@/services/IsyBuildApi"
import {useAuth} from "@/contexts/AuthContext";

const UserDropdown = () => {
  // States
  const [open, setOpen] = useState(false)

  // Refs
  const anchorRef = useRef<HTMLDivElement>(null)

  // Hooks
  const router = useRouter()
  const [logout, {isLoading}] = useLogoutCreateMutation();
  const { settings } = useSettings()

  // Get user data from the context
  const { user } = useAuth()

  const handleDropdownOpen = () => {
    !open ? setOpen(true) : setOpen(false)
  }

  const handleDropdownClose = (event?: MouseEvent<HTMLLIElement> | (MouseEvent | TouchEvent), url?: string) => {
    if (url) {
      router.push(url)
    }

    if (anchorRef.current && anchorRef.current.contains(event?.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  const handleUserLogout = async () => {
    const refresh_token = Cookies.get('refresh_token')

    if (!refresh_token) {
      console.warn('No refresh token found, redirecting to login');
      router.push('/login');

return;
    }

    try {
      // Call the mutation to log out the user
      await logout(
        {
          tokenRefreshRequest: {
            refresh: refresh_token
          }
        }
      ).unwrap();

      // Remove tokens from cookies after successful logout
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      Cookies.remove('user');

      // Redirect to login page
      router.push('/login');

    } catch (error) {
      console.error('Logout failed:', error);

      // Handle any error case if needed
    }
  };

  return (
    <>
      <Avatar
        ref={anchorRef}
        alt={user?.first_name || 'User Avatar'}
        src='/images/avatars/1.png'
        onClick={handleDropdownOpen}
        className='cursor-pointer bs-[38px] is-[38px]'
      />
      <Popper
        open={open}
        transition
        disablePortal
        placement='bottom-end'
        anchorEl={anchorRef.current}
        className='min-is-[240px] !mbs-3 z-[1]'
      >
        {({TransitionProps, placement}) => (
          <Fade
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-end' ? 'right top' : 'left top'
            }}
          >
            <Paper className={settings.skin === 'bordered' ? 'border shadow-none' : 'shadow-lg'}>
              <ClickAwayListener onClickAway={e => handleDropdownClose(e as MouseEvent | TouchEvent)}>
                <MenuList>
                  <div className='flex items-center plb-2 pli-6 gap-2' tabIndex={-1}>
                    <Avatar alt={user?.first_name || 'User Avatar'} src='/images/avatars/1.png'/>
                    <div className='flex items-start flex-col'>
                      <Typography className='font-medium' color='text.primary'>
                        {user?.first_name || 'John Doe'}
                      </Typography>
                      <Typography variant='caption'>
                        {user?.email || 'admin@isybuild.com'}
                      </Typography>
                    </div>
                  </div>
                  <Divider className='mlb-1'/>
                  <MenuItem className='mli-2 gap-3' onClick={e => handleDropdownClose(e, '/account-settings')}>
                    <i className='tabler-settings'/>
                    <Typography color='text.primary'>Paramétres</Typography>
                  </MenuItem>
                  <Divider className='mlb-1'/>
                  <div className='flex items-center plb-2 pli-3'>
                    <Button
                      fullWidth
                      variant='contained'
                      color='error'
                      size='small'
                      disabled={isLoading} // Désactive le bouton pendant le chargement
                      onClick={handleUserLogout}
                      sx={{'& .MuiButton-endIcon': {marginInlineStart: 1.5}}}
                    >
                      {isLoading ? <CircularProgress sx={{color: 'white'}} size={14}/> : 'Déconnexion'}
                    </Button>
                  </div>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}

export default UserDropdown
