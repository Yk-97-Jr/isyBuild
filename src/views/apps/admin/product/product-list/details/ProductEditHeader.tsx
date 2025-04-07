'use client'

import React from 'react'

import { useRouter } from 'next/navigation'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { CircularProgress } from '@mui/material'

import { useAuth } from '@/contexts/AuthContext'

type ProductEditHeaderProps = {
  onSubmit: () => void
  isLoading: boolean
}

const ProductEditHeader: React.FC<ProductEditHeaderProps> = ({ onSubmit, isLoading }) => {
  const router = useRouter()
  const { user } = useAuth()

  const userRole = user?.role

  const handleDiscard = () => {
    router.push(`/${userRole}/product/list`) // Replace '/lots' with the actual route of your lots list page
  }

  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
        Modifier les informations du produit
        </Typography>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Button variant='tonal' color='secondary' onClick={handleDiscard}>
          Annuler
        </Button>
        <Button variant='contained' onClick={onSubmit} disabled={isLoading}>
          {isLoading ? <CircularProgress sx={{ color: 'white' }} size={24} /> : 'Enregistrer les modifications'}
        </Button>
      </div>
    </div>
  )
}

export default ProductEditHeader
