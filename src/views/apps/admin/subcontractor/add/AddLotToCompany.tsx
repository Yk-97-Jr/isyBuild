/* 'use client' // Add this line at the very top

// MUI Imports
import { useState } from 'react'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'

// Component Imports


import type { FieldError, UseFormRegister } from 'react-hook-form'

import Form from '@components/Form'
import SelectMultiple from './SelectMultiple'


import type { FormValidateSubcontractorAddType } from './SchemaSubcontractorAdd'

type SubcontractorStausProps = {
  register: UseFormRegister<FormValidateSubcontractorAddType> // Adjust the type as necessary
  errors: {
    is_active?: FieldError
  }
}

const AddLotToSubcontractor: React.FC<SubcontractorStausProps> = ({ register, errors }) => {
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

          <SelectMultiple onToggleMenu={handleSelectToggle} />


          <div style={{ flexGrow: 1 }}></div>

          <div className='flex items-center justify-between mbe-6'>
            <Typography>Status</Typography>

            <Switch {...register('is_active')} color='primary' />
            {errors.is_active && <div className='text-red-500'>{errors.is_active.message}</div>}
          </div>
        </Form>
      </CardContent>
    </Card>
  )
}

export default AddLotToSubcontractor
 */

import React from 'react'

import { Card, CardHeader, CardContent, Divider, Typography, Switch } from '@mui/material'
import type { FieldError, UseFormRegister } from 'react-hook-form'

import type { FormValidateSubcontractorAddType } from './SchemaSubcontractorAdd'

type ClientStausProps = {
  register: UseFormRegister<FormValidateSubcontractorAddType> // Adjust the type as necessary
  errors: {
    is_active?: FieldError
  }
}

const ClientStatus: React.FC<ClientStausProps> = ({ register, errors }) => {
  return (
    <Card>
      <CardHeader title='Détails' />
      <CardContent>
        <Divider className='mlb-2' />
        <div className='flex items-center justify-between'>
          <Typography>Statut</Typography>
          <Switch {...register('is_active')} defaultChecked />
        </div>
        {errors.is_active && <span>{errors.is_active.message}</span>}
      </CardContent>
    </Card>
  )
}

export default ClientStatus
