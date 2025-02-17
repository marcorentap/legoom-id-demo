import { useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { router } from "@inertiajs/react";

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

export interface ApplicationFormProps {
  organization_name: string
  organization_logo: string
  errors?: {
    name: string
    callback: string
  }
}

export function ApplicationForm(props: ApplicationFormProps) {
  const form = useForm();
  const nameError = props.errors?.name;
  const callbackError = props.errors?.callback;

  function onSubmit(data, e) {
    router.post(route('admin.applications', form.getValues()));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Application</CardTitle>
      </CardHeader>
      <CardContent>
        {nameError ? <div className="text-red-500 text-sm">{nameError}</div> : null}
        {callbackError ? <div className="text-red-500 text-sm">{callbackError}</div> : null}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="My App"
                {...form.register('name')}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="callback">Callback URL</Label>
              <Input
                id="callback"
                placeholder="http://example.com/callback"
                {...form.register('callback')}
              />
            </div>
          </div>
          <div>
            <Button type="submit" className="rounded-full mt-5">
              Create
            </Button>
          </div>
        </form>
      </CardContent>

    </Card>
  )
}

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
      <div className="rounded-xl border">
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
