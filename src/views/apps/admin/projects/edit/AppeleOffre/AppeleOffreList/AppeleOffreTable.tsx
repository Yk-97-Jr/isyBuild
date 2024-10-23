'use client'

// React Imports
import React, {useEffect, useState, useMemo} from 'react'


// MUI Imports
import {useParams, useRouter} from "next/navigation";

import Card from '@mui/material/Card'

import Button from '@mui/material/Button'

import Typography from '@mui/material/Typography'

import Chip from '@mui/material/Chip'

import IconButton from '@mui/material/IconButton'

import type {TextFieldProps} from '@mui/material/TextField'

import MenuItem from '@mui/material/MenuItem'

import Box from '@mui/material/Box'

import {CircularProgress} from '@mui/material'


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

import type {ColumnDef, FilterFn} from '@tanstack/react-table'

import type {RankingInfo} from '@tanstack/match-sorter-utils'

// Custom Components
import TablePaginationComponent from '@components/TablePaginationComponent'


import CustomTextField from '@core/components/mui/TextField'

// import ProjectDialog from './ProjectDialog'

// Styles
import tableStyles from '@core/styles/table.module.css'

// Types
import type {ProjectLotRead} from '@/services/IsyBuildApi'
import ProjectLotDialog from "@components/dialogs/project-lots-dialog";
import {useAuth} from "@/contexts/AuthContext";

// Context

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }

  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type ClientTypeWithAction = ProjectLotRead & {
  action?: string
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)

  addMeta({itemRank})

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

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)}/>
}

const columnHelper = createColumnHelper<ClientTypeWithAction>()

const AppeleOffreTable = ({
                            data,
                            page,
                            setPage,
                            setPageSize,
                            pageSize,
                            refetch,
                            countRecords,
                            isFetching,
                          }: {
  data?: ProjectLotRead[]
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  countRecords?: number
  refetch: () => void
  isFetching: boolean
}) => {
  const [rowSelection, setRowSelection] = useState({})
  const [id, setId] = useState<number | undefined>(undefined);
  const [open, setOpen] = useState(false)
  const [filteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')
  const router = useRouter();
  const {user} = useAuth();  // Get the user from AuthContext
  const userRole = user?.role
  const {edit: projectId} = useParams();  // Renamed the route parameter variable


  const handleEdit = (id: number) => {
    router.push(`/${userRole}/projects/${projectId}/details/${id}`);

  }

  const handleDelete = (id: number) => {
    setOpen(true)
    setId(id)
  }

  //
  const handleAdd = () => {
    setOpen(true)

  }

  const columns = useMemo<ColumnDef<ClientTypeWithAction, any>[]>(
    () => [
      columnHelper.accessor('lot.name', {
        header: 'Nom',
        cell: ({row}) => {
          const name = row.original.lot.name

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
      columnHelper.accessor('created_by', {
        header: 'Creé par',
        cell: ({row}) => (
          <div className='flex items-center gap-1'>
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {row.original.created_by
                  ? `${row.original.created_by.first_name} ${row.original.created_by.last_name}`
                  : 'Données non disponible'}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('status', {
        header: 'status',
        cell: ({row}) => (
          <Chip
            variant='tonal'
            label={row.original.status ? row.original.status : 'completed'}
            color={row.original.status ? 'warning' : 'secondary'}
          />
        )
      }),
      columnHelper.accessor('folder.documents', {
        header: 'DOCUMENT TELECHARGÉ',
        cell: ({row}) => (
          <Chip
            variant='tonal'
            label={row.original.folder && row.original.folder.documents.length > 0 ? 'Existé' : 'Non existé'}
            color={row.original.folder && row.original.folder.documents.length > 0 ? 'success' : 'error'}
          />

        )
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({row}) => (
          <div className='flex items-center'>
            <IconButton onClick={() => handleEdit(row.original.id)}>
              <i className='tabler-eye text-textSecondary'/>
            </IconButton>
            <IconButton onClick={() => handleDelete(row.original.id)}>
              <i className='tabler-trash text-textSecondary'/>
            </IconButton>

          </div>
        ),
        enableSorting: false
      }),
    ],
    []
  )

  const table = useReactTable({
    data: filteredData as ProjectLotRead[],
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
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder={`chercher un Projet`}
              className='max-sm:is-full'
            />
            <Button variant='contained' className='max-sm=is-full' startIcon={<i className='tabler-plus'/>}
                    onClick={handleAdd}>
              Assigne Lot
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
          currentPage={page}
          onPageChange={newPage => {
            setPage(newPage)
          }}
        />
      </Card>
      <ProjectLotDialog open={open} setOpen={setOpen} id={id} setId={setId} refetch={refetch}/>
    </>
  )
}

export default AppeleOffreTable
