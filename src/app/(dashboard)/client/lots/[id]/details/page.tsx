// Next Imports
import dynamic from 'next/dynamic'

// Component Imports

const InfosLots = dynamic(() => import('@views/apps/client/lots/details'))

const AccountSettingsPage = () => {
  return <InfosLots />
}

export default AccountSettingsPage
