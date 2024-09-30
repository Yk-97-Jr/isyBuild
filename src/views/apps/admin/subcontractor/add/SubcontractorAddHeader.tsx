import React from 'react'

import { useRouter } from 'next/navigation'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { CircularProgress } from '@mui/material'

import { useAuth } from '@/contexts/AuthContext'

type SubcontractorAddHeaderProps = {
  onSubmit: () => void // Accept the onSubmit function as a prop
  isLoading: boolean
}

const SubcontractorAddHeader: React.FC<SubcontractorAddHeaderProps> = ({ onSubmit, isLoading }) => {
  const router = useRouter()
  const { user } = useAuth()

  const userRole = user?.role

  const handleDiscard = () => {
    router.push(`/${userRole}/subcontractor/list`) // Replace '/lots' with the actual route of your lots list page
  }

  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          Ajouter une Entreprise
        </Typography>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Button variant='tonal' color='secondary' onClick={handleDiscard}>
          Annuler
        </Button>
        <Button variant='contained' onClick={onSubmit} disabled={isLoading}>
          {isLoading ? <CircularProgress sx={{ color: 'white' }} size={24} /> : 'Ajouter une Entreprise'}
        </Button>
      </div>
    </div>
  )
}

export default SubcontractorAddHeader
