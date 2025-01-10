'use client'

// React Imports
import React, { useEffect, useState, useMemo } from 'react'

import { useRouter } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import type { TextFieldProps } from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import type { ColumnDef, FilterFn, SortingState } from '@tanstack/react-table'
import type { RankingInfo } from '@tanstack/match-sorter-utils'

// Type Imports
import Box from '@mui/material/Box'

import { CardHeader, CircularProgress} from '@mui/material'

import TablePaginationComponent from '@components/TablePaginationComponent'


import LotsDialog from '@components/dialogs/lot-dialog'

import CustomTextField from '@core/components/mui/TextField'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import type { LotsType } from '@/types/apps/usersType'

import type { LotRead } from '@/services/IsyBuildApi'
import Chip from '@/@core/components/mui/Chip'

import { useAuth } from '@/contexts/AuthContext'
import TableClientFilters from "./TableClientFilters"
import { formatDate } from '@/utils/formatDate'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }

  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type LotsTypeWithAction = LotsType &
  LotRead & {
    action?: string
  }

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<TextFieldProps, 'onChange'>) => {
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// Column Definitions
const columnHelper = createColumnHelper<LotsTypeWithAction>()

const LotsListTable = ({
  data,

  page,
  setPage,
  setPageSize,
  pageSize,
  countRecords,
  setClientId,
  clientId,
  isFetching,
  refetch,
  setSearch,
                         search,
                         setSorting,
                         sorting
}: {
  data?: LotRead[]
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  countRecords?: number
  refetch: () => void
  isFetching: boolean
  setClientId: React.Dispatch<React.SetStateAction<string | ''>>;
  clientId: string | ''
  setSearch: React.Dispatch<React.SetStateAction<string>>
  search: string
  sorting: SortingState
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>

}) => {
  // States
  const [rowSelection, setRowSelection] = useState({})
  const [id, setId] = useState(0)
  const [editValue, setEditValue] = useState<LotsType>()
  const [, setAddValue] = useState(false)
  const [open, setOpen] = useState(false)

  const [, setGlobalFilter] = useState('')
  const router = useRouter()

  const { user } = useAuth()
  const userRole = user?.role

  const handleEditLot = (id: number) => {
    router.push(`/${userRole}/lots/${id}/details`)
  }

  const handleDeleteLot = (id: number) => {
    setOpen(true)
    setId(id)
  }

  const handleAddLots = () => {
    router.push(`/${userRole}/lots/add`)
  }

  const columns = useMemo<ColumnDef<LotsTypeWithAction, any>[]>(
    () => [
      columnHelper.accessor('name', {
        header: 'Nom',
        cell: ({ row }) => {
          const name = row.original.name

          // Break the name after 20 characters if it's too long
          const displayName = name.length > 50 ? name.substring(0, 50) + '\n' + name.substring(50) : name

          return (
            <div className='flex items-center gap-4 '>
              <div className='flex flex-col'>
                <Typography color='text.primary' className='font-medium whitespace-pre-wrap break-words'>
                  {`${displayName} `}
                </Typography>
              </div>
            </div>
          )
        }
      }),

      columnHelper.accessor('client', {
        header: 'client',
        cell: ({ row }) => (
          <>
            {row.original?.client?.name ? (
             
              <Chip variant='tonal' label={row.original?.client?.name} color='primary' size="small"
              className="text-sm px-2" />
            ) : (
              <Chip variant='tonal' label={'Aucun client disponible'} color='secondary' 
              size="small"
              className="text-sm px-2"/>
            )}
          </>
        )
      }),

      columnHelper.accessor('description', {
        header: 'description',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {`${row.original.description}`.length > 50
                  ? `${row.original.description.substring(0, 50)}...`
                  : `${row.original.description}`}
              </Typography>
            </div>
          </div>
        )
      }),

      columnHelper.accessor('created_at', {
        header: `Date de Creation`,
        cell: ({ row }) => (
          <Typography>
             {formatDate(row.original.created_at)} 
          </Typography>
        ),
      }),

      columnHelper.accessor('created_by.first_name', {
        header: 'Creé par',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {`${row.original.created_by.first_name} ${row.original.created_by.last_name}`}
              </Typography>
            </div>
          </div>
        )
      }),

      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton onClick={() => handleDeleteLot(row.original.id)}>
              <i className='tabler-trash  text-textSecondary' />
            </IconButton>
            <IconButton onClick={() => handleEditLot(row.original.id)}>
              <i className='tabler-edit text-textSecondary'/>
            </IconButton>
          </div>
        ),
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, data]
  )

  const table = useReactTable({
    data: data as LotRead[],
    columns,
    onSortingChange: setSorting,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      sorting
    },
    initialState: {
      pagination: {
        pageSize: pageSize
      }
    },
    manualSorting: true,
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  return (
    <>
      <Card>
      <CardHeader title='Filters' className='pbe-4'/>
      
      
      <TableClientFilters setClientId={setClientId} clientId={clientId}/> 

      
      
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
          <CustomTextField
            select
            value={table.getState().pagination.pageSize}
            onChange={e => setPageSize(Number(e.target.value))}
            className='max-sm:is-full sm:is-[70px]'
          >
            <MenuItem  value='10'>10</MenuItem>
            <MenuItem value='25'>25</MenuItem>
            <MenuItem value='50'>50</MenuItem>
          </CustomTextField>
          <div className='flex flex-col sm:flex-row max-sm:is-full items-start sm:items-center gap-4'>
            <DebouncedInput
              value={search ?? ''}
              onChange={value => setSearch(String(value))}
              placeholder='Rechercher un lots'
              className='max-sm:is-full'
            />
            <Button
              variant='contained'
              className='max-sm=is-full'
              startIcon={<i className='tabler-plus' />}
              onClick={handleAddLots}
            >
              Ajouter lots
            </Button>
          </div>
        </div>
        <div className='overflow-x-auto'>
          {isFetching ? (
            <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
              <CircularProgress />
            </Box>
          ) : (
            <table className={tableStyles.table}>
              <thead>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th key={header.id}>
                        {header.isPlaceholder ? null : (
                          <>
                            <div
                              className={classnames({
                                'flex items-center': header.column.getIsSorted(),
                                'cursor-pointer select-none': header.column.getCanSort()
                              })}
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {{
                                asc: <i className='tabler-chevron-up text-xl' />,
                                desc: <i className='tabler-chevron-down text-xl' />
                              }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                            </div>
                          </>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              {table.getFilteredRowModel().rows.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                      No data available
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {table
                    .getRowModel()
                    .rows.slice(0, table.getState().pagination.pageSize)
                    .map(row => {
                      return (
                        <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                          {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                          ))}
                        </tr>
                      )
                    })}
                </tbody>
              )}
            </table>
          )}
        </div>

        <TablePaginationComponent
          totalRecords={countRecords}
          pageSize={pageSize}
          currentPage={page} // Pass the currentPage directly
          onPageChange={newPage => {
            setPage(newPage)
          }}
        />
      </Card>
      <LotsDialog
        open={open}
        setOpen={setOpen}
        id={id}
        setId={setId}
        editValue={editValue}
        setEditValue={setEditValue}
        setAddValue={setAddValue}
        refetch={refetch}
      />
    </>
  )
}

export default LotsListTable
