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
import type { ColumnDef, FilterFn,  SortingState } from '@tanstack/react-table'
import type { RankingInfo } from '@tanstack/match-sorter-utils'

// Type Imports
import Box from '@mui/material/Box'

import { CardHeader, Chip, CircularProgress, Grid } from '@mui/material'

import TablePaginationComponent from '@components/TablePaginationComponent'

import OptionMenu from '@core/components/option-menu'

import CustomTextField from '@core/components/mui/TextField'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

import type { PaginatedSubcontractortRead, SubcontractorRead } from '@/services/IsyBuildApi'

import CompanyDialog from '@/components/dialogs/company-dialog'

import { useAuth } from '@/contexts/AuthContext'
import TableFilters from '@/views/apps/admin/subcontractor/list/TableFilters'
import TableClientFilters from '@/views/apps/admin/subcontractor/list/TableClientFilters'
import TableLotsFilters from '@/views/apps/admin/subcontractor/list/TableLotsFilters'
import { formatDate } from '@/utils/formatDate'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type CompanyTypeWithAction = PaginatedSubcontractortRead &
  SubcontractorRead & {
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
const columnHelper = createColumnHelper<CompanyTypeWithAction>()

const SubcontractorTable = ({
  data,
  page,
  setPage,
  setPageSize,
  pageSize,
  countRecords,
  isFetching,
  refetch,
  setSorting,
  sorting,
  setIsActive,
                         isActive,
                         setSearch,
  search,
  setClientId,
  clientId,
  setLotsId,
  lotsId,
  
}: {
  data?: SubcontractorRead[]
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  countRecords?: number
  refetch: () => void
  isFetching: boolean
  sorting: SortingState
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>
  setIsActive: React.Dispatch<React.SetStateAction<string | null>>
  isActive: string | null
  setSearch: React.Dispatch<React.SetStateAction<string>>
  search: string
  setClientId: React.Dispatch<React.SetStateAction<string | ''>>;
  clientId: string | ''
  setLotsId: React.Dispatch<React.SetStateAction<string | ''>>;
  lotsId: string | ''
}) => {
  // States
  const [rowSelection, setRowSelection] = useState({})
  const [id, setId] = useState(0)

  const [open, setOpen] = useState(false)
  const [filteredData] = useState(data)
  const [, setGlobalFilter] = useState('')
  const router = useRouter()

  const { user } = useAuth()

  const userRole = user?.role

  const handleEditClient = (id: number) => {
    router.push(`/${userRole}/subcontractor/${id}/details`)

    console.log(id);
    
  }

  const handleDeleteCompany = (id: number) => {
    setOpen(true)
    setId(id)
  }

  const handleAddClient = () => {

    console.log(`/${userRole}/subcontractor/add`)

    router.push(`/${userRole}/subcontractor/add`)
  }

  const columns = useMemo<ColumnDef<CompanyTypeWithAction, any>[]>(
    () => [
      columnHelper.accessor('name', {
        header: 'Enterprise',
        cell: ({ row }) => (
          <div className='flex items-center gap-1'>
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {`${row.original.name} `}
              </Typography>
              <Typography color='text.primary' className='font-medium'>
                {`${row.original.contact_email} `}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('phone_number', {
        header: 'téléphone',
        cell: ({ row }) => (
          <div className='flex items-center gap-0'>
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {`${row.original.phone_number} `}
              </Typography>
              <Typography color='text.primary' className='font-medium'>
                {`${row.original.clients} `}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('siren_number', {
        header: 'numéro de sirène',
        cell: ({ row }) => (
          <div className='flex items-center gap-0'>
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {`${row.original.siren_number}`}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('created_by.id', {
        header: 'propriétaire',
        cell: ({ row }) => (
          <div className='flex items-center gap-0'>
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {`${row.original?.created_by?.first_name} ${row.original?.created_by?.last_name}`}
              </Typography>
              <Typography color='text.primary' className='font-extralight'>
                {`${row.original.created_by?.email} `}
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
      columnHelper.accessor('is_active', {
        header: 'Status',
        cell: ({ row }) => (
          <Chip
            variant='tonal'
            label={row.original.is_active ? 'Active' : 'Inactive'}
            color={row.original.is_active ? 'success' : 'error'}
          />
        )
      }),

      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton onClick={() => handleDeleteCompany(row.original.id)}>
              <i className='tabler-trash text-textSecondary' />
            </IconButton>
            <OptionMenu
              iconButtonProps={{ size: 'medium' }}
              iconClassName='text-textSecondary'
              options={[
                {
                  text: 'Modifier',
                  icon: 'tabler-edit',
                  menuItemProps: {
                    className: 'flex items-center gap-1 text-textSecondary',
                    onClick: () => handleEditClient(row.original.id)
                  }
                }
              ]}
            />
          </div>
        ),
        enableSorting: true
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, filteredData]
  )

  const table = useReactTable({
    data: filteredData as SubcontractorRead[],
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
        <Grid container spacing={6}>
        <Grid item xs={12} sm={4}>
        <TableFilters setIsActive={setIsActive} isActive={isActive}/>
        </Grid>
        <Grid item xs={12} sm={4}>
        <TableClientFilters setClientId={setClientId} clientId={clientId}/> 
        </Grid>
        <Grid item xs={12} sm={4}>
        <TableLotsFilters setLotsId={setLotsId} lotsId={lotsId}/> 
        </Grid>
        
        </Grid>
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
              onChange={value => setSearch(String(value))}
              placeholder='Rechercher '
              className='max-sm:is-full'
            />
            <Button
              variant='contained'
              className='max-sm=is-full'
              startIcon={<i className='tabler-plus' />}
              onClick={handleAddClient}
            >
              Ajouter entreprise
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
      <CompanyDialog open={open} setOpen={setOpen} id={id} setId={setId} refetch={refetch} />
    </>
  )
}

export default SubcontractorTable
