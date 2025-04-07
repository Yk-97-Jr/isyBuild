'use client' // Add this line at the very top

// MUI Imports

import React, { useState } from 'react'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'

// Component Imports

import type { FieldError, UseFormRegister } from 'react-hook-form'

import { Divider } from '@mui/material'

import SelectMultiple from './SelectMultiple'

import type { FormValidateSubcontractorAddType } from './SchemaSubcontractorAdd'

type ClientStatusProps = {
  register: UseFormRegister<FormValidateSubcontractorAddType> // Adjust the type as necessary
  errors: {
    is_active?: FieldError
  }
}

const ClientStatus: React.FC<ClientStatusProps> = ({ register, errors }) => {
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

          <Divider className='mlb-2' />
          <div className='flex items-center justify-between mbe-6'>
            <Typography>Status</Typography>

            <Switch {...register('is_active')} color='primary' defaultChecked />
            {errors.is_active && <div className='text-red-500'>{errors.is_active.message}</div>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ClientStatus
