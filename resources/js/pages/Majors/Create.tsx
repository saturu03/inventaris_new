import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { index, create, store } from '@/routes/majors';
import type { BreadcrumbItem, MajorForm } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Manage Majors', href: index() },
    { title: 'Add Major', href: create() },
];

export default function MajorCreate() {
    const { data, setData, post, errors, reset, processing, recentlySuccessful } =
        useForm<MajorForm>({ full_name: '', alias: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store.url(), { onSuccess: () => reset() });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add a new Major" />
            <div className="flex h-full flex-col gap-4 overflow-x-auto p-4">
                <h3 className="text-lg font-medium">Add a new Major</h3>
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
