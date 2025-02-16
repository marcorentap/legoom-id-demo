import { useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";

export interface Application {
  app_id: string
  app_name: string
  app_secret: string
  app_callback: string
}

export interface ApplicationTableProps {
  apps: Application[]
}

const columns: ColumnDef<Application>[] = [
  {
    accessorKey: "app_name",
    header: "Name",
  },
  {
    accessorKey: "app_callback",
    header: "Name",
  },
  {
    accessorKey: "app_id",
    header: "ID",
  },
  {
    accessorKey: "app_secret",
    header: "Secret",
  },
]

export function ApplicationTable(props: ApplicationTableProps) {
  const table = useReactTable({
    columns: columns,
    data: props.apps,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  useEffect(() => {
    table.setPageSize(Number(20))
  }, []);

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
