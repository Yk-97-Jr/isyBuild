'use client'

// React Imports
import React, {useEffect, useState, useMemo} from 'react'

// MUI Imports
import {useParams, useRouter} from "next/navigation";

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'

// import IconButton from '@mui/material/IconButton'
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
  getSortedRowModel,
} from '@tanstack/react-table'
import type {ColumnDef, FilterFn, SortingState} from '@tanstack/react-table'
import type {RankingInfo} from '@tanstack/match-sorter-utils'

// Type Imports

import {CircularProgress} from '@mui/material'

import IconButton from "@mui/material/IconButton";

import TablePaginationComponent from '@components/TablePaginationComponent'

import UserDialog from '@components/dialogs/user-dialog'

import CustomTextField from '@core/components/mui/TextField'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import {useAuth} from "@/contexts/AuthContext";
import type {SuiviAdministrativeRead, SuiviAdministrativeStatusEnum} from "@/services/IsyBuildApi";
import {getStatusProps} from "@/utils/statusHelper";
import {SuiviAdministrativeStatusMapping} from "@/utils/statusEnums";
import TableFilters
  from "@views/apps/admin/projects/edit/GestionAdministartive/GestionAdministrativeList/TableFilters";
import { formatDate } from '@/utils/formatDate';


declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }

  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type SuiviAdministrativeReadWithAction = SuiviAdministrativeRead & {
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
const columnHelper = createColumnHelper<SuiviAdministrativeReadWithAction>()

const GestionAdministrativeListTable = ({
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
                                              setStatus,
                                              status,
                                              setSorting,
                                              sorting
                                            }: {
  data?: SuiviAdministrativeRead[]

  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  countRecords?: number
  refetch: () => void
  isFetching: boolean
  setSearch: React.Dispatch<React.SetStateAction<string>>
  search: string
  setStatus: React.Dispatch<React.SetStateAction<string | undefined>>
  status: string | undefined
  sorting: SortingState
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>
}) => {
  // States
  const [rowSelection, setRowSelection] = useState({})
  const [id, setId] = useState(0)
  const [open, setOpen] = useState(false)
  const router = useRouter();
  const {user} = useAuth();  // Get the user from AuthContext
  const userRole = user?.role
  const {edit: projectId} = useParams();  // Renamed the route parameter variable


  const handleEdit = (id: number) => {
    console.log('helooooooooooooooo')
    router.push(`/${userRole}/projects/${projectId}/details/gestionAdministrative/${id}`);
  }


  const columns = useMemo<ColumnDef<SuiviAdministrativeReadWithAction, any>[]>(
    () => [
      columnHelper.accessor('project_lot.lot.name', {
        header: 'Nom',
        cell: ({row}) => {
          const name = row.original.project_lot.lot.name

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
        header: `Date de Creation`,
        cell: ({ row }) => (
          <Typography>
             {formatDate(row.original.created_at)} 
          </Typography>
        ),
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
        cell: ({row}) => {
          const {
            label,
            color
          } = getStatusProps<SuiviAdministrativeStatusEnum>(row.original.status, SuiviAdministrativeStatusMapping);

          return <Chip variant="tonal" label={label}
                       color={color as "default" | "primary" | "secondary" | "error" | "success" | "warning" | "info"}/>;
        }

      }),
      columnHelper.accessor('project_lot.folder.documents', {
        header: 'DOCUMENT TELECHARGÉ',
        cell: ({row}) => (
          <Chip
            variant='tonal'
            label={row.original.project_lot.folder && row.original.project_lot.folder.documents.length > 0 ? 'Existé' : 'Non existé'}
            color={row.original.project_lot.folder && row.original.project_lot.folder.documents.length > 0 ? 'success' : 'error'}
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

          </div>
        ),
        enableSorting: false
      }),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, data]
  )

  const table = useReactTable({
    data: data as SuiviAdministrativeRead[],
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
        <TableFilters setStatus={setStatus} status={status}/>
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
          <CustomTextField
            select
            value={pageSize}
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
              placeholder='Rechercher Lot'
              className='max-sm:is-full'
            />
          </div>
        </div>
        <div className='overflow-x-auto'>
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
            {isFetching ? (
              <tbody>
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                  <CircularProgress/>
                </td>
              </tr>
              </tbody>
            ) : (table.getFilteredRowModel().rows.length === 0 ? (
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
            ))}
          </table>

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
      <UserDialog
        open={open}
        setOpen={setOpen}
        id={id}
        setId={setId}
        refetch={refetch}
      />
    </>
  )
}

export default GestionAdministrativeListTable
