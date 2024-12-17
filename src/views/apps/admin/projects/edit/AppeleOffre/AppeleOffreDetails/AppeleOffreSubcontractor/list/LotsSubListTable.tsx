'use client'

// React Imports
import React, {useState, useMemo} from 'react'

// MUI Imports
import {useParams, useRouter} from "next/navigation";

import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
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

import {CircularProgress} from '@mui/material'

import TablePaginationComponent from '@components/TablePaginationComponent'


import CustomTextField from '@core/components/mui/TextField'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import {useAuth} from "@/contexts/AuthContext";
import type {ProjectLotSubcontractorRead, Status841Enum,ProjectLotRead} from "@/services/IsyBuildApi";
import {Status841Mapping} from "@/utils/statusEnums";
import {getStatusProps} from "@/utils/statusHelper";
import AddLotSub
  from "@views/apps/admin/projects/edit/AppeleOffre/AppeleOffreDetails/AppeleOffreSubcontractor/dialogs/AddLotSub";
import DeleteLotSub
  from "@views/apps/admin/projects/edit/AppeleOffre/AppeleOffreDetails/AppeleOffreSubcontractor/dialogs/DeleteLotSub";


declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }

  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type UsersTypeWithAction = ProjectLotSubcontractorRead & {
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
const columnHelper = createColumnHelper<UsersTypeWithAction>()

const LotsSubListTable = ({
                            data,
                            page,
                            setPage,
                            setPageSize,
                            pageSize,
                            countRecords,
                            isFetching,
                            refetch,
                            projectLotData
                          }: {
  data?: ProjectLotSubcontractorRead[]
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  countRecords?: number
  refetch: () => void
  isFetching: boolean
  projectLotData?: ProjectLotRead | undefined;
}) => {
  // States
  const [rowSelection, setRowSelection] = useState({})

  const [id, setId] = useState(0)
  const [openAdd, setOpenAdd] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [filteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')
  const router = useRouter();
  const {user} = useAuth();  // Get the user from AuthContext
  const userRole = user?.role
  const {edit: edit} = useParams();  // Renamed the route parameter variable
  const {id: lotId} = useParams();  // Renamed the route parameter variable

  //
  // const handleEditUser = (id: number) => {
  //   router.push(`/${userRole}/clients/${clientId}/details/${id}`);
  //
  // }


  const handleDeleteUser = (id: number) => {
    console.log(id)

    setOpenDelete(true)
    setId(id)
  }

  const handleDetail = (idSub: number) => {
    router.push(`/${userRole}/projects/${edit}/details/${lotId}/subcontractor/${idSub}`);


  }

  const handleAddUser = () => {
    setOpenAdd(true)

  }

  const columns = useMemo<ColumnDef<UsersTypeWithAction, any>[]>(
    () => [
      columnHelper.accessor('subcontractor.name', {
        header: 'Nom',
        cell: ({row}) => (
          <div className='flex items-center gap-1'>
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {`${row.original.subcontractor.name}`}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('subcontractor_staff.user', {
        header: `Responsable`,
        cell: ({row}) => (
          <Typography>
            {row.original.subcontractor_staff?.user
              ? `${row.original.subcontractor_staff.user.first_name} ${row.original.subcontractor_staff.user.last_name}`
              : 'user not available'}
          </Typography>
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

      columnHelper.accessor('status', {
        header: 'status',
        cell: ({row}) => {
          const {label, color} = getStatusProps<Status841Enum>(row.original.status, Status841Mapping);

          return <Chip variant="tonal" label={label}
                       color={color as "default" | "primary" | "secondary" | "error" | "success" | "warning" | "info"}/>;
        }

      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({row}) => (
          <div className='flex items-center'>
            <IconButton onClick={() => handleDeleteUser(row.original.id)}>
              <i className='tabler-trash text-textSecondary'/>
            </IconButton>
            <IconButton onClick={() => handleDetail(row.original.id)}>
              <i className='tabler-eye text-textSecondary'/>
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
    data: filteredData as ProjectLotSubcontractorRead[],
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
            <Button
              variant='contained'
              className='max-sm=is-full'
              startIcon={<i className='tabler-plus'/>}
              onClick={handleAddUser}
            >
              Assigner
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
      <AddLotSub
        open={openAdd}
        setOpen={setOpenAdd}
        refetch={refetch}
        projectLotData={projectLotData}
      />
      <DeleteLotSub
        open={openDelete}
        setOpen={setOpenDelete}
        refetch={refetch}
        id={id}
      />
    </>
  )
}

export default LotsSubListTable
