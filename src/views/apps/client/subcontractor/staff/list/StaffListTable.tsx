'use Client'

// React Imports
import React, { useState, useMemo } from 'react'

import { useParams, useRouter } from 'next/navigation'

import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'

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
import type { ColumnDef, FilterFn } from '@tanstack/react-table'
import type { RankingInfo } from '@tanstack/match-sorter-utils'

// Type Imports
import Box from '@mui/material/Box'

import { CardHeader, CircularProgress } from '@mui/material'

import StaffDialog from '@components/dialogs/SubcontractorStaff-dialog/'

import TablePaginationComponent from '@components/TablePaginationComponent'

import OptionMenu from '@core/components/option-menu'

import CustomTextField from '@core/components/mui/TextField'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

import type { SubcontractorStaffRead } from '@/services/IsyBuildApi'

import { useAuth } from '@/contexts/AuthContext'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }

  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type SubcontractorStaffTypeWithAction = SubcontractorStaffRead & {
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

// Column Definitions
const columnHelper = createColumnHelper<SubcontractorStaffTypeWithAction>()

const StaffListTable = ({
  data,
  page,
  setPage,
  setPageSize,
  pageSize,
  countRecords,
  isFetching,
  refetch
}: {
  data?: SubcontractorStaffRead[]
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  countRecords?: number
  refetch: () => void
  isFetching: boolean
}) => {
  // States
  const [rowSelection, setRowSelection] = useState({})
  const [id, setId] = useState(0)
  const [open, setOpen] = useState(false)
  const [filteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')
  const router = useRouter()
  const { user } = useAuth() // Get the user from AuthContext
  const userRole = user?.role
  const { id: staffId } = useParams()

  const handleEditSubcontractorStaff = (id: number) => {
    router.push(`/${userRole}/subcontractor/${staffId}/details/${id}`)
  }

  const handleDeleteSubcontractorStaff = (id: number) => {
    setOpen(true)
    setId(id)
  }

  const handleAddSubcontractorStaff = () => {
    router.push(`/${userRole}/subcontractor/${staffId}/details/add`)
  }

  const columns = useMemo<ColumnDef<SubcontractorStaffTypeWithAction, any>[]>(
    () => [
      columnHelper.accessor('user', {
        header: 'Enterprise',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {`${row.original.user.first_name} ${row.original.user.last_name}`}
              </Typography>
              <Typography variant='subtitle2' fontWeight='normal'>
                {`${row.original.user.email}`}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('user.is_active', {
        header: 'Status',
        cell: ({ row }) => (
          <Chip
            variant='tonal'
            label={row.original.user.is_active ? 'Active' : 'Inactive'}
            color={row.original.user.is_active ? 'success' : 'error'}
          />
        )
      }),

      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center float-end'>
            <IconButton onClick={() => handleDeleteSubcontractorStaff(row.original.id)}>
              <i className='tabler-trash text-textSecondary' />
            </IconButton>
            <OptionMenu
              iconButtonProps={{ size: 'medium' }}
              iconClassName='text-textSecondary'
              options={[
                {
                  text: 'Détail',
                  menuItemProps: {
                    className: 'flex items-center gap-2 text-textSecondary',
                    onClick: () => handleEditSubcontractorStaff(row.original.id)
                  }
                }

                // {
                //   text: 'Suspendre',
                //   icon: 'tabler-download',
                //   menuItemProps: {className: 'flex items-center gap-2 text-textSecondary'}
                // }
              ]}
            />
          </div>
        ),
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, filteredData]
  )

  const table = useReactTable({
    data: filteredData as SubcontractorStaffRead[],
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
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
        <CardHeader title='Équipe' className='mlb-4' />
        {/*<TableFilters setData={setFilteredData} tableData={data.result}/>*/}
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6  gap-4'>
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
            <Button
              variant='contained'
              className='max-sm=is-full'
              startIcon={<i className='tabler-plus' />}
              onClick={handleAddSubcontractorStaff}
            >
              Ajouter
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
      <StaffDialog open={open} setOpen={setOpen} id={id} setId={setId} refetch={refetch} />
    </>
  )
}

export default StaffListTable
