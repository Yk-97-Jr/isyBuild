'use client'

// React Imports
import {useEffect, useState, useMemo} from 'react'

// Next Imports
import Link from 'next/link'
import {useParams} from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import {styled} from '@mui/material/styles'
import TablePagination from '@mui/material/TablePagination'
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
import TablePaginationComponent from '@components/TablePaginationComponent'

import type {Locale} from '@configs/i18n'


import type {ThemeColor} from '@core/types'


// Component Imports
import TableFilters from './TableFilters'
import AddUserDrawer from './AddUserDrawer'
import OptionMenu from '@core/components/option-menu'
import UserDialog from '@components/dialogs/delete-dialog'

import CustomTextField from '@core/components/mui/TextField'
import CustomAvatar from '@core/components/mui/Avatar'

// Util Imports
import {getInitials} from '@/utils/getInitials'
import {getLocalizedUrl} from '@/utils/i18n'

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

type UserRoleType = {
  [key: string]: { icon: string; color: string }
}

type UserStatusType = {
  [key: string]: ThemeColor
}

// Styled Components
const Icon = styled('i')({})

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

const UserListTable = ({tableData}: { tableData?: UsersType[] }) => {
  // States
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState(...[tableData])
  const [id, setId] = useState()
  const [editValue, setEditValue] = useState<string>('')
  const [open, setOpen] = useState(false)
  const [filteredData, setFilteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')

  // Vars
  const buttonProps: ButtonProps = {
    variant: 'contained',
    children: 'Add User',
    onClick: () => handleAddUser(),
    className: 'max-sm:is-full',
    startIcon: <i className='tabler-plus'/>
  }

  // Hooks
  const {lang: locale} = useParams()

  const handleEditUser = (data: string) => {
    setOpen(true)
    setEditValue(data)
  }

  const handleAddUser = () => {
    setEditValue('')
  }

  const handleDeleteUser = (id: number) => {
    setOpen(true)
    setId(id)
  }


  const columns = useMemo<ColumnDef<UsersTypeWithAction, any>[]>(
    () => [
      {
        id: 'select',
        header: ({table}) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({row}) => (
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      columnHelper.accessor('Nom', {
        header: 'Nom',
        cell: ({row}) => (
          <div className='flex items-center gap-4'>
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {console.log(row)}
                {`${row.original.user.first_name} ${row.original.user.last_name}`}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('Email', {
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
      columnHelper.accessor('date_joined', {
        header: 'Date Joined',
        cell: ({row}) => (
          <Typography>{new Date(row.original.user.date_joined).toLocaleDateString()}</Typography>
        )
      }),
      columnHelper.accessor('is_active', {
        header: 'Active',
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
            <IconButton onClick={() => handleDeleteUser(row.original.user.id)}>
              <i className='tabler-trash text-textSecondary'/>
            </IconButton>
            <IconButton>
              {/*<Link href={getLocalizedUrl('/apps/user/view', locale as Locale)} className='flex'>*/}
              {/*  <i className='tabler-eye text-textSecondary' />*/}
              {/*</Link>*/}
            </IconButton>
            <OptionMenu
              iconButtonProps={{size: 'medium'}}
              iconClassName='text-textSecondary'
              options={[
                {
                  text: 'Modifier',
                  icon: 'tabler-download',
                  menuItemProps: {
                    className: 'flex items-center gap-2 text-textSecondary',
                    onClick: () => handleEditUser(row.original.user),
                  }
                },
                {
                  text: 'Suspendre',
                  icon: 'tabler-edit',
                  menuItemProps: {className: 'flex items-center gap-2 text-textSecondary'}
                }
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
        pageSize: 10
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

  const getAvatar = (params: Pick<UsersType, 'avatar' | 'fullName'>) => {
    const {avatar, fullName} = params

    if (avatar) {
      return <CustomAvatar src={avatar} size={34}/>
    } else {
      return <CustomAvatar size={34}>{getInitials(fullName as string)}</CustomAvatar>
    }
  }

  return (
    <>
      <Card>
        {/*<CardHeader title='Filters' className='pbe-4'/>*/}
        {/*<TableFilters setData={setFilteredData} tableData={data.result}/>*/}
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
          <CustomTextField
            select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
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
              placeholder='Search User'
              className='max-sm:is-full'
            />
            <OpenDialogOnElementClick
              element={Button}
              elementProps={buttonProps}
              dialog={UserDialog}
              dialogProps={{editValue}}
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
        </div>
        <TablePagination
          component={() => <TablePaginationComponent table={table}/>}
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page)
          }}
        />
      </Card>
      {/*<AddUserDrawer*/}
      {/*  open={addUserOpen}*/}
      {/*  handleClose={() => setAddUserOpen(!addUserOpen)}*/}
      {/*  userData={data}*/}
      {/*  setData={setData}*/}
      {/*/>*/}
      <UserDialog open={open} setOpen={setOpen} id={id} setId={setId} editValue={editValue} setEditValue={setEditValue}/>
    </>
  )
}

export default UserListTable
