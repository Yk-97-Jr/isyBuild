"use client";

// React Imports
import React, { useState, useMemo } from "react";

// MUI Imports
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

// Third-party Imports
import classnames from "classnames";
import { rankItem } from "@tanstack/match-sorter-utils";
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
import type {
  ColumnDef,
  FilterFn /* SortingState */,
} from "@tanstack/react-table";
import type { RankingInfo } from "@tanstack/match-sorter-utils";

// Type Imports
import { Chip, CircularProgress } from "@mui/material";

// Style Imports
import tableStyles from "@core/styles/table.module.css";
import type {
  DiffusionIntervenantRead,
  StatusE51Enum,
} from "@/services/IsyBuildApi";
import { getStatusProps } from "@/utils/statusHelper";
import { StatusE51Mapping } from "@/utils/statusEnums";

import AddCommentContent from "../DocumentDiffusionComments/AddCommentDialog";
import ListCommentContent from "../CommentList/ListCommentDialog";
import { formatDate } from "@/utils/formatDate";
import UserCard from "@/components/UserCard";
import OptionMenu from "@/@core/components/option-menu";

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}
type LocalisationWithAction = DiffusionIntervenantRead & {
  action?: string;
};

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

// Column Definitions
const columnHelper = createColumnHelper<LocalisationWithAction>();

const DiffusionTable = ({
  data,
  pageSize,
  isFetching,
  refetch,
}: {
  data?: DiffusionIntervenantRead[];
  pageSize: number;
  isFetching: boolean;
  refetch: () => void;
}) => {
  // States
  const [rowSelection, setRowSelection] = useState({});
  const [openDelete, setOpenDelete] = useState(false);
  const [openModify, setOpenModify] = useState(false);
  const [id, setId] = useState<number | null>(null); // Update the initial state

  const handleEdit = (id: number) => {
    setOpenModify(true);
    setId(id);
  };

  const handleDelete = (id: number) => {
    setOpenDelete(true);
    setId(id);
  };

  const columns = useMemo<ColumnDef<LocalisationWithAction, any>[]>(
    () => [
      columnHelper.accessor("project_intervenant.intervenant.user.id", {
        header: "intervenant",
        cell: ({ row }) => (
          <UserCard
            firstName={
              row.original.project_intervenant.intervenant.user.first_name
            }
            lastName={
              row.original.project_intervenant.intervenant.user.last_name
            }
            avatar={row.original.project_intervenant.intervenant.user.avatar}
            email={row.original.project_intervenant.intervenant.user.email}
          />
        ),
      }),
      columnHelper.accessor("project_intervenant.intervenant.role", {
        header: "role ",
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            <div className="flex flex-col">
              <Typography color="text.primary" className="font-medium">
                {`${row.original.project_intervenant.intervenant.role}`}
              </Typography>
            </div>
          </div>
        ),
      }),

      columnHelper.accessor("last_notification_date", {
        header: `dernière notification`,
        cell: ({ row }) => (
          <Typography>
            {formatDate(row.original.last_notification_date)}
          </Typography>
        ),
      }),
      columnHelper.accessor("notifications_sent", {
        header: "notifications envoyées",
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            <div className="flex flex-col">
              <Typography color="text.primary" className="font-medium">
                {`${row.original.notifications_sent}`}
              </Typography>
            </div>
          </div>
        ),
      }),
      columnHelper.accessor("status", {
        header: "status ",

        cell: ({ row }) => {
          const { label, color } = getStatusProps<StatusE51Enum>(
            row.original.status,
            StatusE51Mapping,
          );

          return (
            <Chip
              variant="tonal"
              label={label}
              color={
                color as
                  | "default"
                  | "primary"
                  | "secondary"
                  | "error"
                  | "success"
                  | "warning"
                  | "info"
              }
              size="small"
              sx={{ fontWeight: "small" }}
            />
          );
        },
      }),
      columnHelper.accessor("action", {
        header: "Action",
        cell: ({ row }) => (
          <div className="flex items-center">
            <OptionMenu
              iconButtonProps={{ size: "medium" }}
              iconClassName="text-textSecondary"
              options={[
                {
                  text: "Commenter une diffusion",
                  menuItemProps: {
                    className: "flex items-center gap-1 text-textSecondary",
                    onClick: (e) => {
                      e.stopPropagation(); // Prevent row selection if the table is click-sensitive
                      handleEdit(row.original.id); // Pass the ID from the row data
                    },
                  },
                },
                {
                  text: "Commenter list",
                  menuItemProps: {
                    className: "flex items-center gap-1 text-textSecondary",
                    onClick: (e) => {
                      e.stopPropagation(); // Prevent row selection if the table is click-sensitive
                      handleDelete(row.original.id); // Pass the ID from the row data
                    },
                  },
                },
              ]}
            />
          </div>
        ),
        enableSorting: false, // Disables sorting for this column
      }),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, data],
  );

  const table = useReactTable({
    data: data as DiffusionIntervenantRead[],
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: pageSize,
      },
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
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  });

  return (
    <>
      <Card>
        <div className="overflow-x-auto">
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
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
                              desc: (
                                <i className="tabler-chevron-down text-xl" />
                              ),
                            }[header.column.getIsSorted() as "asc" | "desc"] ??
                              null}
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
                  <td
                    colSpan={table.getVisibleFlatColumns().length}
                    className="text-center"
                  >
                    <CircularProgress />
                  </td>
                </tr>
              </tbody>
            ) : table.getFilteredRowModel().rows.length === 0 ? (
              <tbody>
                <tr>
                  <td
                    colSpan={table.getVisibleFlatColumns().length}
                    className="text-center"
                  >
                    No data available
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table
                  .getRowModel()
                  .rows.slice(0, table.getState().pagination.pageSize)
                  .map((row) => {
                    return (
                      <tr
                        key={row.id}
                        className={classnames({
                          selected: row.getIsSelected(),
                        })}
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
                    );
                  })}
              </tbody>
            )}
          </table>
        </div>
      </Card>

      {id !== null && (
        <>
          <ListCommentContent
            open={openDelete}
            setOpen={setOpenDelete}
            refetch={refetch}
            id={id}
          />
          <AddCommentContent
            open={openModify}
            setOpen={setOpenModify}
            refetch={refetch}
            id={id}
          />
        </>
      )}
    </>
  );
};

export default DiffusionTable;
