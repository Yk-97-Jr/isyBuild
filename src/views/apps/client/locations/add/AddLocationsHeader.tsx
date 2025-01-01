import { useRouter, useSearchParams } from 'next/navigation'

import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

import { useAuth } from '@/contexts/AuthContext'

const LocationsAddHeader = ({ onSubmit, isLoading }: { onSubmit: () => void; isLoading: boolean }) => {
  const router = useRouter()
  const { user } = useAuth()
  const userRole = user?.role
  const searchParams = useSearchParams();
const returnTo = searchParams.get('return_to'); 

  const handleDiscard = () => {

    console.log(returnTo);
    
    

    if (returnTo) {
      router.push(`/${returnTo}`); // Redirect to the "returnTo" URL
    } else {
      router.push(`/${userRole}/locations/list`); // Default fallback URL
    }   
  }

  return (
    <form onSubmit={onSubmit}>
      <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
        <div>
          <Typography variant='h4' className='mbe-1'>
            Créer un emplacement
          </Typography>
        </div>
        <div className='flex flex-wrap max-sm:flex-col gap-4'>
          <Button variant='tonal' color='secondary' onClick={handleDiscard}>
            Annuler
          </Button>
          <Button variant='contained' type='submit' disabled={isLoading}>
            {isLoading ? <CircularProgress sx={{ color: 'white' }} size={24} /> : 'Enregistrer'}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default LocationsAddHeader
