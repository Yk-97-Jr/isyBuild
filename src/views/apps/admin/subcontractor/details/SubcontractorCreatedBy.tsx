// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

// Util Imports
import { getInitials } from '@/utils/getInitials'
import type { SubcontractorRead } from '@/services/IsyBuildApi'

type SubcontractorEditProps = {
  subcontractorData: SubcontractorRead | undefined // Adjust the type as necessary
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)

  return date.toLocaleString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getAvatar = (params: Pick<any, 'avatar' | 'email'>) => {
  const { avatar, email } = params

  if (avatar) {
    return <Avatar src={avatar} />
  } else {
    return <Avatar>{getInitials(email as string)}</Avatar>
  }
}

// Vars

const SubcontractorCreatedBy: React.FC<SubcontractorEditProps> = ({ subcontractorData }) => {
  // Vars

  return (
    <Card>
      <CardContent className='flex flex-col gap-6'>
        <Typography variant='subtitle2' fontWeight='normal'>
          Créé Par
        </Typography>
        <div className='flex items-center gap-3'>
          {getAvatar({
            avatar: subcontractorData?.created_by?.avatar ?? '/images/avatars/1.png',
            email: subcontractorData?.created_by.email ?? ''
          })}
          <div className='flex flex-col'>
            <Typography color='text.primary' className='font-medium'>
              {subcontractorData?.created_by.first_name} {subcontractorData?.created_by.last_name}
              <Typography>{subcontractorData?.created_by.email}</Typography>
            </Typography>
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <div className='flex justify-between items-center'>
            <Typography variant='subtitle2' className='font-medium mlb-2'>
              Plus de détails
            </Typography>
          </div>
          {subcontractorData ? (
            <>
              <div className='flex items-center gap-2 mlb-2'>
                <i className='tabler-clock-hour-4' />
                <Typography>Créé à:</Typography>
                <Typography> {formatDate(subcontractorData.created_at)}</Typography>
              </div>
              <div className='flex items-center gap-2 mlb-2'>
                <i className='tabler-clock-hour-4' />
                <Typography>Mis à jour à:</Typography>
                <Typography> {formatDate(subcontractorData.updated_at)}</Typography>
              </div>
            </>
          ) : (
            <Typography variant='body1' color='text.secondary'>
              Aucune information disponible
            </Typography>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default SubcontractorCreatedBy
