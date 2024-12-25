// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import type {FinanceRead} from '@/services/IsyBuildApi'





const FinanceEarn = ({ data }: { data?: FinanceRead }) => {

  console.log(data);
  
  return (
    <Card>
      <CardHeader
        title={data?.project_lot.lot.name}
      />
      <CardContent className='flex flex-col gap-[1.638rem]'>
          <div className='flex items-center gap-4'>
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
              <div className='flex flex-col'>
                <Typography className='font-medium' color='text.primary'>
                  {"total_ts_travaux"}
                </Typography>
              </div>
              <Typography>{`${data?.total_ts_travaux}$`}</Typography>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
              <div className='flex flex-col'>
                <Typography className='font-medium' color='text.primary'>
                  {"total_ts_tma"}
                </Typography>
              </div>
              <Typography>{`${data?.total_ts_tma}$`}</Typography>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
              <div className='flex flex-col'>
                <Typography className='font-medium' color='text.primary'>
                  {"total_ts_choix"}
                </Typography>
              </div>
              <Typography>{`${data?.total_ts_choix}$`}</Typography>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
              <div className='flex flex-col'>
                <Typography className='font-medium' color='text.primary'>
                  {"total_retention_guarantee"}
                </Typography>
              </div>
              <Typography>{`${data?.total_retention_guarantee}$`}</Typography>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
              <div className='flex flex-col'>
                <Typography className='font-medium' color='text.primary'>
                  {"total_prorata"}
                </Typography>
              </div>
              <Typography>{`${data?.total_prorata}$`}</Typography>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
              <div className='flex flex-col'>
                <Typography className='font-medium' color='text.primary'>
                  {"total_markets_plus_ts"}
                </Typography>
              </div>
              <Typography>{`${data?.total_markets_plus_ts}$`}</Typography>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
              <div className='flex flex-col'>
                <Typography className='font-medium' color='text.primary'>
                  {"total_final_amount"}
                </Typography>
              </div>
              <Typography>{`${data?.total_final_amount}$`}</Typography>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
              <div className='flex flex-col'>
                <Typography className='font-medium' color='text.primary'>
                  {"total_contract"}
                </Typography>
              </div>
              <Typography>{`${data?.total_contract}$`}</Typography>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
              <div className='flex flex-col'>
                <Typography className='font-medium' color='text.primary'>
                  {"total_cie"}
                </Typography>
              </div>
              <Typography>{`${data?.total_cie}$`}</Typography>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
              <div className='flex flex-col'>
                <Typography className='font-medium' color='text.primary'>
                  {"payment_cumulated"}
                </Typography>
              </div>
              <Typography>{`${data?.payment_cumulated}$`}</Typography>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
              <div className='flex flex-col'>
                <Typography className='font-medium' color='text.primary'>
                  {"payment_cumulated_percentage"}
                </Typography>
              </div>
              <Typography>{`${data?.payment_cumulated_percentage}$`}</Typography>
            </div>
          </div>
          
          

      </CardContent>
    </Card>
  )
}

export default FinanceEarn
