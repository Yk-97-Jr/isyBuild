'use client'

// React Imports
import React, {useEffect, useState, useMemo} from 'react'



// MUI Imports
import {useRouter,useParams} from "next/navigation";

import Card from '@mui/material/Card'
import type { ButtonProps } from '@mui/material/Button';
import Button from '@mui/material/Button'
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
import type {ColumnDef, FilterFn,  SortingState } from '@tanstack/react-table'
import type {RankingInfo} from '@tanstack/match-sorter-utils'

// Type Imports

import {Chip, CircularProgress} from '@mui/material'

import TablePaginationComponent from '@components/TablePaginationComponent'


import CustomTextField from '@core/components/mui/TextField'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

import {useAuth} from "@/contexts/AuthContext";
import type { DocumentDiffusionRead } from '@/services/IsyBuildApi';
import DocumentDialog from '@/components/dialogs/doc-diff-dialog';
import OpenFinanceOnElementClick from '@/components/dialogs/OpenFinanceOnElementClick';
import ConfigAddDialog from '../config/ConfigAddDialog';

const buttonProps: ButtonProps = {
  variant: 'contained',
  children: 'Configs',
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

type LocalisationWithAction = DocumentDiffusionRead & {
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
const columnHelper = createColumnHelper<LocalisationWithAction>()

const DocDiffTable = ({
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
                         setSorting,
                         sorting 
                       }: {
  data?: DocumentDiffusionRead[]

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
  const [id, setId] = useState(0)
  const [open, setOpen] = useState(false)
  const router = useRouter();
  const {user} = useAuth();  // Get the user from AuthContext
  const userRole = user?.role
  const {edit} = useParams()


  const handleEditDocument = (id: number) => {
    console.log(id)
    console.log(`/${userRole}/projects/${id}/details`)
      router.push(`/${userRole}/projects/${edit}/details/documentDiffusions/${id}/details`);
  }

  const handleDeleteDocument = (id: number) => {
    setOpen(true)
    setId(id)
  }

  const handleAddDocDiffusions = () => {
    router.push(`/${userRole}/projects/${edit}/details/documentDiffusions/add`);
    console.log(`/${userRole}/projects/${edit}/details/documentDiffusions/add`);
    
  }

  const columns = useMemo<ColumnDef<LocalisationWithAction, any>[]>(
    () => [
      columnHelper.accessor('title', {
        header: 'titre',
        cell: ({row}) => (
          <div className='flex items-center gap-1'>
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {`${row.original.title}`}
              </Typography>
            </div>
          </div>
        )
      }),

      columnHelper.accessor('project_lot.lot.name', {
        header: 'Lot ',
        cell: ({row}) => (
          <div className='flex items-center gap-1'>
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {`${row.original.project_lot.lot.name}`}
              </Typography>
            </div>
          </div>
        )
      }),

      columnHelper.accessor('type', {
        header: 'Type ',
        cell: ({row}) => (
          <div className='flex items-center gap-1'>
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {`${row.original.type}`}
              </Typography>
            </div>
          </div>
        )
      }),

      columnHelper.accessor('localisation.name', {
        header: 'emplacements ',
        cell: ({row}) => (
          <div className='flex items-center gap-1'>
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {`${row.original.localisation.name}`}
              </Typography>
            </div>
          </div>
        )
      }),

      columnHelper.accessor('status', {
        header: 'status',
        cell: ({row}) => (
          <div className='flex items-center gap-1'>
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {`${row.original.status}`}
              </Typography>
            </div>
          </div>
        )
      }),


      columnHelper.accessor('document.id', {
        header: 'document',
        cell: ({ row }) => (
          <div className='flex items-center gap-1'>
            <Chip
              label={row.original.document?.id ? ' Existé' : 'Non existé'} // Display appropriate label
              color={row.original.document?.id ? 'success' : 'error'} // Green for exists, red for not exists
              variant='tonal' // Optional, for styling
              size='small' // Adjust the size
              sx={{ fontWeight: 'medium' }} // Additional styling
            />
          </div>
        ),
      }),
      
      columnHelper.accessor('indice', {
        header: 'indice',
        cell: ({ row }) => (
          <div className='flex items-center gap-1'>
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {`${row.original.indice}`}
              </Typography>
            </div>
          </div>
        ),
      }),

      columnHelper.accessor('diffusion_date', {
        header: 'Date de diffusion',
        cell: ({row}) => (
          <Typography>
            {row.original.diffusion_date
              ? `${new Date(row.original.diffusion_date).toLocaleDateString()} ${new Date(row.original.diffusion_date).toLocaleTimeString()}`
              : 'Date not available'}
          </Typography>
        )
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({row}) => (
          <div className='flex items-center'>
            <IconButton onClick={() => handleEditDocument(row.original.id)}>
              <i className='tabler-edit text-textSecondary'/>
            </IconButton>
            <IconButton onClick={() => handleDeleteDocument(row.original.id)}>
              <i className='tabler-trash text-textSecondary'/>
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
    data: data as DocumentDiffusionRead[],
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
              value={ search }
              onChange={value => {
                setSearch(String(value))
          
   }}
              placeholder='Rechercher'
              className='placeholder:text-xl max-sm:is-full'
            /> 
                     <OpenFinanceOnElementClick element={Button} elementProps={buttonProps} dialog={ConfigAddDialog} dialogProps={{ refetch }}/>

            <Button
              variant='contained'
              className='max-sm=is-full'
              startIcon={<i className='tabler-plus'/>}
              onClick={handleAddDocDiffusions}
            >
              Ajouter
            </Button>
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
      <DocumentDialog
        open={open}
        setOpen={setOpen}
        id={id}
        setId={setId}
        refetch={refetch}
      />
    </>
  )
}

export default DocDiffTable
