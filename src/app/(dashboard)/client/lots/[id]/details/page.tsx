'use client'

// Next Imports
import dynamic from 'next/dynamic'

// Component Imports

const InfosLots = dynamic(() => import('@views/apps/client/lots/details/index'))

const AccountSettingsPage = () => {
  return <InfosLots />
}

export default AccountSettingsPage
