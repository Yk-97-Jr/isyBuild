// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

// Type Imports
import type { ThemeColor } from '@core/types'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

type DataType = {
  icon: string
  stats: string
  title: string
  color: ThemeColor
}

// Dummy data for the counts
const data: DataType[] = [
  {
    stats: '120', // Replace with the actual Subcontractor count
    title: 'Sous-traitants', // French for Subcontractors
    color: 'primary',
    icon: 'tabler-chart-pie-2'
  },
  {
    stats: '85', // Replace with the actual Project count
    title: 'Projets', // French for Projects
    color: 'info',
    icon: 'tabler-briefcase'
  },
  {
    stats: '50', // Replace with the actual Client count
    title: 'Clients', // French for Clients
    color: 'error',
    icon: 'tabler-users'
  },
  {
    stats: '10', // Replace with the actual User count
    title: 'Utilisateurs', // French for Users
    color: 'success',
    icon: 'tabler-user-circle'
  }
]

const StatisticsCard = () => {
  return (
    <Card>
      <CardHeader
        title='Statistiques' // French for Statistics
        action={
          <Typography variant='subtitle2' color='text.disabled'>
            Mis à jour à l&apos;instant 
          </Typography>
        }
      />
      <CardContent className='flex justify-between flex-wrap gap-4 md:pbs-10 max-md:pbe-6 max-[1060px]:pbe-[74px] max-[1200px]:pbe-[52px] max-[1320px]:pbe-[74px] max-[1501px]:pbe-[52px]'>
        <Grid container spacing={4}>
          {data.map((item, index) => (
            <Grid key={index} item xs className='flex items-center gap-4'>
              <CustomAvatar color={item.color} variant='rounded' size={40} skin='light'>
                <i className={item.icon}></i>
              </CustomAvatar>
              <div className='flex flex-col'>
                <Typography variant='h5'>{item.stats}</Typography>
                <Typography variant='body2'>{item.title}</Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
