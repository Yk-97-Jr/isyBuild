'use client' // Add this line at the very top

// React Imports

import { useEffect, useState } from 'react'

// MUI Imports
import Chip from '@mui/material/Chip'
import MenuItem from '@mui/material/MenuItem'

// Component Imports
import type { SelectChangeEvent } from '@mui/material'
import { Typography } from '@mui/material'

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
      overflowY: 'auto' as const // Explicitly specify the type for overflowY
    },
    sx: {
      '::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar for Chrome, Safari, and Edge
      scrollbarWidth: 'none' // Hide scrollbar for Firefox
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

  // Pass parameters to the query hook
  const { data, refetch } = useLotsRetrieveQuery({ page, pageSize })

  useEffect(() => {
    refetch()
  }, [page, pageSize, refetch])

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const selectedNames = event.target.value as string[]

    // Update names state
    setSelectedLotNames(selectedNames)
  }

  return (
    <div className='flex gap-4 flex-col mbe-6'>
      <div>
        <CustomTextField
          select
          fullWidth
          label=''
          value={selectedLotNames}
          id={`$`}
          {...register('lots_ids')}
          SelectProps={{
            multiple: true,
            MenuProps,
            onChange: handleChange,
            onOpen: () => onToggleMenu(true), // Notify parent that menu is open
            onClose: () => onToggleMenu(false), // Notify parent that menu is closed
            renderValue: selected => (
              <div className='flex flex-wrap gap-1'>
                {(selected as number[]).map(value => {
                  const lot = data?.results.find(lot => lot.id === value)

                  return lot ? (
                    <Chip key={value} label={lot.name} size='small' /> // Show name instead of ID
                  ) : null
                })}
              </div>
            )
          }}
        >
          {data?.results.map(lots => {
            return (
              <MenuItem key={lots.id} value={lots.id}>
                <Typography>{lots.name}</Typography>
              </MenuItem>
            )
          })}
        </CustomTextField>
      </div>
    </div>
  )
}

export default SelectMultiple
