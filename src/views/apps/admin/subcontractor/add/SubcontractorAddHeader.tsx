import React from 'react'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { CircularProgress } from '@mui/material'

type SubcontractorAddHeaderProps = {
  onSubmit: () => void // Accept the onSubmit function as a prop
  isLoading: boolean
  reset: () => void
}

const SubcontractorAddHeader: React.FC<SubcontractorAddHeaderProps> = ({ onSubmit, isLoading, reset }) => {
  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          Ajouter une Entreprise
        </Typography>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Button variant='tonal' color='secondary' onClick={reset}>
          Annuler
        </Button>
        <Button variant='contained' onClick={onSubmit} disabled={isLoading}>
          {isLoading ? <CircularProgress sx={{ color: 'white' }} size={24} /> : 'Ajouter un Subcontractor'}
        </Button>
      </div>
    </div>
  )
}

export default SubcontractorAddHeader
