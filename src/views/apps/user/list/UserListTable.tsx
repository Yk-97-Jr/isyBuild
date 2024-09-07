'use client'

// React Imports
import React, {useEffect, useState, useMemo} from 'react'


// MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import type {TextFieldProps} from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import type {ButtonProps} from '@mui/material/Button'

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

// Type Imports
import Box from "@mui/material/Box";

import {CircularProgress} from "@mui/material";

import TablePaginationComponent from '@components/TablePaginationComponent'

import OptionMenu from '@core/components/option-menu'
import UserDialog from '@components/dialogs/user-dialog'

import CustomTextField from '@core/components/mui/TextField'


// Style Imports
import tableStyles from '@core/styles/table.module.css'
import type {UsersType} from "@/types/apps/usersType";
import OpenDialogOnElementClick from "@components/dialogs/OpenDialogOnElementClick";


declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }

  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type UsersTypeWithAction = UsersType & {
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
const columnHelper = createColumnHelper<UsersTypeWithAction>()

const UserListTable = ({data, page, setPage, setPageSize, pageSize, countRecords, isFetching, refetch}: {
  data?: UsersType[]
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
  const [editValue, setEditValue] = useState<UsersType>()
  const [addValue, setAddValue] = useState(false)
  const [open, setOpen] = useState(false)
  const [filteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')

  console.log("datalist" + data)
  console.log("pagelist" + page)

  // Vars
  const buttonProps: ButtonProps = {
    variant: 'contained',
    children: 'Ajouter un Utilisateur',
    className: 'max-sm:is-full',
    startIcon: <i className='tabler-plus'/>
  }


  console.log("countRecords" + countRecords)

  const handleEditUser = (user: UsersType) => {
    setOpen(true)
    setEditValue(user)
  }


  const handleDeleteUser = (id: number) => {
    setOpen(true)
    setId(id)
  }


  const columns = useMemo<ColumnDef<UsersTypeWithAction, any>[]>(
    () => [
      columnHelper.accessor('user.first_name', {
        header: 'Nom',
        cell: ({row}) => (
          <div className='flex items-center gap-4'>
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {`${row.original.user.first_name} ${row.original.user.last_name}`}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('user.email', {
        header: 'Email',
        cell: ({row}) => (
          <div className='flex items-center gap-4'>
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {`${row.original.user.email}`}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('user.date_joined', {
        header: `Date d'adhésion`,
        cell: ({row}) => (
          <Typography>{row.original.user.date_joined
            ? new Date(row.original.user.date_joined).toLocaleDateString()
            : 'Date not available'}</Typography>
        )
      }),
      columnHelper.accessor('created_at', {
        header: `Date de Creation`,
        cell: ({row}) => (
          <Typography>{row.original.created_at
            ? new Date(row.original.created_at).toLocaleDateString()
            : 'Date not available'}</Typography>
        )
      }),
      columnHelper.accessor('created_by.first_name', {
        header: 'Creé par',
        cell: ({row}) => (
          <div className='flex items-center gap-4'>
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {`${row.original.created_by.first_name} ${row.original.created_by.last_name}`}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('user.is_active', {
        header: 'Status',
        cell: ({row}) => (
          <Chip
            variant='tonal'
            label={row.original.user.is_active ? 'Active' : 'Inactive'}
            color={row.original.user.is_active ? 'success' : 'secondary'}
          />
        )
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({row}) => (
          <div className='flex items-center'>
            <IconButton onClick={() => handleDeleteUser(row.original.id)}>
              <i className='tabler-trash text-textSecondary'/>
            </IconButton>
            <OptionMenu
              iconButtonProps={{size: 'medium'}}
              iconClassName='text-textSecondary'
              options={[
                {
                  text: 'Modifier',
                  icon: 'tabler-edit',
                  menuItemProps: {
                    className: 'flex items-center gap-2 text-textSecondary',
                    onClick: () => handleEditUser(row.original),
                  }
                },

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
  );

  const table = useReactTable({
    data: filteredData as UsersType[],
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
        {/*<CardHeader title='Filters' className='pbe-4'/>*/}
        {/*<TableFilters setData={setFilteredData} tableData={data.result}/>*/}
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
              placeholder='Rechercher un utilisateur'
              className='max-sm:is-full'
            />
            <OpenDialogOnElementClick
              element={Button}
              elementProps={buttonProps}
              dialog={UserDialog}
              dialogProps={{addValue, setAddValue, refetch}}
            />
          </div>
        </div>
        <div className='overflow-x-auto'>
          {isFetching ? <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
              <CircularProgress/>
            </Box>
            :
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
            </table>}
        </div>

        <TablePaginationComponent
          totalRecords={countRecords}
          pageSize={pageSize}
          currentPage={page} // Pass the currentPage directly
          onPageChange={(newPage) => {
            setPage(newPage)
          }}
        />

      </Card>
      <UserDialog open={open} setOpen={setOpen} id={id} setId={setId} editValue={editValue}
                  setEditValue={setEditValue} setAddValue={setAddValue} refetch={refetch}/>
    </>
  )
}

export default UserListTable
