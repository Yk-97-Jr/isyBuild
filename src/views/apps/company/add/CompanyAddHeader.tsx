import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const CompanyAddHeader = ({ onSubmit }: { onSubmit: () => void }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
        <div>
          <Typography variant='h4' className='mbe-1'>
            Ajouter une Entreprise
          </Typography>
        </div>
        <div className='flex flex-wrap max-sm:flex-col gap-4'>
          <Button variant='tonal' color='secondary'>
            Jeter
          </Button>
          <Button variant='contained' type='submit'>
            Enregistrer
          </Button>
        </div>
      </div>
    </form>
  )
}

export default CompanyAddHeader
