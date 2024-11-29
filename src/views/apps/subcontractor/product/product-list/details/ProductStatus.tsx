
'use client' // Add this line at the very top

// MUI Imports



import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'


// Component Imports

import type {  UseFormRegister } from 'react-hook-form'



import SelectMultiple from './SelectMultiple'

import type { FormValidateProductEditType } from './schemaProductEdit'
import type { ProductRead } from '@/services/IsyBuildApi'

type ClientStatusProps = {
  register: UseFormRegister<FormValidateProductEditType> // Adjust the type as necessary
  productData:ProductRead | undefined
 
}

const ProductStatus: React.FC<ClientStatusProps> = ({ register, productData }) => {
 

  // Function to toggle the select menu state
 

  return (
    <Card
      className='mbe-12'
      
    >
      <CardHeader title='Catégorie' />
      <CardContent
       
      >
        <div className='flex flex-grow flex-col'>
          <SelectMultiple  register={register} productData={productData}/>
          <div style={{ flexGrow: 1 }}></div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductStatus
 