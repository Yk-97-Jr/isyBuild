'use client'

// ClientModifyHeader.tsx

import React from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { CircularProgress } from '@mui/material'

import { useAuth } from '@/contexts/AuthContext'

type CategoryAddHeaderProps = {
  onSubmit: () => void // Accept the onSubmit function as a prop
  isLoading: boolean
  
}



const CategoryEditsHeader: React.FC<CategoryAddHeaderProps> = ({ onSubmit, isLoading }) => {
  const router = useRouter()
const { user } = useAuth()
const userRole = user?.role
const searchParams = useSearchParams();
const returnTo = searchParams.get('return_to'); 





const handleDiscard = () => {
  

  

  if (returnTo) {
    router.push(`/${returnTo}`); // Redirect to the "returnTo" URL
  } else {
    router.push(`/${userRole}/product/list?tab=categorylist`); // Default fallback URL
  }   
}

  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
        Créer une catégorie
        </Typography>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Button onClick={handleDiscard} variant='tonal' color='secondary'>
        Annuler
        </Button>
        <Button variant='contained' onClick={onSubmit} disabled={isLoading}>
          {isLoading ? <CircularProgress sx={{ color: 'white' }} size={24} /> : 'Enregistrer les modifications'}
        </Button>
      </div>
    </div>
  )
}

export default CategoryEditsHeader
