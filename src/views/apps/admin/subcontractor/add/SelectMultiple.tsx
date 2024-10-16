'use client' // Add this line at the very top

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Chip from '@mui/material/Chip'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

// Component Imports
import type { SelectChangeEvent } from '@mui/material'
import type { UseFormRegister } from 'react-hook-form'

import CustomTextField from '@core/components/mui/TextField'
import { useLotsRetrieveQuery } from '@/services/IsyBuildApi'
import type { FormValidateSubcontractorAddType } from './SchemaSubcontractorAdd'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      overflowY: 'auto' as const
    },
    sx: {
      '::-webkit-scrollbar': { display: 'none' },
      scrollbarWidth: 'none'
    }
  }
}

const SelectMultiple = ({
  onToggleMenu,
  register
}: {
  onToggleMenu: (open: boolean) => void
  register: UseFormRegister<FormValidateSubcontractorAddType>
}) => {
  const [page] = useState(1)
  const [pageSize] = useState(10)
  const [selectedLotNames, setSelectedLotNames] = useState<string[]>([])

  const { data, refetch } = useLotsRetrieveQuery({ page, pageSize })

  useEffect(() => {
    refetch()
  }, [page, pageSize, refetch])

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const selectedNames = event.target.value as string[]

    setSelectedLotNames(selectedNames)
  }

  return (
    <div className='flex gap-4 flex-col mbe-6'>
      <CustomTextField
        select
        fullWidth
        label=''
        value={selectedLotNames.length > 0 ? selectedLotNames : []}
        id='lots_ids'
        {...register('lots_ids')}
        SelectProps={{
          multiple: true,
          MenuProps,
          onChange: handleChange,
          onOpen: () => onToggleMenu(true),
          onClose: () => onToggleMenu(false),
          renderValue: selected => (
            <div className='flex flex-wrap gap-1'>
              {(selected as number[]).map(value => {
                const lot = data?.results?.find(lot => lot.id === value)


return lot ? <Chip key={value} label={lot.name} size='small' /> : null
              })}
            </div>
          )
        }}
      >
        {data?.results ? (
          data.results.map(lot => (
            <MenuItem key={lot.id} value={lot.id}>
              <Typography>{lot.name}</Typography>
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>Loading lots...</MenuItem>
        )}
      </CustomTextField>
    </div>
  )
}

export default SelectMultiple
