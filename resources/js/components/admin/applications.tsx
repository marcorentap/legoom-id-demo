import { Application } from '@/types/app';
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

export interface ApplicationTableProps {
    apps: Application[];
}

const columns: ColumnDef<Application>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'redirect',
        header: 'Redirect',
    },
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'secret',
        header: 'Secret',
    },
];

export interface EditDialogProps {
    application: Application | null;
    open: boolean;
    onOpenChange(open: boolean): void;
    errors?: {
        update_name: string;
        update_redirect: string;
    };
}

export function EditDialog(props: EditDialogProps) {
    const form = useForm();
    const app = props.application;
    const nameError = props.errors?.update_name;
    const redirectError = props.errors?.update_redirect;

    function onSubmit() {
        router.post(
            route('admin.applications.update', app?.id),
            form.getValues(),
            { preserveState: 'errors' },
        );
    }

    function onDelete() {
        router.delete(route('admin.applications.update', app?.id), {
            preserveState: 'errors',
        });
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
                {redirectError ? (
                    <div className="text-sm text-red-500">{redirectError}</div>
                ) : null}
                <form>
                    <div className="flex flex-col gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="update_name">Name</Label>
                            <Input
                                id="update_name"
                                placeholder={app?.name}
                                {...form.register('update_name')}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="update_redirect">
                                Redirect URL
                            </Label>
                            <Input
                                id="update_redirect"
                                placeholder={app?.redirect}
                                {...form.register('update_redirect')}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>ID</Label>
                            <Input value={app?.id} readOnly={true} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Secret</Label>
                            <Input value={app?.secret} readOnly={true} />
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
    errors?: {
        name: string;
        redirect: string;
    };
}

export function ApplicationForm(props: ApplicationFormProps) {
    const form = useForm();
    const nameError = props.errors?.name;
    const redirectError = props.errors?.redirect;

    function onSubmit() {
        router.post(route('admin.applications'), form.getValues(), {
            preserveState: 'errors',
        });
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
                {redirectError ? (
                    <div className="text-sm text-red-500">{redirectError}</div>
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
                            <Label htmlFor="redirect">Redirect URL</Label>
                            <Input
                                id="redirect"
                                placeholder="http://example.com/callback"
                                {...form.register('redirect')}
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
