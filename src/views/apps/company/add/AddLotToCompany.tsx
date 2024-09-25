'use client' // Add this line at the very top

// MUI Imports
import { useState } from 'react'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

/* import Divider from '@mui/material/Divider' */
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'

// Component Imports
import Form from '@components/Form'

import SelectMultiple from './SelectMultiple'

const AddLotToCompany = () => {
  const [isSelectOpen, setIsSelectOpen] = useState(false)

  // Function to toggle the select menu state
  const handleSelectToggle = (open: boolean) => {
    setIsSelectOpen(open)
  }

  return (
    <Card
      className='mbe-12'
      sx={{
        height: isSelectOpen ? '500px' : '266px', // Expand when select is open
        transition: 'height 0.3s ease', // Smooth transition of height
        display: 'flex', // Use flex layout
        flexDirection: 'column' // Column layout to stack elements
      }}
    >
      <CardHeader title='Détails' />
      <CardContent
        sx={{
          flexGrow: 1, // Make CardContent grow to fill available space
          display: 'flex', // Flex layout inside CardContent
          flexDirection: 'column' // Column layout inside CardContent
        }}
      >
        <Form className='flex flex-grow flex-col'>
          {/* Pass state and toggle function to SelectMultiple */}
          <SelectMultiple onToggleMenu={handleSelectToggle} />

          {/* Spacer div to push the divider and "In stock" section to the bottom */}
          <div style={{ flexGrow: 1 }}></div>

          {/* Divider and "In stock" section */}
          {/* <Divider className='mlb-2 mbe-6' /> */}
          <div className='flex items-center justify-between mbe-6'>
            <Typography>Status</Typography>
            <Switch defaultChecked />
          </div>
        </Form>
      </CardContent>
    </Card>
  )
}

export default AddLotToCompany
