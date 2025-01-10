import React from 'react'

import { useParams, useRouter } from 'next/navigation'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { CircularProgress } from '@mui/material'

import { useAuth } from '@/contexts/AuthContext'

type DocDiffAddHeaderProps = {
  onSubmit: () => void // Accept the onSubmit function as a prop
  isLoading: boolean
}

const DocDiffHeader: React.FC<DocDiffAddHeaderProps> = ({ onSubmit, isLoading }) => {
  const router = useRouter()
  const { user } = useAuth()
  const {edit} = useParams()
  const userRole = user?.role


  const handleDiscard = () => {
    const redirectUrl = `/${userRole}/projects/${edit}/details`;

    console.log(redirectUrl);

    router.push(redirectUrl);
  }

  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          Ajouter un diffusion de document
        </Typography>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Button variant='tonal' color='secondary' onClick={handleDiscard}>
          Annuler
        </Button>
        <Button variant='contained' onClick={onSubmit} disabled={isLoading}>
          {isLoading ? <CircularProgress sx={{ color: 'white' }} size={24} /> : 'Ajouter une document'}
        </Button>
      </div>
    </div>
  )
}

export default DocDiffHeader
