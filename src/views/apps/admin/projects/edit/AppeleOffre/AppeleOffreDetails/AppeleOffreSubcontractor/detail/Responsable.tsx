// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

// Util Imports
import {getInitials} from '@/utils/getInitials'
import type {ProjectLotSubcontractorRead} from "@/services/IsyBuildApi";

type Props = {
  projectLotSubcontractorData: ProjectLotSubcontractorRead | undefined // Adjust the type as necessary
}


const getAvatar = (params: Pick<any, 'avatar' | 'email'>) => {
  const {avatar, email} = params

  if (avatar) {
    return <Avatar src={avatar}/>
  } else {
    return <Avatar>{getInitials(email as string)}</Avatar>
  }
}

// Vars

const Responsable: React.FC<Props> = ({projectLotSubcontractorData}) => {
  // Vars

  return (
    <Card>
      <CardContent className='flex flex-col gap-6'>
        <Typography variant='subtitle2' fontWeight='normal'>
          Responsable
        </Typography>
        <div className='flex items-center gap-3'>
          {getAvatar({
            avatar: projectLotSubcontractorData?.subcontractor_staff?.user.avatar ?? '/images/avatars/1.png',
            email: projectLotSubcontractorData?.subcontractor_staff?.user.email ?? ''
          })}
          <div className='flex flex-col'>
            <Typography color='text.primary' className='font-medium'>
              {projectLotSubcontractorData?.subcontractor_staff?.user.first_name} {projectLotSubcontractorData?.subcontractor_staff?.user.last_name}
            </Typography>
            <Typography>{projectLotSubcontractorData?.subcontractor_staff?.user.email}</Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Responsable
