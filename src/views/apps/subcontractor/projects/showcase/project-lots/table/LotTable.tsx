'use client'

// React Imports
import React, { useState, useMemo} from 'react'

// MUI Imports


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
import type {ColumnDef, FilterFn, SortingState} from '@tanstack/react-table'
import type {RankingInfo} from '@tanstack/match-sorter-utils'

// Type Imports

import {CardHeader, CircularProgress, Divider} from '@mui/material'

import TablePaginationComponent from '@components/TablePaginationComponent'




// Style Imports
import tableStyles from '@core/styles/table.module.css'
import type {DocumentRead} from '@/services/IsyBuildApi'
import { formatDate } from '@/utils/formatDate'



declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }

  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type ProjectWithAction = DocumentRead & {
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
const columnHelper = createColumnHelper<ProjectWithAction>()

const LotTable = ({
                         data,
                         page,
                         setPage,
                         
                         pageSize,
                        
                         isFetching,
                         
                         
                         
                         setSorting,
                         sorting
                       }: {
  data?: DocumentRead[] | null

  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
 

  isFetching: boolean
  setSearch: React.Dispatch<React.SetStateAction<string>>
  search: string

  sorting: SortingState
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>
}) => {
  // States
  const [rowSelection, setRowSelection] = useState({})

  
  


  

  const openOrDownloadFile = (fileUrl: string) => {
    const fileExtension = fileUrl.split('.').pop()?.toLowerCase();

    // List of file types that can be viewed in the browser
    const viewableTypes = ['pdf', 'jpg', 'jpeg', 'png', 'txt', 'html', 'gif'];

    if (fileExtension && viewableTypes.includes(fileExtension)) {
      // Open in new tab if it's a viewable file type
      window.open(fileUrl, '_blank', 'noopener,noreferrer');
    } else {
      // If it's not viewable, force download
      const link = document.createElement('a');

      link.href = fileUrl;
      link.setAttribute('download', fileUrl.split('/').pop() || 'file');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };


  const columns = useMemo<ColumnDef<ProjectWithAction, any>[]>(
    () => [
        columnHelper.accessor('name', {
            header: `Nom de fichier`,
            cell: ({row}) => (
                <div className='flex items-center gap-1'>
                <div className='flex flex-col'>
                  <Typography color='text.primary' className='font-medium'>
                    {`${row.original.name} `}
                  </Typography>
                </div>
              </div>
            )
          }),

      columnHelper.accessor('tags', {
        header: `étiqueter`,
        cell: ({row}) => (
            <div className='flex items-center gap-1'>
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
              {row.original?.tags ? (
            `${row.original.tags}`
          ) : (
            <span className="text-gray-500 italic">No tags available</span>
          )}
              </Typography>
             
              
            </div>
          </div>
        )
      }),columnHelper.accessor('latest_version.notes', {
        header: 'notes',
        cell: ({row}) => (
          <Typography>
            {row.original.latest_version?.notes
      }
          </Typography>
        )
      }),
      
      columnHelper.accessor('latest_version.created_at', {
        header: `Date de Creation`,
        cell: ({ row }) => (
          <Typography>
             {formatDate(row.original.latest_version.created_at)} 
          </Typography>
        ),
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({row}) => (
          <div className='flex items-center'>
            <IconButton onClick={() => openOrDownloadFile(row.original.latest_version.file_url)}>
              <i className='tabler-upload text-textSecondary'/>
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
    data: data as DocumentRead[] ?? [],
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
      <CardHeader title='liste de Fichiers' />
      <Divider/>
        
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
      <td colSpan={table?.getVisibleFlatColumns()?.length || 1} className="text-center">
        <CircularProgress />
      </td>
    </tr>
  </tbody>
) : (table?.getRowModel()?.rows?.length > 0 ? (
  <tbody>
    {table
      .getRowModel()
      .rows.slice(0, table.getState().pagination.pageSize)
      .map(row => (
        <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
          {row.getVisibleCells().map(cell => (
            <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
          ))}
        </tr>
      ))}
  </tbody>
) : (
  <tbody>
    <tr>
      <td colSpan={table?.getVisibleFlatColumns()?.length || 1} className="text-center">
        No data available
      </td>
    </tr>
  </tbody>
))}



          </table>

        </div>

        <TablePaginationComponent
          
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

export default LotTable
