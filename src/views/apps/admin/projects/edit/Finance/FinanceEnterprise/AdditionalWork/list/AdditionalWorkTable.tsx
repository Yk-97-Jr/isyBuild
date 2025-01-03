'use client'

// React Imports
import React, { useState, useMemo} from 'react'

import Card from '@mui/material/Card'
import type { ButtonProps } from '@mui/material/Button';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

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
import type {ColumnDef, FilterFn} from '@tanstack/react-table'
import type {RankingInfo} from '@tanstack/match-sorter-utils'

// Type Imports
import Box from '@mui/material/Box'

import {CardHeader, CircularProgress} from '@mui/material'

import TablePaginationComponent from '@components/TablePaginationComponent'


import CustomTextField from '@core/components/mui/TextField'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import DeleteTsDialog from '@components/dialogs/TSDelete-dialog'

import type {TravailSupplementaireRead} from '@/services/IsyBuildApi'


import OpenFinanceOnElementClick from '@/components/dialogs/OpenFinanceOnElementClick'
import TsAddDialog from '../add/TsAddDialog'
import EditTsContent from '../details/TsEditDialog';




const buttonProps: ButtonProps = {
  variant: 'contained',
  children: 'Ajouter',
  startIcon: <i className='tabler-plus' />
}

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }

  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type FinanceTypeWithAction = TravailSupplementaireRead & {
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
const columnHelper = createColumnHelper<FinanceTypeWithAction>()

const AdditionalWorkTable = ({
                           data,
                           page,
                           setPage,
                           setPageSize,
                           pageSize,
                           countRecords,
                           isFetching,
                           refetch
                         }: {
  data?: TravailSupplementaireRead[]
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
 





  const handleDeleteFinance = (id: number) => {
    
    setOpen(true)
    setId(id)
  }



  const columns = useMemo<ColumnDef<FinanceTypeWithAction, any>[]>(
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
      columnHelper.accessor('amount', {
        header: 'quantité',
        cell: ({row}) => (
          <div className='flex items-center gap-4'>
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {`${row.original.amount}`}
              </Typography>
            </div>
          </div>
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
          <OpenFinanceOnElementClick 
      element={IconButton}
      elementProps={{
        onClick: (e:any) => {
          e.stopPropagation(); // Prevents row selection if table is click-sensitive
        },
        children: <i className="tabler-edit text-textSecondary" />, // Icon as button child
      }}
      dialog={EditTsContent}
      dialogProps={{ 
        refetch , // Pass the refetch function here if necessary
        id: row.original.id,  // Pass the ID from the row data
        initialData: row.original.amount
      }}
    />
            
            <IconButton onClick={() => handleDeleteFinance(row.original.id)}>
              <i className='tabler-trash text-textSecondary'/>
            </IconButton>

          </div>
        ),
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, filteredData]
  )

  const table = useReactTable({
    data: filteredData as TravailSupplementaireRead[],
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
        <CardHeader title='Travail Supplémentaire' className='pbe-4'/>
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
         
                     <OpenFinanceOnElementClick element={Button} elementProps={buttonProps} dialog={TsAddDialog} dialogProps={{ refetch }}/>

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
      <DeleteTsDialog open={open} setOpen={setOpen} id={id} setId={setId} refetch={refetch}/>
    </>
  )
}

export default AdditionalWorkTable
