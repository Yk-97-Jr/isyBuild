'use client'

// React Imports
import React, {useEffect, useState, useMemo} from 'react'

// MUI Imports
import {useRouter} from "next/navigation";

import Card from '@mui/material/Card'
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
import type {ColumnDef, FilterFn, SortingState} from '@tanstack/react-table'
import type {RankingInfo} from '@tanstack/match-sorter-utils'

// Type Imports

import {CardHeader, CircularProgress} from '@mui/material'

import TablePaginationComponent from '@components/TablePaginationComponent'

import ProductDialog from '@components/dialogs/product-dialog'

import CustomTextField from '@core/components/mui/TextField'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import type {ProductMediaRead, ProductRead} from '@/services/IsyBuildApi'
import {useAuth} from "@/contexts/AuthContext";
import TableCategoryFilters from './TableCategoryFilters';


declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }

  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type ProductWithAction = ProductRead & ProductMediaRead &{
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
const columnHelper = createColumnHelper<ProductWithAction>()

const ProductTable = ({
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
                         categoryId,
                         setCategoryId,
                         setSorting,
                         sorting
                       }: {
  data?: ProductRead[]

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
  setCategoryId: React.Dispatch<React.SetStateAction<string | ''>>;
  categoryId: string | ''
}) => {
  // States
  const [rowSelection, setRowSelection] = useState({})
  const [id, setId] = useState(0)
  const [open, setOpen] = useState(false)
  const router = useRouter();
  const {user} = useAuth();  // Get the user from AuthContext
  const userRole = user?.role




  const handleEditProduct = (id: number) => {
    console.log(id)
    console.log(`/${userRole}/product/${id}/details`)
    router.push(`/${userRole}/product/${id}/details`);
  }

  const handleDeleteProduct = (id: number) => {
    setOpen(true)
    setId(id)
  }

  const handleAddProduct = () => {
    router.push(`/${userRole}/product/add`);

  }



  const columns = useMemo<ColumnDef<ProductWithAction, any>[]>(
    () => [
      columnHelper.accessor('name', {
        header: 'Nom',
        cell: ({row}) => (
          <div className='flex items-center gap-3'>
            <img src={row.original.media.at(-1)?.image ??  '/images/avatars/2.png'} width={38} height={38} className='rounded bg-actionHover' />
            <div className='flex flex-col items-start'>
              <Typography color='text.primary' className='font-medium'>
                {`${row.original.name} `}
              </Typography>
            </div>
          </div>
        )
      }),

      columnHelper.accessor('description', {
        header: `Description`,
        cell: ({row}) => (
            <div className='flex items-center gap-1'>
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {`${row.original.description} `}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('created_at', {
        header: 'Créé à',
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
            <IconButton onClick={() => handleEditProduct(row.original.id)}>
              <i className='tabler-edit text-textSecondary'/>
            </IconButton>
            <IconButton onClick={() => handleDeleteProduct(row.original.id)}>
              <i className='tabler-trash text-textSecondary'/>
            </IconButton>

          </div>
        ),
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  )

  const table = useReactTable({
    data: data as ProductRead[],
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
        <TableCategoryFilters categoryId={categoryId} setCategoryId={setCategoryId}/>
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
              placeholder='Rechercher un utilisateur'
              className='max-sm:is-full'
            />
            <Button
              variant='contained'
              className='max-sm=is-full'
              startIcon={<i className='tabler-plus'/>}
              onClick={handleAddProduct}
            >
              Ajouter un produit
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
      <ProductDialog
        open={open}
        setOpen={setOpen}
        id={id}
        setId={setId}
        refetch={refetch}
      />
    </>
  )
}

export default ProductTable
