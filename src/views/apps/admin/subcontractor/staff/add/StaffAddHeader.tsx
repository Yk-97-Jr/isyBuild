/* eslint-disable react/no-unescaped-entities */
import React from 'react'



import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { CircularProgress } from '@mui/material'



type SubcontractorAddHeaderProps = {
  onSubmit: () => void // Accept the onSubmit function as a prop
  isLoading: boolean
  handleBack: () => void
}

const SubcontractorAddHeader: React.FC<SubcontractorAddHeaderProps> = ({ onSubmit, isLoading, handleBack }) => {
  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
        ajouter un membre à l'équipe
        </Typography>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Button variant='tonal' color='secondary' onClick={handleBack}>
          Annuler
        </Button>
        <Button variant='contained' onClick={onSubmit} disabled={isLoading}>
          {isLoading ? <CircularProgress sx={{ color: 'white' }} size={24} /> : 'Enregistrer'}
        </Button>
      </div>
    </div>
  )
}

export default SubcontractorAddHeader
