'use client'

// React Imports
import React, {useEffect, useState, useMemo} from 'react'

// MUI Imports
import {useParams, useRouter} from "next/navigation";

import Card from '@mui/material/Card'


import Typography from '@mui/material/Typography'

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
  getSortedRowModel,
} from '@tanstack/react-table'
import type {ColumnDef, FilterFn, SortingState} from '@tanstack/react-table'
import type {RankingInfo} from '@tanstack/match-sorter-utils'

// Type Imports

import {CircularProgress} from '@mui/material'

import TablePaginationComponent from '@components/TablePaginationComponent'



import CustomTextField from '@core/components/mui/TextField'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import type {FinanceRead} from '@/services/IsyBuildApi'
import {useAuth} from "@/contexts/AuthContext";



declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }

  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type FinanceReadWithAction = FinanceRead & {
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
const columnHelper = createColumnHelper<FinanceReadWithAction>()

const FinanceTable = ({
  data,
  page,
  setPage,
  setPageSize,
  pageSize,
  countRecords,
  isFetching,

  setSearch,
  search,
  setSorting,
  sorting
}: {
data?: FinanceRead[]

page: number
setPage: React.Dispatch<React.SetStateAction<number>>
pageSize: number
setPageSize: React.Dispatch<React.SetStateAction<number>>
countRecords?: number
refetch: () => void
isFetching: boolean
setSearch: React.Dispatch<React.SetStateAction<string>>
search: string
sorting: SortingState
setSorting: React.Dispatch<React.SetStateAction<SortingState>>
}) => {
// States
const [rowSelection, setRowSelection] = useState({})

const router = useRouter();
const {user} = useAuth();  // Get the user from AuthContext
const userRole = user?.role
const {edit} = useParams()


const handleEditUser = (id: number) => {
  console.log(id)
  console.log(`/${userRole}/projects/${edit}/details/finance/${id}/details`)
  router.push(`/${userRole}/projects/${edit}/details/finance/${id}/details`);
}




const columns = useMemo<ColumnDef<FinanceReadWithAction, any>[]>(
() => [
columnHelper.accessor('project_lot.lot.name', {
header: 'LOTS',
cell: ({row}) => (
<div className='flex items-center gap-1'>
<div className='flex flex-col'>
<Typography color='text.primary' className='font-medium'>
{`${row.original.project_lot.lot.name} `}
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
columnHelper.accessor('total_prorata', {
header: 'PRORATA',
cell: ({row}) => (
<div className='flex items-center gap-1'>
<div className='flex flex-col'>
<Typography color='text.primary' className='font-medium'>
{`${row.original.total_prorata}`}
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
      columnHelper.accessor('total_markets_plus_ts', {
        header: 'MARCHES+TS',
        cell: ({row}) => (
        <div className='flex items-center gap-1'>
        <div className='flex flex-col'>
        <Typography color='text.primary' className='font-medium'>
        {`${row.original.total_markets_plus_ts}`}
        </Typography>
        </div>
        </div>
        )
        }),
    columnHelper.accessor('total_cie', {
      header: 'CIE',
      cell: ({row}) => (
      <div className='flex items-center gap-1'>
      <div className='flex flex-col'>
      <Typography color='text.primary' className='font-medium'>
      {`${row.original.total_cie}`}
      </Typography>
      </div>
      </div>
      )
      }),
      
      columnHelper.accessor('total_retention_guarantee', {
        header: 'Retenue de garantie',
        cell: ({row}) => (
        <div className='flex items-center gap-1'>
        <div className='flex flex-col'>
        <Typography color='text.primary' className='font-medium'>
        {`${row.original.total_retention_guarantee}`}
        </Typography>
        </div>
        </div>
        )
        }),
      columnHelper.accessor('total_final_amount', {
        header: 'MARCHES+TS+CIE-PRORATAT-RG',
        cell: ({row}) => (
        <div className='flex items-center gap-1'>
        <div className='flex flex-col'>
        <Typography color='text.primary' className='font-medium'>
        {`${row.original.total_final_amount}`}
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
data: data as FinanceRead[],
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
placeholder='Rechercher'
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

</>
)
}

export default FinanceTable
