// Next Imports
import dynamic from 'next/dynamic'

// Component Imports

const InfosClient = dynamic(() => import('@views/apps/admin/subcontractor/details/index'))

const AccountSettingsPage = () => {
  return <InfosClient />
}

export default AccountSettingsPage
