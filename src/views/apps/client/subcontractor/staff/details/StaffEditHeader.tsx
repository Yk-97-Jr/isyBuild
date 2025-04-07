import React from 'react'

import { useParams, useRouter } from 'next/navigation'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { CircularProgress } from '@mui/material'

import { useAuth } from '@/contexts/AuthContext'

type UserEditHeaderProps = {
  onSubmit: () => void // Accept the onSubmit function as a prop
  isLoading: boolean
  handleBack: () => void
}

const UserEditHeader: React.FC<UserEditHeaderProps> = ({ onSubmit, isLoading, }) => {

  const router = useRouter()
  const { user } = useAuth()
  const userRole = user?.role

  const {id} = useParams()
 
  const handleDiscard = () => {
    
    console.log(`/${userRole}/lots/list`);
    
    router.push(`/${userRole}/subcontractor/${id}/details`) 
  }

  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
        Informations sur les membres
        </Typography>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Button onClick={handleDiscard} variant='tonal' color='secondary'>
          Annuler
        </Button>
        <Button variant='contained' onClick={onSubmit} disabled={isLoading}>
          {isLoading ? <CircularProgress sx={{ color: 'white' }} size={24} /> : 'Enregistrer'}
        </Button>
      </div>
    </div>
  )
}

export default UserEditHeader
