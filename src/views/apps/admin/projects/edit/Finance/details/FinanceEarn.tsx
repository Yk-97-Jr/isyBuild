// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'


import { Divider } from '@mui/material'

import type {FinanceRead} from '@/services/IsyBuildApi'
import LabeledData from '@/components/LabledData'

const FinanceEarn = ({ data }: { data?: FinanceRead }) => {

  return (
    <Card>
    <CardHeader title="Informations de Paiement" />
    <CardContent className="flex flex-col gap-[1.638rem]">
      <LabeledData label="Marches" value={`${data?.total_contract}€`} />
      <LabeledData label="Prorata" value={`${data?.total_prorata}€`} />
      <LabeledData label="Total TS Travaux" value={`${data?.total_ts_travaux}€`} />
      <LabeledData label="Total TS Choix" value={`${data?.total_ts_choix}€`} />
      <LabeledData label="Total TS TMA" value={`${data?.total_ts_tma}€`} />
      <LabeledData label="Marches+TS" value={`${data?.total_markets_plus_ts}€`} />
      <LabeledData label="CIE" value={`${data?.total_cie}€`} />
      <LabeledData label="Retenue Garantie" value={`${data?.total_retention_guarantee}€`} />
      <Divider />
      <LabeledData label="Total" value={`${data?.total_final_amount}€`} />
    </CardContent>
  </Card>
  )
}

export default FinanceEarn
