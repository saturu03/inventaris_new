import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { index, edit, update } from '@/routes/majors';
import type { BreadcrumbItem, Major, MajorForm } from '@/types';

export default function MajorEdit({ major }: { major: Major }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Manage Majors', href: index() },
        { title: 'Edit Major', href: edit(major.id) },
    ];

    const { data, setData, put, errors, reset, processing, recentlySuccessful } =
        useForm<MajorForm>({ full_name: major.full_name, alias: major.alias });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(update.url(major.id), { onSuccess: () => reset() });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Major" />
            <div className="flex h-full flex-col gap-4 overflow-x-auto p-4">
                <h3 className="text-lg font-medium">Edit Major</h3>
                <Separator />
                <form onSubmit={handleSubmit} method="post" className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="full_name" className="block text-sm font-medium">Full Name</Label>
                            <Input type="text" id="full_name" required value={data.full_name} onChange={(e) => setData('full_name', e.target.value)} />
                            <InputError className="mt-2" message={errors.full_name} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="alias" className="block text-sm font-medium">Alias</Label>
                            <Input type="text" id="alias" required maxLength={4} value={data.alias} onChange={(e) => setData('alias', e.target.value)} />
                            <InputError className="mt-2" message={errors.alias} />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>Edit</Button>
                        <Transition show={recentlySuccessful} enter="transition ease-in-out" enterFrom="opacity-0" leave="transition ease-in-out" leaveTo="opacity-0">
                            <p className="text-sm text-green-600">Updated.</p>
                        </Transition>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
