'use client'

import React from 'react'

import { useRouter } from 'next/navigation'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { CircularProgress } from '@mui/material'

type ProductEditHeaderProps = {
  onSubmit: () => void
  isLoading: boolean
}

const ProductEditHeader: React.FC<ProductEditHeaderProps> = ({ onSubmit, isLoading }) => {
  const router = useRouter()

  const handleDiscard = () => {
    router.push('/products/list')
  }

  return (
    <div className="flex justify-between items-center mb-4">
      <Typography variant="h4">Edit Product</Typography>
      <div className="flex gap-4">
        <Button variant="outlined" color="secondary" onClick={handleDiscard}>
          Discard
        </Button>
        <Button variant="contained" onClick={onSubmit} disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Save Changes'}
        </Button>
      </div>
    </div>
  )
}

export default ProductEditHeader
