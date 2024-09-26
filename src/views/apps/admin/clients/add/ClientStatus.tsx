// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'

const ClientStatus = () => {
  return (
    <Card>
      <CardHeader title='Détails' />
      <CardContent>
          <Divider className='mlb-2' />
          <div className='flex items-center justify-between'>
            <Typography>status</Typography>
            <Switch defaultChecked />
          </div>
      </CardContent>
    </Card>
  )
}

export default ClientStatus
