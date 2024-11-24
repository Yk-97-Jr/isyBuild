// Next Imports
import dynamic from 'next/dynamic'

// Component Imports

const InfosCategory = dynamic(() => import('@views/apps/subcontractor/product/category-list/details'))

const AccountSettingsPage = () => {
  return <InfosCategory />
}

export default AccountSettingsPage
