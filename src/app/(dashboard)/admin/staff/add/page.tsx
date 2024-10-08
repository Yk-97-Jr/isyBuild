// Next Imports
import dynamic from 'next/dynamic'

// Component Imports

const StaffAdd = dynamic(() => import('@views/apps/admin/subcontractor/staff/add/index'))

const AccountSettingsPage = () => {
  return <StaffAdd />
}

export default AccountSettingsPage
