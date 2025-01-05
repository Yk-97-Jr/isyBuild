// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Util Imports
import type {ProjectForIntervenantRead} from "@/services/IsyBuildApi";

type SubcontractorEditProps = {
  projectState: ProjectForIntervenantRead | undefined // Adjust the type as necessary
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

// const getAvatar = (params: Pick<any, 'avatar' | 'email'>) => {
//   const { avatar, email } = params
//
//   if (avatar) {
//     return <Avatar src={avatar} />
//   } else {
//     return <Avatar>{getInitials(email as string)}</Avatar>
//   }
// }

// Vars

const CreatedBy: React.FC<SubcontractorEditProps> = ({ projectState }) => {
  // Vars

  return (
    <Card>
      <CardContent className='flex flex-col gap-6'>
        <Typography variant='subtitle2' fontWeight='normal'>
          Créé Par
        </Typography>
        {/*<div className='flex items-center gap-3'>*/}
        {/*  {getAvatar({*/}
        {/*    avatar: projectState?.created_by?.avatar ?? '/images/avatars/1.png',*/}
        {/*    email: projectState?.created_by?.email ?? ''*/}
        {/*  })}*/}
        {/*  <div className='flex flex-col'>*/}
        {/*    <Typography color='text.primary' className='font-medium'>*/}
        {/*      {projectState?.created_by?.first_name} {projectState?.created_by?.last_name}*/}
        {/*    </Typography>*/}
        {/*      <Typography>{projectState?.created_by?.email}</Typography>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className='flex flex-col gap-1'>
          <div className='flex justify-between items-center'>
            <Typography variant='subtitle2' className='font-medium mlb-2'>
              Plus de détails
            </Typography>
          </div>
          {projectState ? (
            <>
              <div className='flex items-center gap-2 mlb-2'>
                <i className='tabler-clock-hour-4' />
                <Typography>Créé à:</Typography>
                <Typography> {formatDate(projectState.created_at)}</Typography>
              </div>
              <div className='flex items-center gap-2 mlb-2'>
                <i className='tabler-clock-hour-4' />
                <Typography>Mis à jour à:</Typography>
                <Typography> {formatDate(projectState.updated_at)}</Typography>
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

export default CreatedBy
