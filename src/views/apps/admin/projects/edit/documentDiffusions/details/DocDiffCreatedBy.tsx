// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

// Util Imports
import { getInitials } from '@/utils/getInitials'
import type { DocumentDiffusionRead } from '@/services/IsyBuildApi'

type SubcontractorEditProps = {
  docDiffData: DocumentDiffusionRead | undefined // Adjust the type as necessary
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

const DocDiffCreatedBy: React.FC<SubcontractorEditProps> = ({ docDiffData }) => {
  // Vars

  return (
    <Card>
      <CardContent className='flex flex-col gap-6'>
        <Typography variant='subtitle2' fontWeight='normal'>
          Créé Par
        </Typography>
        <div className='flex items-center gap-3'>
          {getAvatar({
            avatar: docDiffData?.created_by?.avatar ?? '/images/avatars/1.png',
            email: docDiffData?.created_by?.email ?? ''
          })}
          <div className='flex flex-col'>
            <Typography color='text.primary' className='font-medium'>
              {docDiffData?.created_by?.first_name} {docDiffData?.created_by?.last_name}
            </Typography>
              <Typography>{docDiffData?.created_by?.email}</Typography>
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <div className='flex justify-between items-center'>
            <Typography variant='subtitle2' className='font-medium mlb-2'>
              Plus de détails
            </Typography>
          </div>
          {docDiffData ? (
            <>
              <div className='flex items-center gap-2 mlb-2'>
                <i className='tabler-clock-hour-4' />
                <Typography>Créé à:</Typography>
                <Typography> {formatDate(docDiffData.created_at)}</Typography>
              </div>
              <div className='flex items-center gap-2 mlb-2'>
                <i className='tabler-clock-hour-4' />
                <Typography>Mis à jour à:</Typography>
                <Typography> {formatDate(docDiffData.updated_at)}</Typography>
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

export default DocDiffCreatedBy
