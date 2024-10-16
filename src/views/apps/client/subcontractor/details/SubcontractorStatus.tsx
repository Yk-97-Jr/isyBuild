import React, { useState } from 'react'
import { Card, CardHeader, CardContent, Divider, Typography, Switch } from '@mui/material'
import type { FieldError, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import type { FormValidateSubcontractorEditType } from '@/views/apps/admin/subcontractor/details/schemaSubcontractorEdit'
import type { LotSimpleRead, SubcontractorRead } from '@/services/IsyBuildApi'
import SelectMultiple from './SelectMultiple'

type ClientStatusProps = {
  register: UseFormRegister<FormValidateSubcontractorEditType>
  setValue: UseFormSetValue<FormValidateSubcontractorEditType>
  errors: {
    is_active?: FieldError
  }
  subcontractorData: SubcontractorRead | undefined
  selectedLotIds: LotSimpleRead[]
}

const SubcontractorStatus: React.FC<ClientStatusProps> = ({ register, setValue, errors, subcontractorData, selectedLotIds }) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false)

  const handleSelectToggle = (open: boolean) => {
    setIsSelectOpen(open)
  }
 
  return (
    <Card className='mbe-12'
      sx={{
        height: isSelectOpen ? '500px' : '266px', 
        transition: 'height 0.3s ease',
        display: 'flex',
        flexDirection: 'column'
      }}>
      <CardHeader title='Détails' />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <div className='flex flex-grow flex-col'>
        <SelectMultiple 
  onToggleMenu={handleSelectToggle} 
  register={register} 
  selectedLotIds={selectedLotIds} 
  setValue={setValue} 
/>
          <div style={{ flexGrow: 1 }}></div>
          <Divider className='mlb-2' />
          <div className='flex items-center justify-between mbe-6'>
            <Typography>Statut</Typography>
            <Switch {...register('is_active')} />
            {errors.is_active && <span>{errors.is_active.message}</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default SubcontractorStatus
