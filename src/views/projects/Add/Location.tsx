// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'

import CustomTextField from '@core/components/mui/TextField'

interface LocationProps {
  latitude: number | null
  setLatitude: (value: number | null) => void
  longitude: number | null
  setLongitude: (value: number | null) => void
}

const Location = ({ latitude, setLatitude, longitude, setLongitude }: LocationProps) => {

  const handleLatitude = (event: React.ChangeEvent<HTMLInputElement>) => {

    const value = parseFloat(event.target.value)

    if (!isNaN(value) && value >= -90 && value <= 90) {
      setLatitude(value)
      console.log(value)
    } else {
      console.error('Invalid latitude value')
    }

  }

  const handleLongitude = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value)
    
    if (!isNaN(value) && value >= -180 && value <= 180) {
      setLongitude(value)
      console.log(value)
    } else {
      // Handle invalid input
      console.error('Invalid longitude value')
    }
  }

  return (
    <Card>
      <CardHeader title='Map Cordination' />
      <CardContent>
        <CustomTextField
          fullWidth
          label='Latitude'
          placeholder='For Example:37.7749'
          className='mbe-6'
          onChange={handleLatitude}
          error={latitude === null || latitude < -90 || latitude > 90}
          helperText={
            latitude === null
              ? 'Latitude is required'
              : latitude < -90 || latitude > 90
                ? 'Latitude must be between -90 and 90'
                : ''
          }
        />
        <CustomTextField
          fullWidth
          label='Longitude'
          placeholder='For Example:-122.4194'
          className='mbe-6'
          onChange={handleLongitude}
          error={longitude === null || longitude < -90 || longitude > 90 || typeof longitude === 'string'}
          helperText={
            longitude === null
              ? 'Longitude is required'
              : longitude < -180 || longitude > 180
                ? 'Longitude must be between -180 and 180'
                : typeof longitude === 'string'
                  ? 'Longitude must be a  Number'
                  : ''
          }
        />
        <Divider className='mlb-2' />
        <div className='flex items-center justify-between'></div>
      </CardContent>
    </Card>
  )
}

export default Location
