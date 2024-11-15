'use client'

// React Imports
import React, { useEffect, useState, useMemo } from 'react'

// MUI Imports
import Card from '@mui/material/Card'

import Button from '@mui/material/Button'

import Typography from '@mui/material/Typography'

import IconButton from '@mui/material/IconButton'

import type { TextFieldProps } from '@mui/material/TextField'

import MenuItem from '@mui/material/MenuItem'

import Box from '@mui/material/Box'

import { CircularProgress } from '@mui/material'

// Third-party Imports
import classnames from 'classnames'

import { rankItem } from '@tanstack/match-sorter-utils'

// import { Status109Enum } from '@/services/IsyBuildApi'

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

// Custom Components
import TablePaginationComponent from '@components/TablePaginationComponent'

import CustomTextField from '@core/components/mui/TextField'

import TeamDialogue from './teamDialogue'

// Styles
import tableStyles from '@core/styles/table.module.css'

// Types
import type { ProjectStaffRead } from '@/services/IsyBuildApi'

// Context

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }

  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type ClientTypeWithAction = ProjectStaffRead & {
  action?: string
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)

  addMeta({ itemRank })

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
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value, onChange, debounce])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

const columnHelper = createColumnHelper<ClientTypeWithAction>()

const TeamTable = ({
  data,
  page,
  setPage,
  setPageSize,
  pageSize,
  countRecords,
  isFetching,
  refetch,
  handleEdit,
  handleDelete,
  status,
  searchValue,
  setSearchValue,
  client_staf_project
}: {
  data?: ProjectStaffRead[]
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  countRecords?: number
  refetch: () => void
  isFetching: boolean
  handleEdit: any
  handleDelete: any
  setTableRows: any
  status: any
  searchValue: any
  setSearchValue: any
  client_staf_project: any
}) => {

    
  const [rowSelection, setRowSelection] = useState({})

  const [open, setOpen] = useState(false)

  const [filteredData] = useState(data)

  console.log(filteredData)
  const [globalFilter, setGlobalFilter] = useState('')

  const [id, setId] = useState<number | undefined>(undefined)

  console.log(client_staf_project)

  const handleAdd = () => {
    setOpen(true)
  }

  useEffect(() => {
    console.log(status)
  }, [status])

  const columns = useMemo<ColumnDef<ClientTypeWithAction, any>[]>(
    () => [
      columnHelper.accessor('id', {
        header: 'User',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {`${row.original.id}`}
              </Typography>
            </div>
          </div>
        )
      }),

      columnHelper.accessor('staff.user.first_name', {
        header: 'User',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {`${row.original.staff.user?.first_name || 'First Name'} ${row.original.staff.user?.last_name || 'Last Name'}`}
              </Typography>
            </div>
          </div>
        )
      }),

      // columnHelper.accessor('created_by', {
      //   header: 'Created By',
      //   cell: ({ row }) => (
      //     <div className='flex items-center gap-4'>
      //       <div className='flex flex-col'>
      //         <Typography color='text.primary' className='font-medium'>
      //           {/* problem in the back end it does not return the created_by object it has been returned as null */}
      //           {/* `${row.original.created_by?.id} */}
      //           back end returns Null
      //         </Typography>
      //       </div>
      //     </div>
      //   )
      // }),

      columnHelper.accessor('role', {
        header: 'time',
        cell: ({ row }) => {
          return (
            <Typography color='text.primary' className='font-medium'>
              {row.original.role}
            </Typography>
          )
        }
      }),

      columnHelper.accessor('created_at', {
        header: 'time',
        cell: ({ row }) => {
          const formattedDate = new Date(row.original.created_at).toLocaleString()

          return <Typography>{formattedDate}</Typography>
        }
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton onClick={() => handleDelete(row.original.id)}>
              <i className='tabler-trash text-textSecondary' />
            </IconButton>
          </div>
        ),
        enableSorting: false
      })
    ],
    [handleDelete, handleEdit]
  )


  const table = useReactTable({
    data: filteredData as ProjectStaffRead[], // find what data  to use here
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
    enableRowSelection: true,
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
              value={searchValue ?? ''}
              onChange={value => setSearchValue(String(value))}
              placeholder={`Search for staff`}
              className='max-sm:is-full'
            />
            <Button
              variant='contained'
              className='max-sm=is-full'
              startIcon={<i className='tabler-plus' />}
              onClick={handleAdd}
            >
              Ajouter Projet
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
          currentPage={page}
          onPageChange={newPage => {
            setPage(newPage)
          }}
        />
      </Card>
      <TeamDialogue
        open={open}
        setOpen={setOpen}
        id={id}
        setId={setId}
        refetch={refetch}
        client_staf_project={client_staf_project}
      />
    </>
  )
}

export default TeamTable
