import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { useLanguage } from '@/contexts/language-context';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { index, edit, update } from '@/routes/users';
import type { BreadcrumbItem } from '@/types';
import type { User } from '@/types/user';

export default function UserEdit({ user }: { user: User }) {
    const { t } = useLanguage();
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Manage Users', href: index() },
        { title: 'Edit User', href: edit(user.id) },
    ];

    const { data, setData, put, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            role: user.role,
            password: '',
            password_confirmation: '',
        });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(update.url(user.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit User" />
            <div className="flex h-full flex-col gap-4 overflow-x-auto p-4">
                <h3 className="text-lg font-medium">Edit User</h3>
                <Separator />
                <form onSubmit={handleSubmit} method="post" className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">{t('name')}</Label>
                        <Input type="text" id="name" required value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">{t('email')}</Label>
                        <Input type="email" id="email" required value={data.email} onChange={(e) => setData('email', e.target.value)} />
                        <InputError className="mt-2" message={errors.email} />
                    </div>

                    <div className="space-y-2">
                        <Label>{t('role')}</Label>
                        <RadioGroup
                            value={data.role}
                            onValueChange={(value) => setData('role', value as 'proktor' | 'staff')}
                            className="flex gap-4"
                        >
                            <div className="flex items-center gap-2">
                                <RadioGroupItem value="staff" id="staff" />
                                <Label htmlFor="staff">{t('staff')}</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <RadioGroupItem value="proktor" id="proktor" />
                                <Label htmlFor="proktor">{t('proktor')}</Label>
                            </div>
                        </RadioGroup>
                        <InputError className="mt-2" message={errors.role} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">{t('newPassword')}</Label>
                        <Input type="password" id="password" value={data.password} onChange={(e) => setData('password', e.target.value)} />
                        <InputError className="mt-2" message={errors.password} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password_confirmation">{t('confirmNewPassword')}</Label>
                        <Input type="password" id="password_confirmation" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} />
                        <InputError className="mt-2" message={errors.password_confirmation} />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>{t('edit')}</Button>
                        <Transition show={recentlySuccessful} enter="transition ease-in-out" enterFrom="opacity-0" leave="transition ease-in-out" leaveTo="opacity-0">
                            <p className="text-sm text-green-600">{t('updated')}</p>
                        </Transition>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
