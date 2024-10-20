'use client'

// React Imports
import React, {useState, useMemo} from 'react'


// MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TablePagination from '@mui/material/TablePagination'
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

// // Component Imports
import Box from "@mui/material/Box";

import {CircularProgress} from "@mui/material";

import CustomTextField from '@core/components/mui/TextField'

// Util Imports

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import type {DocumentRead} from "@/services/IsyBuildApi";
import TablePaginationComponentStandard from "@components/TablePaginationComponentStandard";

import AddFileSub
  from "@views/apps/admin/projects/edit/AppeleOffre/AppeleOffreDetails/AppeleOffreFolder/dialogs/add/AddFileSub";
import OptionMenu from "@core/components/option-menu";
import DeleteFile
  from "@views/apps/admin/projects/edit/AppeleOffre/AppeleOffreDetails/AppeleOffreFolder/dialogs/delete/DeleteFile";

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }

  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type DocumentReadWithAction = DocumentRead & {
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
const columnHelper = createColumnHelper<DocumentReadWithAction>()

const FolderInnerListTable = ({tableData, refetch, isFetching}: {
  tableData?: DocumentRead[],
  refetch: () => void,
  isFetching: boolean
}) => {
  // States
  const [openAdd, setOpenAdd] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  // const [openHistory, setHistoryAdd] = useState(false)
  const [id, setId] = useState(0)
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

  // const previewFile = (fileUrl: string) => {
  //   console.log(fileUrl)
  //
  // };

  const handleDelete = (id: number) => {
    console.log(id)

    setOpenDelete(true)
    setId(id)
  }

  const handleHistory = (id: number) => {
    console.log(id)

  }

  const handleEdit = (id: number) => {
    console.log(id)

  }


  // Hooks
  const columns = useMemo<ColumnDef<DocumentReadWithAction, any>[]>(
    () => [

      columnHelper.accessor('name', {
        header: 'Nom De Fichier ',
        cell: ({row}) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original.name ? row.original.name : 'name not available'}
          </Typography>
        )
      }),
      columnHelper.accessor('tags', {
        header: 'Étiqueter',
        cell: ({row}) =>
          <Typography>{row.original.tags ? row.original.tags : 'tags not available'}</Typography>
      }),
      columnHelper.accessor('latest_version.notes', {
        header: 'Notes',
        cell: ({row}) =>

          <Typography>
            {row.original.latest_version.notes ? row.original.latest_version.notes : 'Notes not available'}
          </Typography>

      }),
      columnHelper.accessor('latest_version.created_at', {
        header: `Date de Creation`,
        cell: ({row}) => (
          <Typography>
            {row.original.latest_version.created_at ? new Date(row.original.latest_version.created_at).toLocaleDateString() : 'Date not available'}
          </Typography>
        )
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({row}) => (
          <div className='flex items-center'>
            <IconButton onClick={() => openOrDownloadFile(row.original.latest_version.file_url)}>
              <i className='tabler-download text-textSecondary'/>
            </IconButton>
            <IconButton onClick={() => openOrDownloadFile(row.original.latest_version.file_url)}>
              <i className='tabler-eye text-textSecondary'/>
            </IconButton>
            <OptionMenu
              iconButtonProps={{size: 'medium'}}
              iconClassName='text-textSecondary'
              options={[
                {
                  text: 'Modifier',
                  menuItemProps: {
                    className: 'flex items-center gap-1 text-textSecondary',
                    onClick: () => handleEdit(row.original.id)
                  }
                },
                {
                  text: 'Historique',
                  menuItemProps: {
                    className: 'flex items-center gap-1 text-textSecondary',
                    onClick: () => handleHistory(row.original.id)
                  }
                },
                {
                  text: 'Supprimer',
                  menuItemProps: {
                    className: 'flex items-center gap-1 text-textSecondary',
                    onClick: () => handleDelete(row.original.id)
                  }
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
  )

  const table = useReactTable({
    data: filteredData as DocumentRead[],
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
      <Card>
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

            <Button
              variant='contained'
              startIcon={<i className='tabler-upload'/>}
              onClick={() => setOpenAdd(!openAdd)}
              className='max-sm:is-full'
            >
              Ajouter un fichier
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
            </table>)}


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
        <AddFileSub
          open={openAdd}
          setOpen={setOpenAdd}
          refetch={refetch}
        />
        <DeleteFile
          open={openDelete}
          setOpen={setOpenDelete}
          refetch={refetch}
          id={id}
        />
      </Card>
    </>
  )
}

export default FolderInnerListTable
