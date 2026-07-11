import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { index, create, store } from '@/routes/users';
import type { BreadcrumbItem, UserForm } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Manage Users', href: index() },
    { title: 'Add User', href: create() },
];

export default function UserCreate() {
    const { data, setData, post, errors, reset, processing, recentlySuccessful } =
        useForm<UserForm>({ name: '', email: '', role: 'staff', password: '', password_confirmation: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store.url(), { onSuccess: () => reset() });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add a new User" />
            <div className="flex h-full flex-col gap-4 overflow-x-auto p-4">
                <h3 className="text-lg font-medium">Add a new User</h3>
                <Separator />
                <form onSubmit={handleSubmit} method="post" className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input type="text" id="name" required value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" required value={data.email} onChange={(e) => setData('email', e.target.value)} />
                        <InputError className="mt-2" message={errors.email} />
                    </div>

                    <div className="space-y-2">
                        <Label>Role</Label>
                        <RadioGroup
                            value={data.role}
                            onValueChange={(value) => setData('role', value as 'proktor' | 'staff')}
                            className="flex gap-4"
                        >
                            <div className="flex items-center gap-2">
                                <RadioGroupItem value="staff" id="staff" />
                                <Label htmlFor="staff">Staff</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <RadioGroupItem value="proktor" id="proktor" />
                                <Label htmlFor="proktor">Proktor</Label>
                            </div>
                        </RadioGroup>
                        <InputError className="mt-2" message={errors.role} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" id="password" required value={data.password} onChange={(e) => setData('password', e.target.value)} />
                        <InputError className="mt-2" message={errors.password} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password_confirmation">Confirm Password</Label>
                        <Input type="password" id="password_confirmation" required value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} />
                        <InputError className="mt-2" message={errors.password_confirmation} />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>Add</Button>
                        <Transition show={recentlySuccessful} enter="transition ease-in-out" enterFrom="opacity-0" leave="transition ease-in-out" leaveTo="opacity-0">
                            <p className="text-sm text-green-600">Added.</p>
                        </Transition>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
