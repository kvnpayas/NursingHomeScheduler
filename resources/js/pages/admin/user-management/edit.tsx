import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { CircleAlert, CircleCheck, CircleX } from 'lucide-react';
import { AlertDialog } from '@radix-ui/react-alert-dialog';
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useState } from 'react';

interface Props {
    user: any;
    onClose: () => void;
}

export default function UserCreateForm({ user, onClose }: Props) {
    const [open, setOpen] = useState(false)
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        role: user.role || 'staff',
        status: user.status || 'inactive',
        default_password: user.default_password != null ? true : false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.user-management.update', user.id), {
            onSuccess: () => {
                onClose();
                toast.success("User updated successfully.");
            },
        });
    };

    const handleResetPassword = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.user-management.reset-password', user.id), {
            onSuccess: () => {
                onClose();
                setOpen(false);
                toast.success("An email has been sent to the user with their new login details.");
            },
        });
    }

    const openConfirmationDialog = () => {
        setOpen(true);
    }

    return (
        <div>
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <Input
                        placeholder="Name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    {errors.name && <div className="text-red-500 text-xs">{errors.name}</div>}
                </div>
                <div>
                    <Input
                        placeholder="Email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    {errors.email && <div className="text-red-500 text-xs">{errors.email}</div>}
                </div>
                <div>
                    <Input
                        placeholder="Phone"
                        type="string"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                    />
                    {errors.phone && <div className="text-red-500 text-xs">{errors.phone}</div>}
                </div>
                <div>
                    <select
                        value={data.role}
                        onChange={(e) => setData('role', e.target.value)}
                        className="border rounded p-2 w-full"
                    >
                        <option value="admin">Admin</option>
                        <option value="staff">Staff</option>
                        <option value="customer">Customer</option>
                    </select>
                    {errors.role && <div className="text-red-500 text-xs">{errors.role}</div>}
                </div>

                <div className='flex items-center space-x-2'>
                    <Switch id="status" checked={data.status === 'active'} onCheckedChange={(checked) => setData('status', checked ? 'active' : 'inactive')} />
                    <label htmlFor="status" className='select-none'>Account Status</label>
                </div>

                <div>
                    <Label htmlFor="default_password" className='select-none'>Default password still in used</Label>
                    {user.default_password ? (
                        <CircleCheck className='inline-block ml-2 h-4 w-4 text-green-500' />
                    ) : (
                        <CircleX className='inline-block ml-2 h-4 w-4 text-red-500' />
                    )}
                </div>

                <div>
                    <Button type="button" onClick={openConfirmationDialog}>Reset Password</Button>
                </div>

                <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={onClose} disabled={processing}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={processing}>
                        Update
                    </Button>
                </div>
            </form>

            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Reset {user.name} password?</AlertDialogTitle>
                        <AlertDialogDescription>
                            <div className='flex space-x-2 items-center'>
                                <div>
                                    <CircleAlert className='inline-block mr-2 h-10 w-10 text-yellow-500' />
                                </div>
                                <div>
                                    This will reset the user's password to the system default.
                                    The user will need to change their password after logging in.
                                </div>
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleResetPassword}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
