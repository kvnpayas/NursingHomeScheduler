import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface Props {
    onClose: () => void;
}

export default function UserCreateForm({ onClose }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        role: 'staff', // default role
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(data);
        post(route('admin.user-management.store'), {
            onSuccess: () => {
                onClose();
                toast.success("An email has been sent to the user with their login details.");
            },
        });
    };

    return (
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

            <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button type="submit" disabled={processing}>
                    Create
                </Button>
            </div>
        </form>
    );
}
