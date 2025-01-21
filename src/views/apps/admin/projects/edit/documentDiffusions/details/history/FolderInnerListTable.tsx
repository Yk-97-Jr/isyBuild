"use client";

// React Imports
import React, { useState, useMemo } from "react";

// MUI Imports
import Typography from "@mui/material/Typography";
import TablePagination from "@mui/material/TablePagination";

// Third-party Imports
import classnames from "classnames";
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
} from "@tanstack/react-table";
import type { ColumnDef, FilterFn } from "@tanstack/react-table";

// Util Imports

// Style Imports
import { rankItem } from "@tanstack/match-sorter-utils";

import tableStyles from "@core/styles/table.module.css";
import type { DiffusionHistoryRead } from "@/services/IsyBuildApi";
import TablePaginationComponentStandard from "@components/TablePaginationComponentStandard";

// Column Definitions
const columnHelper = createColumnHelper<DiffusionHistoryRead>();

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

const FolderInnerListTable = ({
  tableData,
}: {
  tableData?: DiffusionHistoryRead[];
}) => {
  // States
  const [rowSelection, setRowSelection] = useState({});
  const [data] = useState(tableData);
  const [filteredData] = useState(data);
  const [globalFilter, setGlobalFilter] = useState("");

  // Hooks
  const columns = useMemo<ColumnDef<DiffusionHistoryRead, any>[]>(
    () => [
      columnHelper.accessor("indice", {
        header: "Indice",
        cell: ({ row }) => (
          <Typography>
            {row.original.indice ?? "Indice non disponible"}
          </Typography>
        ),
      }),
      columnHelper.accessor("variant.name", {
        header: "Nom du Variant",
        cell: ({ row }) => (
          <Typography>
            {row.original.variant?.name ?? "Nom non disponible"}
          </Typography>
        ),
      }),

      columnHelper.accessor("diffusion_date", {
        header: "Date de Diffusion",
        cell: ({ row }) => (
          <Typography>
            {row.original.diffusion_date
              ? `${new Date(row.original.diffusion_date).toLocaleDateString()} ${new Date(row.original.diffusion_date).toLocaleTimeString()}`
              : "Date non disponible"}
          </Typography>
        ),
      }),
      columnHelper.accessor("created_at", {
        header: "Date de Création",
        cell: ({ row }) => (
          <Typography>
            {row.original.created_at
              ? `${new Date(row.original.created_at).toLocaleDateString()} ${new Date(row.original.created_at).toLocaleTimeString()}`
              : "Date non disponible"}
          </Typography>
        ),
      }),
    ],
    [],
  );

  const table = useReactTable({
    data: filteredData as DiffusionHistoryRead[],

    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      rowSelection,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 100,
      },
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
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  });

  return (
    <>
      <div className="overflow-x-auto">
        <table className={tableStyles.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={classnames({
                          "flex items-center": header.column.getIsSorted(),
                          "cursor-pointer select-none":
                            header.column.getCanSort(),
                        })}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: <i className="tabler-chevron-up text-xl" />,
                          desc: <i className="tabler-chevron-down text-xl" />,
                        }[header.column.getIsSorted() as "asc" | "desc"] ??
                          null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {table.getFilteredRowModel().rows.length === 0 ? (
            <tbody>
              <tr>
                <td
                  colSpan={table.getVisibleFlatColumns().length}
                  className="text-center"
                >
                  Pas de données disponibles
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {table
                .getRowModel()
                .rows.slice(0, table.getState().pagination.pageSize)
                .map((row) => (
                  <tr
                    key={row.id}
                    className={classnames({ selected: row.getIsSelected() })}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          )}
        </table>
      </div>
      <TablePagination
        component={() => <TablePaginationComponentStandard table={table} />}
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => {
          table.setPageIndex(page);
        }}
      />
    </>
  );
};

export default FolderInnerListTable;
