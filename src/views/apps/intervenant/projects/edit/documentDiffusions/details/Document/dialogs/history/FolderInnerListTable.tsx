'use client'

// React Imports
import React, {useState, useMemo} from 'react'


// MUI Imports
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TablePagination from '@mui/material/TablePagination'

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

// // Component Imports

// Util Imports

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import type {DocumentVersionRead} from "@/services/IsyBuildApi";
import TablePaginationComponentStandard from "@components/TablePaginationComponentStandard";


declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }

  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type DocumentVersionReadWithAction = DocumentVersionRead & {
  action?: string
}

// Styled Components

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
const columnHelper = createColumnHelper<DocumentVersionReadWithAction>()

const FolderInnerListTable = ({tableData}: {
  tableData?: DocumentVersionRead[],
}) => {
  // States
  const [rowSelection, setRowSelection] = useState({})
  const [data] = useState(...[tableData])
  const [filteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')


  // functions
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


  // Hooks
  const columns = useMemo<ColumnDef<DocumentVersionReadWithAction, any>[]>(
    () => [


      columnHelper.accessor('notes', {
        header: 'Notes',
        cell: ({row}) =>

          <Typography>
            {row.original.notes ? row.original.notes : 'Notes not available'}
          </Typography>

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
            <IconButton onClick={() => openOrDownloadFile(row.original.file_url)}>
              <i className='tabler-download text-textSecondary'/>
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
    data: filteredData as DocumentVersionRead[],
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


  return (
    <>

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
        component={() => <TablePaginationComponentStandard table={table}/>}
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => {
          table.setPageIndex(page)
        }}
      />

    </>
  )
}

export default FolderInnerListTable
