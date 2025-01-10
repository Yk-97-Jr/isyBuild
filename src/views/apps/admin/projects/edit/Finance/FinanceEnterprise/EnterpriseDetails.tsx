


import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'


import type { ButtonProps } from '@mui/material';
import { Button, Divider } from '@mui/material'


import { useRetrieveFinanceEnterpriseByIdQuery } from '@/services/IsyBuildApi'
import OpenFinanceOnElementClick from '@/components/dialogs/OpenFinanceOnElementClick'
import UpdateFinanceEnterpriseContent from './FinanceEnterpriseUpdate'
import LabeledData from '@/components/LabledData'

type AddFinanceSituationContentProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  refetch: () => void;
};

export const  ActionButton = ({ refetch, ContentData }: { refetch: () => void; ContentData:React.ComponentType<AddFinanceSituationContentProps>; }) => {
  const buttonProps: ButtonProps = {
    variant: 'contained',
    children: 'Modifier',
    startIcon: <i className='tabler-edit' />
  }

  return (
    <OpenFinanceOnElementClick
      element={Button}
      elementProps={buttonProps}
      dialog={ContentData}
      dialogProps={{ refetch }}
    />
  )
}

const FinanceEarn = () => {
  const { idFe } = useParams()
  const { data, refetch } = useRetrieveFinanceEnterpriseByIdQuery({ financeEnterpriseId: +idFe })



  console.log(data)

  return (
    <Card>
      <CardHeader title="Informations Paiement" />
      <CardContent className='flex flex-col gap-[1.638rem]'>
        <LabeledData label="Marches" value={`${data?.total_contract }€`} />
        <LabeledData label="Prorata" value={`${data?.prorata }€`} />
        <LabeledData label="Total ts travaux" value={`${data?.total_ts_travaux }€`} />
        <LabeledData label="Total ts choix" value={`${data?.total_ts_choix }€`} />
        <LabeledData label="Total ts tma" value={`${data?.total_ts_tma }€`} />
        <LabeledData label="Marches+Ts" value={`${data?.markets_plus_ts }€`} />
        <LabeledData label="Cie" value={`${data?.cie }€`} />
        <LabeledData label="Retenue garantie" value={`${data?.retention_guarantee }€`} />
        <Divider/>
        <LabeledData label="Total" value={`${data?.final_amount }€`} />
        <div className='flex justify-center '>
          <ActionButton refetch={refetch} ContentData={UpdateFinanceEnterpriseContent}/>
        </div>
      </CardContent>
    </Card>
  )
}

export default FinanceEarn
