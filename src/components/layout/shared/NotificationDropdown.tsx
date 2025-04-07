'use client'

// React Imports
import React, {useRef, useState, useEffect} from 'react'
import type {MouseEvent, ReactNode} from 'react'


import Linkify from 'linkify-react'

// MUI Imports
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import Popper from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'
import useMediaQuery from '@mui/material/useMediaQuery'
import Button from '@mui/material/Button'
import type {Theme} from '@mui/material/styles'

// Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'

// Type Imports

import Box from "@mui/material/Box";

import CircularProgress from "@mui/material/CircularProgress";

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import {useSettings} from '@core/hooks/useSettings'

// Util Imports
import type {
  InAppNotificationRead
} from "@/services/IsyBuildApi";
import {
  useGetInAppNotificationsListQuery,
  useMarkNotificationAsReadMutation
} from "@/services/IsyBuildApi";
import {formatDate} from "@/utils/formatDate";


type ScrollWrapperProps = {
  children: ReactNode;
  hidden: boolean;
  onScroll?: (scrollTop: number, scrollHeight: number, clientHeight: number) => void;
}

const ScrollWrapper = ({children, hidden, onScroll}: ScrollWrapperProps) => {
  if (hidden) {
    return (
      <div className="overflow-x-hidden bs-full" onScroll={(event) => {
        const target = event.currentTarget;

        if (onScroll && target) {
          onScroll(target.scrollTop, target.scrollHeight, target.clientHeight);
        }
      }}>
        {children}
      </div>
    )
  } else {
    return (
      <PerfectScrollbar
        className="bs-full"
        options={{wheelPropagation: false, suppressScrollX: true}}
        onScrollY={(container) => {
          if (onScroll) {
            const {scrollTop, scrollHeight, clientHeight} = container;

            onScroll(scrollTop, scrollHeight, clientHeight);
          }
        }}
      >
        {children}
      </PerfectScrollbar>
    )
  }
}


const NotificationDropdown = () => {

  // States
  const [open, setOpen] = useState(false)
  const [notificationsState, setNotificationsState] = useState<InAppNotificationRead[]>([]);

  // States for pagination or other parameters
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)

  // Fetch notifications with the current page
  const {data: notifications, isLoading, isFetching} = useGetInAppNotificationsListQuery({page, pageSize})
  const [markNotificationAsRead] = useMarkNotificationAsReadMutation()

  const [hasMore, setHasMore] = useState(true); // Indicates if more pages are available
  const [isWaitingData, setIsWaitingData] = useState(isLoading); // Track waiting for data


  // initaile notifs
  useEffect(() => {
    if (notifications) {
      setNotificationsState((prev) => [...prev, ...notifications.results])
      setHasMore(notifications.next !== null);

      setIsWaitingData(false); // Stop waiting for data
    }
  }, [notifications])

  // Vars
  const notificationCount = notificationsState.filter(notification => notification.status !== "read").length;
  const readAll = notificationsState.every(notification => notification.status === "read");


  // Refs
  const anchorRef = useRef<HTMLButtonElement>(null)
  const ref = useRef<HTMLDivElement | null>(null)

  // Hooks
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  const {settings} = useSettings()

  const linkifyOptions = {
    target: '_blank',
    rel: 'noopener noreferrer',
  }


  const handleClose = () => {
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleScroll = (scrollTop: number, scrollHeight: number, clientHeight: number) => {
    const isBottom = scrollHeight - scrollTop === clientHeight;

    // If user has scrolled to the bottom and there are more pages, fetch the next page
    if (isBottom && hasMore && !isFetching) {
      setPage((prevPage) => prevPage + 1);
      setIsWaitingData(true); // Waiting for data
      console.log(isWaitingData)
    }
  };


  // Read notification when notification is clicked
  const handleReadNotification = async (event: MouseEvent<HTMLElement>, index: number) => {
    event.stopPropagation()
    const newNotifications = [...notificationsState]

    try {
      await markNotificationAsRead({notificationId: newNotifications[index].id}).unwrap()

      // Update local state after successful mutation
      newNotifications[index].status = "read"
      setNotificationsState(newNotifications)

    } catch (error) {
      console.error("Failed to mark notification as read:", error)
    }

  }

  // Remove notification when close icon is clicked
  const handleRemoveNotification = (event: MouseEvent<HTMLElement>, index: number) => {
    event.stopPropagation()
    const newNotifications = [...notificationsState]

    newNotifications.splice(index, 1)
    setNotificationsState(newNotifications)
  }

  // Read or unread all notifications when read all icon is clicked
  const readAllNotifications = () => {
    // const newNotifications = [...notificationsState]
    //
    // newNotifications.forEach(notification => {
    //   notification.status = !readAll
    // })
    // setNotificationsState(newNotifications)
  }

  useEffect(() => {
    const adjustPopoverHeight = () => {
      if (ref.current) {
        // Calculate available height, subtracting any fixed UI elements' height as necessary
        const availableHeight = window.innerHeight - 100

        if ("style" in ref.current) {
          ref.current.style.height = `${Math.min(availableHeight, 550)}px`
        }
      }
    }

    window.addEventListener('resize', adjustPopoverHeight)
  }, [])

  return (
    <>
      <IconButton ref={anchorRef} onClick={handleToggle} className='text-textPrimary'>
        <Badge
          color='error'
          className='cursor-pointer'
          variant='dot'
          overlap='circular'
          invisible={notificationCount === 0}
          sx={{
            '& .MuiBadge-dot': {top: 6, right: 5, boxShadow: 'var(--mui-palette-background-paper) 0px 0px 0px 2px'}
          }}
          anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        >
          <i className='tabler-bell'/>
        </Badge>
      </IconButton>
      <Popper
        open={open}
        transition
        disablePortal
        placement='bottom-end'
        ref={ref}
        anchorEl={anchorRef.current}
        {...(isSmallScreen
          ? {
            className: 'is-full !mbs-3 z-[1] max-bs-[550px] bs-[550px]',
            modifiers: [
              {
                name: 'preventOverflow',
                options: {
                  padding: themeConfig.layoutPadding
                }
              }
            ]
          }
          : {className: 'is-96 !mbs-3 z-[1] max-bs-[550px] bs-[550px]'})}
      >
        {({TransitionProps, placement}) => (
          <Fade {...TransitionProps} style={{transformOrigin: placement === 'bottom-end' ? 'right top' : 'left top'}}>
            <Paper className={classnames('bs-full', settings.skin === 'bordered' ? 'border shadow-none' : 'shadow-lg')}>
              <ClickAwayListener onClickAway={handleClose}>
                <div className='bs-full flex flex-col'>
                  <div className='flex items-center justify-between plb-3.5 pli-4 is-full gap-2'>
                    <Typography variant='h6' className='flex-auto'>
                      Notifications
                    </Typography>
                    {notificationCount > 0 && (
                      <Chip size='small' variant='tonal' color='primary' label={`${notificationCount} New`}/>
                    )}
                    <Tooltip
                      title={readAll ? 'Mark all as unread' : 'Mark all as read'}
                      placement={placement === 'bottom-end' ? 'left' : 'right'}
                      slotProps={{
                        popper: {
                          sx: {
                            '& .MuiTooltip-tooltip': {
                              transformOrigin:
                                placement === 'bottom-end' ? 'right center !important' : 'right center !important'
                            }
                          }
                        }
                      }}
                    >
                      {notificationsState.length > 0 ? (
                        <IconButton size='small' onClick={() => readAllNotifications()} className='text-textPrimary'>
                          <i className={readAll ? 'tabler-mail' : 'tabler-mail-opened'}/>
                        </IconButton>
                      ) : (
                        <></>
                      )}
                    </Tooltip>
                  </div>
                  <Divider/>
                  <ScrollWrapper hidden={hidden} onScroll={handleScroll}>
                    {notificationsState.length > 0 ? (
                      notificationsState.map((notification, index) => {
                        const {
                          subject,
                          message,
                          sent_at,
                          status,
                        } = notification;

                        return (
                          <div
                            key={index}
                            className={classnames(
                              'flex plb-3 pli-4 gap-3 cursor-pointer hover:bg-actionHover group', {
                                'border-be': index !== notificationsState.length - 1
                              })}
                            onClick={e => handleReadNotification(e, index)}
                          >
                            <div className='flex flex-col flex-auto'>
                              <Typography variant='body2' className='font-medium mbe-1' color='text.primary'>
                                {subject}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" className="mbe-2">
                                <Linkify options={linkifyOptions}>{message}</Linkify>
                              </Typography>
                              <Typography variant='caption' color='text.disabled'>
                                {formatDate(sent_at || "")}
                              </Typography>
                            </div>
                            <div className='flex flex-col items-end gap-2'>
                              <Badge
                                variant='dot'
                                color={status == "read" ? 'secondary' : 'primary'}
                                onClick={e => handleReadNotification(e, index)}
                                className={classnames('mbs-1 mie-1', {
                                  'invisible group-hover:visible': status == "read"
                                })}
                              />
                              <i
                                className='tabler-x text-xl invisible group-hover:visible'
                                onClick={e => handleRemoveNotification(e, index)}
                              />
                            </div>
                          </div>

                        );
                      })
                    ) : !isWaitingData && (
                      <Typography variant="body2" color="textSecondary">
                        No notifs available.
                      </Typography>
                    )
                    }
                    {isWaitingData && (
                      <Box sx={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                        <CircularProgress size={24}/>
                      </Box>
                    )}


                  </ScrollWrapper>
                  <Divider/>
                  <div className='p-4'>
                    <Button fullWidth variant='contained' size='small'>
                      View All Notifications
                    </Button>
                  </div>
                </div>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}

export default NotificationDropdown
