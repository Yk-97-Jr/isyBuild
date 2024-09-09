'use client'

// React Imports
import {useRef, useState} from 'react'
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

// Hook Imports
import Cookies from "js-cookie";

import {useSettings} from '@core/hooks/useSettings'


const UserDropdown = () => {
  // States
  const [open, setOpen] = useState(false)

  // Refs
  const anchorRef = useRef<HTMLDivElement>(null)

  // Hooks
  const router = useRouter()

  const {settings} = useSettings()

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

  const handleUserLogout = () => {


    // Remove tokens from cookies
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');

    // Redirect to login page
    router.push('/home')


  }

  return (
    <>
      <Avatar
        ref={anchorRef}
        alt='John Doe'
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
                    <Avatar alt='John Doe' src='/images/avatars/1.png'/>
                    <div className='flex items-start flex-col'>
                      <Typography className='font-medium' color='text.primary'>
                        John Doe
                      </Typography>
                      <Typography variant='caption'>admin@vuexy.com</Typography>
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
                      endIcon={<i className='tabler-logout'/>}
                      onClick={handleUserLogout}
                      sx={{'& .MuiButton-endIcon': {marginInlineStart: 1.5}}}
                    >
                      Déconnexion
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
