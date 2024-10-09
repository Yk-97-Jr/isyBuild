'use client'

// Next Imports
import dynamic from 'next/dynamic'

// Component Imports

const InfosClient = dynamic(() => import('@views/apps/client/subcontractor/details'))

const AccountSettingsPage = () => {
  return <InfosClient />
}

export default AccountSettingsPage
