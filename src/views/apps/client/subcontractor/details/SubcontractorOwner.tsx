// MUI Imports
import List from '@mui/material/List'
import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import { Button, Card, CardContent, CardHeader, Typography } from '@mui/material'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'

import type { SubcontractorRead } from '@/services/IsyBuildApi'

type OwnerStausProps = {
  subcontractorData: SubcontractorRead | undefined
}

const Owner: React.FC<OwnerStausProps> = ({ subcontractorData }) => {
  return (
    <Card>
      <CardHeader title='propriétaire' />
      <CardContent>
        <List>
          {/* Remove padding from ListItem */}
          <ListItem disableGutters className='flex justify-between items-center p-0'>
            {/* Move ListItemAvatar to the left and add gap */}
            <div className='flex items-center gap-3'>
              {subcontractorData?.owner ? (
                <>
                  <ListItemAvatar className='p-0'>
                    <Avatar
                      src={subcontractorData?.owner?.avatar || '/images/avatars/1.png'}
                      alt={subcontractorData?.owner?.first_name}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${subcontractorData?.owner?.first_name} ${subcontractorData?.owner?.last_name}`}
                    secondary={`${subcontractorData?.owner?.email}`}
                  />
                </>
              ) : (
                <>
                  <Typography
                    variant='body1'
                    color='text.secondary'
                    className=' font-medium text-[15px] leading-[22px] '
                  >
                    Aucune information disponible
                  </Typography>
                </>
              )}
            </div>
            {/* Button on the far right */}
            <Button variant='contained' size='medium'>
              modifier
            </Button>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  )
}

export default Owner
