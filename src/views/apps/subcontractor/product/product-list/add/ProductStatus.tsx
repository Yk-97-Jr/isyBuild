'use client' // Add this line at the very top

// MUI Imports

import React, { useState } from 'react'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'


// Component Imports

import type {  UseFormRegister } from 'react-hook-form'



import SelectMultiple from './SelectMultiple'

import type { FormValidateProductAddType } from './schemaProductAdd'

type ClientStatusProps = {
  register: UseFormRegister<FormValidateProductAddType> // Adjust the type as necessary
 
}

const ProductStatus: React.FC<ClientStatusProps> = ({ register }) => {
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
        <div className='flex flex-grow flex-col'>
          <SelectMultiple onToggleMenu={handleSelectToggle} register={register} />
          <div style={{ flexGrow: 1 }}></div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductStatus
 