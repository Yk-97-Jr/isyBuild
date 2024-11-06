'use client'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import NavToggle from './NavToggle'
import ModeDropdown from '@components/layout/shared/ModeDropdown'
import UserDropdown from '@components/layout/shared/UserDropdown'
import NotificationsDropdown from '@components/layout/shared/NotificationDropdown'

// Util Imports
import {verticalLayoutClasses} from '@layouts/utils/layoutClasses'
import BackButton from "@components/layout/shared/BackButton";

const NavbarContent = () => {
  return (
    <div className={classnames(verticalLayoutClasses.navbarContent, 'flex items-center justify-between gap-4 is-full')}>
      <div className='flex items-center gap-4'>
        <NavToggle/>
        <BackButton/>
      </div>
      <div className='flex items-center'>
        <NotificationsDropdown/>
        <ModeDropdown/>
        <UserDropdown/>

      </div>
    </div>
  )
}

export default NavbarContent
