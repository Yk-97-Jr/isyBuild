// MUI Imports
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const ClientAddHeader = () => {
  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          Ajouter un client
        </Typography>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Button variant='tonal' color='secondary'>
          Annuler
        </Button>
        <Button variant='contained'>Ajouter un client</Button>
      </div>
    </div>
  )
}

export default ClientAddHeader
