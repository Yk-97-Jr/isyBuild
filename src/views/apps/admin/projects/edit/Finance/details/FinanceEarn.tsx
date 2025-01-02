// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import { Divider } from '@mui/material'

import type {FinanceRead} from '@/services/IsyBuildApi'

const FinanceEarn = ({ data }: { data?: FinanceRead }) => {

  return (
    <Card>
      <CardHeader
        title="Informations de Paiement"
      />
      <CardContent className='flex flex-col gap-[1.638rem]'>
      <div className='flex items-center gap-4'>
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
              <div className='flex flex-col'>
                <Typography className='font-medium' color='text.primary'>
                  {"Marches"}
                </Typography>
              </div>
              <Typography>{`${data?.total_contract}€`}</Typography>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
              <div className='flex flex-col'>
                <Typography className='font-medium' color='text.primary'>
                  {"Prorata"}
                </Typography>
              </div>
              <Typography>{`${data?.total_prorata}€`}</Typography>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
              <div className='flex flex-col'>
                <Typography className='font-medium' color='text.primary'>
                  {"Total ts travaux"}
                </Typography>
              </div>
              <Typography>{`${data?.total_ts_travaux}€`}</Typography>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
              <div className='flex flex-col'>
                <Typography className='font-medium' color='text.primary'>
                  {"Total ts choix"}
                </Typography>
              </div>
              <Typography>{`${data?.total_ts_choix}€`}</Typography>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
              <div className='flex flex-col'>
                <Typography className='font-medium' color='text.primary'>
                  {"Total ts tma"}
                </Typography>
              </div>
              <Typography>{`${data?.total_ts_tma}€`}</Typography>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
              <div className='flex flex-col'>
                <Typography className='font-medium' color='text.primary'>
                  {"Marches+Ts"}
                </Typography>
              </div>
              <Typography>{`${data?.total_markets_plus_ts}€`}</Typography>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
              <div className='flex flex-col'>
                <Typography className='font-medium' color='text.primary'>
                  {"Cie"}
                </Typography>
              </div>
              <Typography>{`${data?.total_cie}€`}</Typography>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
              <div className='flex flex-col'>
                <Typography className='font-medium' color='text.primary'>
                  {"Retenue garantie"}
                </Typography>
              </div>
              <Typography>{`${data?.total_retention_guarantee}€`}</Typography>
            </div>
          </div>
          <Divider/>
          <div className='flex items-center gap-4'>
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
              <div className='flex flex-col'>
                <Typography className='font-medium' color='text.primary'>
                  {"Marches+Ts+Cie-Proratat-Rg"}
                </Typography>
              </div>
              <Typography>{`${data?.total_final_amount}€`}</Typography>
            </div>
          </div>
      </CardContent>
    </Card>
  )
}

export default FinanceEarn
