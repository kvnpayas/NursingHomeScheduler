import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import { route } from 'ziggy-js';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import UserCreateForm from './create';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Megaphone } from 'lucide-react';
import { Interface } from 'readline';
import { Badge } from '@/components/ui/badge';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Management',
        href: '/user-management',
    },
];

interface Users {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
    status: string;
}

interface PageProps {
    flash: {
        success?: string;
    }
    users: Users[];
}

export default function UserManagement() {
    const [open, setOpen] = useState(false);
    const { users, flash } = usePage().props as PageProps;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Management" />

            <div className="p-10 space-y-6">
                {flash.success && (
                    <Alert>
                        <Megaphone className='h-4 2-4' />
                        <AlertTitle>Notifications!</AlertTitle>
                        <AlertDescription>
                            {flash.success && <div className='text-green-600'>{flash.success}</div>}
                        </AlertDescription>
                    </Alert>
                )}
                <div className="flex justify-end">
                    <Button onClick={() => setOpen(true)}>Create User</Button>

                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create User</DialogTitle>
                            </DialogHeader>

                            <UserCreateForm onClose={() => setOpen(false)} />
                        </DialogContent>
                    </Dialog>
                </div>
                <div className='border rounded-lg p-4 shadow'>
                    <Table>
                        <TableCaption>A list of your recent invoices.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Id</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead >Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.length > 0 && (
                                users.map((user) => (
                                    <TableRow>
                                        <TableCell className="font-medium">{user.id}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.phone}</TableCell>
                                        <TableCell>
                                            <Badge className='shadow' variant={user.role === 'admin' ? 'destructive' : user.role === 'staff' ? 'staff' : 'success'}>
                                                <span className='uppercase font-extrabold text-[0.6rem]'>
                                                    {user.role}
                                                </span>
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className='shadow' variant={user.status === 'active' ? 'success' : 'destructive'}>
                                                <span className='uppercase font-extrabold text-[0.6rem]'>
                                                    {user.status}
                                                </span>
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
