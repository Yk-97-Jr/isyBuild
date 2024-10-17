'use client'

// React Imports
import { useEffect, useState, useRef, useCallback } from 'react'

// MUI Imports
import Chip from '@mui/material/Chip'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'


// Component Imports
import type { SelectChangeEvent } from '@mui/material'
import type {  UseFormSetValue,  UseFormRegister } from 'react-hook-form';

import CustomTextField from '@core/components/mui/TextField'
import type { LotSimpleRead} from '@/services/IsyBuildApi';
import { useLotsRetrieveQuery } from '@/services/IsyBuildApi'
import {  type FormValidateSubcontractorEditType } from './schemaSubcontractorEdit'


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
  register,
  selectedLotIds: initialSelectedIds,
  setValue
}: {
  onToggleMenu: (open: boolean) => void
  register: UseFormRegister<FormValidateSubcontractorEditType>
  selectedLotIds: LotSimpleRead[]
  setValue: UseFormSetValue<FormValidateSubcontractorEditType>
}) => {
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [lots, setLots] = useState<any[]>([])
  const { data, refetch } = useLotsRetrieveQuery({ page, pageSize })

  const observer = useRef<IntersectionObserver | null>(null)

  const lastLotRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && data?.next) {
          setPage(prevPage => prevPage + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [data]
  )

  useEffect(() => {
    if (data?.results) {
      const newLots = data.results.map(lot => ({
        ...lot,
        uniqueKey: `${lot.id}-${Math.random().toString(36).substring(2, 9)}`
      }))

      setLots(prevLots => [...prevLots, ...newLots])
    }
  }, [data])

  useEffect(() => {
    refetch()
  }, [page, pageSize, refetch])

  useEffect(() => {
    const ids = initialSelectedIds.map(lot => lot.id)

    setSelectedIds(ids)
  }, [initialSelectedIds])

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const selectedIds = event.target.value as number[] // cast to number[]

    setSelectedIds(selectedIds)
    setValue('lots_ids', selectedIds)
  }
  

  return (
    <div className='flex gap-4 flex-col mbe-6'>
      <CustomTextField
        select
        fullWidth
        label=''
        value={selectedIds}
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
                const lot = lots.find(lot => lot.id === value)

                
return lot ? <Chip key={value} label={lot.name} size='small' /> : null
              })}
            </div>
          )
        }}
      >
        {lots.map((lot, index) => (
          <MenuItem
            key={lot.uniqueKey}
            value={lot.id}
            ref={index === lots.length - 1 ? lastLotRef : null}
          >
            <Typography>{lot.name}</Typography>
          </MenuItem>
        ))}
        {!data?.results?.length && <MenuItem disabled>Loading lots...</MenuItem>}
      </CustomTextField>
    </div>
  )
}

export default SelectMultiple
