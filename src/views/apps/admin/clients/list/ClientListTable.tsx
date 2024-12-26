'use client'

// React Imports
import React, {useEffect, useState, useMemo} from 'react'

import {useRouter} from 'next/navigation'

import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import type {TextFieldProps} from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

// Third-party Imports
import classnames from 'classnames'
import {rankItem} from '@tanstack/match-sorter-utils'
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
import type {
  ColumnDef, FilterFn, SortingState
} from '@tanstack/react-table'
import type {RankingInfo} from '@tanstack/match-sorter-utils'

// Type Imports
import Box from '@mui/material/Box'

import {CircularProgress} from '@mui/material'

import CardHeader from "@mui/material/CardHeader";

import TablePaginationComponent from '@components/TablePaginationComponent'


import CustomTextField from '@core/components/mui/TextField'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import ClientDialog from '@components/dialogs/client-dialog'

import type {ClientRead} from '@/services/IsyBuildApi'

import {useAuth} from '@/contexts/AuthContext'
import TableFilters from "@views/apps/admin/clients/list/TableFilters";

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }

  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type ClientTypeWithAction = ClientRead & {
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

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)}/>
}

// Column Definitions
const columnHelper = createColumnHelper<ClientTypeWithAction>()

const ClientListTable = ({
                           data,
                           page,
                           setPage,
                           setPageSize,
                           pageSize,
                           countRecords,
                           isFetching,
                           refetch,
                           setSearch,
                           search,
                           setIsActive,
                           isActive,
                           setSorting,
                           sorting
                         }: {
  data?: ClientRead[]
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  countRecords?: number
  refetch: () => void
  isFetching: boolean
  setSearch: React.Dispatch<React.SetStateAction<string>>
  search: string
  setIsActive: React.Dispatch<React.SetStateAction<string | null>>
  isActive: string | null
  sorting: SortingState
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>
}) => {
  // States
  const [rowSelection, setRowSelection] = useState({})
  const [id, setId] = useState(0)
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const {user} = useAuth() // Get the user from AuthContext
  const userRole = user?.role


  const handleEditClient = (id: number) => {
    router.push(`/${userRole}/clients/${id}/details`);
  }

  const handleDeleteClient = (id: number) => {
    setOpen(true)
    setId(id)
  }

  const handleAddClient = () => {
    router.push(`/${userRole}/clients/add`)
  }

  const columns = useMemo<ColumnDef<ClientTypeWithAction, any>[]>(
    () => [
      columnHelper.accessor('name', {
        header: 'Nom',
        cell: ({row}) => (
          <div className='flex items-center gap-4'>
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {`${row.original.name}`}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('siren_number', {
        header: 'Siren',
        cell: ({row}) => (
          <div className='flex items-center gap-4'>
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {`${row.original.siren_number}`}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('contact_email', {
        header: 'Email',
        cell: ({row}) => (
          <div className='flex items-center gap-4'>
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {`${row.original.contact_email}`}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('phone_number', {
        header: 'Numéro de Telephone',
        cell: ({row}) => (
          <div className='flex items-center gap-4'>
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {`${row.original.phone_number}`}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('is_active', {
        header: 'Status',
        cell: ({row}) => (
          <Chip
            variant='tonal'
            label={row.original.is_active ? 'Active' : 'Inactive'}
            color={row.original.is_active ? 'success' : 'secondary'}
          />
        )
      }),
      columnHelper.accessor('created_at', {
        header: 'Date de Creation',
        cell: ({row}) => (
          <Typography>
            {row.original.created_at
              ? `${new Date(row.original.created_at).toLocaleDateString()} ${new Date(row.original.created_at).toLocaleTimeString()}`
              : 'Date not available'}
          </Typography>
        )
      }),


      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({row}) => (
          <div className='flex items-center'>
            <IconButton onClick={() => handleEditClient(row.original.id)}>
              <i className='tabler-edit text-textSecondary'/>
            </IconButton>
            <IconButton onClick={() => handleDeleteClient(row.original.id)}>
              <i className='tabler-trash text-textSecondary'/>
            </IconButton>

          </div>
        ),
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  )

  const table = useReactTable({
    data: data as ClientRead[],
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
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
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
        <TableFilters setIsActive={setIsActive} isActive={isActive}/>
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
          <CustomTextField
            select
            value={table.getState().pagination.pageSize}
            onChange={e => setPageSize(Number(e.target.value))}
            className='max-sm:is-full sm:is-[70px]'
          >
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='25'>25</MenuItem>
            <MenuItem value='50'>50</MenuItem>
          </CustomTextField>
          <div className='flex flex-col sm:flex-row max-sm:is-full items-start sm:items-center gap-4'>
            <DebouncedInput
              value={search}
              onChange={value => {
                setSearch(String(value))
              }}
              placeholder='Rechercher un client'
              className='max-sm:is-full'
            />
            <Button
              variant='contained'
              className='max-sm=is-full'
              startIcon={<i className='tabler-plus'/>}
              onClick={handleAddClient}
            >
              Ajouter Client
            </Button>
          </div>
        </div>
        <div className='overflow-x-auto'>
          {isFetching ? (
            <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
              <CircularProgress/>
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
                              asc: <i className='tabler-chevron-up text-xl'/>,
                              desc: <i className='tabler-chevron-down text-xl'/>
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
                      <tr key={row.id} className={classnames({selected: row.getIsSelected()})}>
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
      <ClientDialog open={open} setOpen={setOpen} id={id} setId={setId} refetch={refetch}/>
    </>
  )
}

export default ClientListTable
