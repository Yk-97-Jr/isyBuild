'use client' // Add this line at the very top

// MUI Imports

import React from 'react'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'


// Component Imports

import type {  UseFormRegister } from 'react-hook-form'



import CategoryDropdownAdd from './CategoryDropdownAdd'

import type { FormValidateProductAddType } from './schemaProductAdd'

type ClientStatusProps = {
  register: UseFormRegister<FormValidateProductAddType> // Adjust the type as necessary
 
}

const ProductStatus: React.FC<ClientStatusProps> = ({ register }) => {
 

 

  return (
    <Card
      className='mbe-12'
      sx={{
        
        transition: 'height 0.3s ease', // Smooth transition of height
        display: 'flex', // Use flex layout
        flexDirection: 'column' // Column layout to stack elements
      }}
    >
      <CardHeader title='organisée' />
      <CardContent
        sx={{
          flexGrow: 1, // Make CardContent grow to fill available space
          display: 'flex', // Flex layout inside CardContent
          flexDirection: 'column' // Column layout inside CardContent
        }}
      >
        <div className='flex flex-grow flex-col'>
          <CategoryDropdownAdd  register={register} />
          <div style={{ flexGrow: 1 }}></div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductStatus
 