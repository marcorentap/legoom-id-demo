import { router } from '@inertiajs/react';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table';

export interface Application {
    app_id: string;
    app_name: string;
    app_secret: string;
    app_callback: string;
}

export interface ApplicationTableProps {
    apps: Application[];
}

const columns: ColumnDef<Application>[] = [
    {
        accessorKey: 'app_name',
        header: 'Name',
    },
    {
        accessorKey: 'app_callback',
        header: 'Name',
    },
    {
        accessorKey: 'app_id',
        header: 'ID',
    },
    {
        accessorKey: 'app_secret',
        header: 'Secret',
    },
];

export interface EditDialogProps {
    application: Application | null;
    open: boolean;
    onOpenChange(open: boolean): void;
    errors?: {
        update_name: string;
        update_callback: string;
    };
}

export function EditDialog(props: EditDialogProps) {
    const form = useForm();
    const app = props.application;
    const nameError = props.errors?.update_name;
    const callbackError = props.errors?.update_callback;

    function onSubmit() {
        router.post(
            route('admin.applications.update', app?.app_id),
            form.getValues(),
        );
        form.reset();
    }

    function onDelete() {
        router.delete(route('admin.applications.update', app?.app_id));
        form.reset();
    }

    return (
        <Dialog
            open={props.open}
            onOpenChange={() => {
                props.onOpenChange(false);
                form.reset();
            }}
        >
            <DialogContent>
                <DialogTitle>Edit application</DialogTitle>
                {nameError ? (
                    <div className="text-sm text-red-500">{nameError}</div>
                ) : null}
                {callbackError ? (
                    <div className="text-sm text-red-500">{callbackError}</div>
                ) : null}
                <form>
                    <div className="flex flex-col gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="update_name">Name</Label>
                            <Input
                                id="update_name"
                                placeholder={app?.app_name}
                                {...form.register('update_name')}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="update_callback">
                                Callback URL
                            </Label>
                            <Input
                                id="update_callback"
                                placeholder={app?.app_callback}
                                {...form.register('update_callback')}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>ID</Label>
                            <Input value={app?.app_id} readOnly={true} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Secret</Label>
                            <Input value={app?.app_secret} readOnly={true} />
                        </div>
                    </div>
                    <div className="mt-3 flex justify-between">
                        <Button
                            onClick={form.handleSubmit(onSubmit)}
                            type="submit"
                            className="rounded-full"
                        >
                            Save changes
                        </Button>
                        <div
                            onClick={form.handleSubmit(onDelete)}
                            className="flex cursor-pointer items-center font-semibold text-red-500"
                        >
                            Delete
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export interface ApplicationFormProps {
    organization_name: string;
    organization_logo: string;
    errors?: {
        name: string;
        callback: string;
    };
}

export function ApplicationForm(props: ApplicationFormProps) {
    const form = useForm();
    const nameError = props.errors?.name;
    const callbackError = props.errors?.callback;

    function onSubmit() {
        router.post(route('admin.applications', form.getValues()));
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add application</CardTitle>
            </CardHeader>
            <CardContent>
                {nameError ? (
                    <div className="text-sm text-red-500">{nameError}</div>
                ) : null}
                {callbackError ? (
                    <div className="text-sm text-red-500">{callbackError}</div>
                ) : null}
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
                        <Button type="submit" className="mt-5 rounded-full">
                            Create
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

export function ApplicationTable(props: ApplicationTableProps) {
    const table = useReactTable({
        columns: columns,
        data: props.apps,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });
    const [selectedApp, setSelectedApp] = useState<Application | null>(null);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    useEffect(() => {
        table.setPageSize(Number(20));
    }, []);

    return (
        <div>
            <EditDialog
                application={selectedApp}
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                {...props}
            />
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
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                    onClick={() => {
                                        setDialogOpen(true);
                                        setSelectedApp(row.original);
                                    }}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
