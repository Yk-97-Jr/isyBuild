'use client'

// React Imports
import React, { useState, useMemo} from 'react'

// MUI Imports
import {useParams, useRouter} from "next/navigation";

import Card from '@mui/material/Card'

import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

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
import type {ColumnDef, FilterFn} from '@tanstack/react-table'
import type {RankingInfo} from '@tanstack/match-sorter-utils'

// Type Imports

import {Chip, CircularProgress} from '@mui/material'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import type { FinanceEnterpriseRead} from '@/services/IsyBuildApi'
import {useAuth} from "@/contexts/AuthContext";
import { DgdStatusMapping } from '@/utils/statusEnums';


declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }

  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type FinanceEnterpriseReadWithAction = FinanceEnterpriseRead & {
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
const columnHelper = createColumnHelper<FinanceEnterpriseReadWithAction>()

const FinanceListTable = ({
                         data,
                         isFetching,
                       }: {
  data?: FinanceEnterpriseRead[]
  isFetching: boolean

}) => {
  // States
  const [rowSelection, setRowSelection] = useState({})
  const router = useRouter();
  const {user} = useAuth();  // Get the user from AuthContext
  const {edit} = useParams()
  const userRole = user?.role
  


  const handleEditUser = (id: number) => {
    
    console.log(`see the idd /${userRole}/projects/${edit}/details/finance/${id}/details`)

    router.push(`/${userRole}/projects/${edit}/details/financeEnterprise/${id}`);
  }




  const columns = useMemo<ColumnDef<FinanceEnterpriseReadWithAction, any>[]>(
    () => [
      columnHelper.accessor('subcontractor.name', {
        header: 'ENTREPRISE',
        cell: ({row}) => (
        <div className='flex items-center gap-1'>
        <div className='flex flex-col'>
        <Typography color='text.primary' className='font-medium'>
        {`${row.original.subcontractor.name} `}
        </Typography>
        </div>
        </div>
        )
        }),
        columnHelper.accessor('total_contract', {
          header: 'MARCHES',
          cell: ({row}) => (
          <div className='flex items-center gap-1'>
          <div className='flex flex-col'>
          <Typography color='text.primary' className='font-medium'>
          {`${row.original.total_contract}`}
          </Typography>
          </div>
          </div>
          )
          }),
        columnHelper.accessor('prorata', {
        header: 'PRORATA',
        cell: ({row}) => (
        <div className='flex items-center gap-1'>
        <div className='flex flex-col'>
        <Typography color='text.primary' className='font-medium'>
        {`${row.original.prorata}`}
        </Typography>
        </div>
        </div>
        )
        }),
        columnHelper.accessor('total_ts_travaux', {
          header: 'TOTAL TS TRAVAUX',
          cell: ({row}) => (
          <div className='flex items-center gap-1'>
          <div className='flex flex-col'>
          <Typography color='text.primary' className='font-medium'>
          {`${row.original.total_ts_travaux}`}
          </Typography>
          </div>
          </div>
          )
          }),
          columnHelper.accessor('total_ts_choix', {
            header: 'TOTAL TS CHOIX',
            cell: ({row}) => (
            <div className='flex items-center gap-1'>
            <div className='flex flex-col'>
            <Typography color='text.primary' className='font-medium'>
            {`${row.original.total_ts_choix}`}
            </Typography>
            </div>
            </div>
            )
            }),
            columnHelper.accessor('total_ts_tma', {
              header: 'TOTAL TS TMA',
              cell: ({row}) => (
              <div className='flex items-center gap-1'>
              <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
              {`${row.original.total_ts_tma}`}
              </Typography>
              </div>
              </div>
              )
              }),
              columnHelper.accessor('markets_plus_ts', {
                header: 'MARCHES+TS',
                cell: ({row}) => (
                <div className='flex items-center gap-1'>
                <div className='flex flex-col'>
                <Typography color='text.primary' className='font-medium'>
                {`${row.original.markets_plus_ts}`}
                </Typography>
                </div>
                </div>
                )
                }),
            columnHelper.accessor('cie', {
              header: 'CIE',
              cell: ({row}) => (
              <div className='flex items-center gap-1'>
              <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
              {`${row.original.cie}`}
              </Typography>
              </div>
              </div>
              )
              }),
              
              columnHelper.accessor('retention_guarantee', {
                header: 'Retenue de garantie',
                cell: ({row}) => (
                <div className='flex items-center gap-1'>
                <div className='flex flex-col'>
                <Typography color='text.primary' className='font-medium'>
                {`${row.original.retention_guarantee}`}
                </Typography>
                </div>
                </div>
                )
                }),
              columnHelper.accessor('final_amount', {
                header: 'Total',
                cell: ({row}) => (
                <div className='flex items-center gap-1'>
                <div className='flex flex-col'>
                <Typography color='text.primary' className='font-medium'>
                {`${row.original.final_amount}`}
                </Typography>
                </div>
                </div>
                )
                }),
                
                columnHelper.accessor('payment_cumulated', {
                  header: 'PAIEMENT CUMULE',
                  cell: ({row}) => (
                  <div className='flex items-center gap-1'>
                  <div className='flex flex-col'>
                  <Typography color='text.primary' className='font-medium'>
                  {`${row.original.payment_cumulated}`}
                  </Typography>
                  </div>
                  </div>
                  )
                  }),
                  columnHelper.accessor('payment_cumulated_percentage', {
                    header: 'PAIEMENT CUMULE%',
                    cell: ({row}) => (
                    <div className='flex items-center gap-1'>
                    <div className='flex flex-col'>
                    <Typography color='text.primary' className='font-medium'>
                    {`${row.original.payment_cumulated_percentage}%`}
                    </Typography>
                    </div>
                    </div>
                    )
                    }),
                    columnHelper.accessor('caution', {
                      header: 'CAUTION',
                      cell: ({row}) => (
                      <div className='flex items-center gap-1'>
                      <div className='flex flex-col'>
                      <Typography color='text.primary' className='font-medium'>
                      {`${row.original.caution}`}
                      </Typography>
                      </div>
                      </div>
                      )
                      }),
                      columnHelper.accessor('dgd_status', {
                        header: 'DGD',
                        cell: ({ row }) => {
                          // Directly derive the status, label, and color
                          
                          const status = row.original.dgd_status || "abandon"; // This might be null or undefined
const { label, color } = DgdStatusMapping[status];
                      
                          return (
                            <div className="flex items-center gap-1">
                              <Chip label={label} color={color as "default" | "primary" | "secondary" | "error" | "success" | "warning" | "info"} variant="tonal" />
                            </div>
                          );
                        },
                      }),

      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({row}) => (
          <div className='flex items-center'>
            <IconButton onClick={() => handleEditUser(row.original.id)}>
              <i className='tabler-eye text-textSecondary'/>
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
    data: data as FinanceEnterpriseRead[] || [],
    columns,
   
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
     
    },
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
            ) : (table.getFilteredRowModel()?.rows?.length === 0 ? (
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

      
      </Card>
     
    </>
  )
}

export default FinanceListTable
