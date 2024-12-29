



import React from 'react'

import { Card,  CardContent, Typography } from '@mui/material'

import type { ProjectSubcontractorRead } from '@/services/IsyBuildApi'

type  ClinetShowcaseProps = {
  clinetShowcaseData: ProjectSubcontractorRead | undefined // Adjust the type as necessary
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





const ClinetShowcase: React.FC<ClinetShowcaseProps> = ({  }) => {


  return (
    <Card>
      <CardContent className='flex flex-col gap-6'>
        <Typography variant='subtitle2' fontWeight='normal'>
        Clients
        </Typography>

        {/*{clinetShowcaseData ? (*/}
        {/*    <div className='flex items-center gap-3'>*/}
        {/*  {getAvatar({*/}
        {/*      avatar: clinetShowcaseData?.client.created_by?.avatar ?? '/images/avatars/1.png',*/}
        {/*      email: clinetShowcaseData?.client.created_by.email ?? ''*/}
        {/*    })}*/}
        {/*  <div className='flex flex-col'>*/}
        {/*    <Typography color='text.primary' className='font-medium'>*/}
        {/*      {clinetShowcaseData?.client.created_by.first_name} {clinetShowcaseData?.client.created_by.last_name}*/}
        {/*    </Typography>*/}
        {/*      <Typography>{clinetShowcaseData?.client.created_by.email}</Typography>*/}
        {/*  </div>*/}
        {/*</div>*/}




        {/*  ) : (*/}
        {/*    <Typography variant='body1' color='text.secondary'>*/}
        {/*      Aucune information disponible*/}
        {/*    </Typography>*/}
        {/*  )}*/}

      </CardContent>
    </Card>
  )
}

export default ClinetShowcase






