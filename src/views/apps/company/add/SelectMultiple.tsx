'use client' // Add this line at the very top

// React Imports
import { useState } from 'react'

// MUI Imports
import Chip from '@mui/material/Chip'
import MenuItem from '@mui/material/MenuItem'
import type { SelectChangeEvent } from '@mui/material/Select'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

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

const names = [
  'Travaux de Plomberie',
  'Installation Électrique',
  'Installation HVAC',
  'Finition Intérieure',
  'Finition Intérieure'
]

const SelectMultiple = ({ onToggleMenu }: { onToggleMenu: (open: boolean) => void }) => {
  // States
  const [personName, setPersonName] = useState<string[]>([])

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setPersonName(event.target.value as string[])
  }

  return (
    <div className='flex gap-4 flex-col mbe-6'>
      <div>
        <CustomTextField
          select
          fullWidth
          label='Chip'
          value={personName}
          id='demo-multiple-chip'
          SelectProps={{
            multiple: true,
            MenuProps,
            onChange: handleChange,
            onOpen: () => onToggleMenu(true), // Notify parent that menu is open
            onClose: () => onToggleMenu(false), // Notify parent that menu is closed
            renderValue: selected => (
              <div className='flex flex-wrap gap-1'>
                {(selected as unknown as string[]).map(value => (
                  <Chip key={value} label={value} size='small' />
                ))}
              </div>
            )
          }}
        >
          {names.map(name => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </CustomTextField>
      </div>
    </div>
  )
}

export default SelectMultiple
