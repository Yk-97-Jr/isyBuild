'use client'

// LocationModifyHeader.tsx

import React from 'react'

import { useRouter } from 'next/navigation'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { CircularProgress } from '@mui/material'

import { useAuth } from '@/contexts/AuthContext'

type LocationEditHeaderProps = {
  onSubmit: () => void // Accept the onSubmit function as a prop
  isLoading: boolean
}

const LocationsEditHeader: React.FC<LocationEditHeaderProps> = ({ onSubmit, isLoading }) => {
  const router = useRouter()
  const { user } = useAuth()
  const userRole = user?.role

  const handleDiscard = () => {
    console.log(`/${userRole}/locations/list`)
    router.push(`/${userRole}/locations/list`)
  }

  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          Informations de l&apos;emplacement
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

export default LocationsEditHeader
