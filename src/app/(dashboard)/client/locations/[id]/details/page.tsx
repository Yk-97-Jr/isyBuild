// Next Imports
import dynamic from 'next/dynamic'

// Component Imports

const LocationsEdit = dynamic(() => import('@views/apps/client/locations/details'))

const AccountSettingsPage = () => {
  return <LocationsEdit />
}

export default AccountSettingsPage
