import { Membership } from '@/types/app';
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

export interface MembershipTableProps {
    memberships: Membership[];
}

const columns: ColumnDef<Membership>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
];

export interface MembershipApplicationFormProps {
    errors?: {
        name: string;
        id: string;
    };
}

export interface EditDialogProps {
    membership: Membership | null;
    open: boolean;
    onOpenChange(open: boolean): void;
    errors?: {
        update_name: string;
    };
}

function EditDialog(props: EditDialogProps) {
    const form = useForm();
    const memb = props.membership;
    const nameError = props.errors?.update_name;

    function onSubmit() {
        router.post(
            route('admin.membership.update', memb?.id),
            form.getValues(),
            { preserveState: 'errors' },
        );
    }

    function onDelete() {
        router.delete(route('admin.membership.delete', memb?.id), {
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
                <DialogTitle>Edit membership</DialogTitle>
                {nameError ? (
                    <div className="text-sm text-red-500">{nameError}</div>
                ) : null}
                <form>
                    <div className="flex flex-col gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="update_name">Name</Label>
                            <Input
                                id="update_name"
                                placeholder={memb?.name}
                                {...form.register('update_name')}
                            />
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

export function MembershipForm(props: MembershipApplicationFormProps) {
    const form = useForm();
    const nameError = props.errors?.name;

    function onSubmit() {
        router.post(route('admin.membership'), form.getValues(), {
            preserveState: 'errors',
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add membership</CardTitle>
            </CardHeader>
            <CardContent>
                {nameError ? (
                    <div className="text-sm text-red-500">{nameError}</div>
                ) : null}
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                placeholder="Example"
                                {...form.register('name')}
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

export function MembershipTable(props: MembershipTableProps) {
    const table = useReactTable({
        columns: columns,
        data: props.memberships,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [selectedMemb, setSelectedApp] = useState<Membership | null>(null);

    useEffect(() => {
        table.setPageSize(Number(20));
    }, []);

    return (
        <div>
            <EditDialog
                membership={selectedMemb}
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
