// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'

import CustomTextField from '@core/components/mui/TextField'

const Location = () => {
  return (
    <Card>
      <CardHeader title='Map Cordination' />
      <CardContent>
        <CustomTextField fullWidth label='latitude' placeholder='37.7749' className='mbe-6' />
        <CustomTextField fullWidth label='longitude' placeholder='-122.4194' className='mbe-6' />
        <Divider className='mlb-2' />
        <div className='flex items-center justify-between'></div>
      </CardContent>
    </Card>
  )
}

export default Location
