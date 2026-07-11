import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { index, create, store } from '@/routes/categories';
import type { BreadcrumbItem, CategoryForm } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Manage Categories', href: index() },
    { title: 'Add Category', href: create() },
];

export default function CategoryCreate() {
    const { data, setData, post, errors, reset, processing, recentlySuccessful } =
        useForm<CategoryForm>({ name: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store.url(), { onSuccess: () => reset() });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add a new Category" />
            <div className="flex h-full flex-col gap-4 overflow-x-auto p-4">
                <h3 className="text-lg font-medium">Add a new Category</h3>
                <Separator />
                <form onSubmit={handleSubmit} method="post" className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="block text-sm font-medium">Name</Label>
                        <Input type="text" id="name" required value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        <InputError className="mt-2" message={errors.name} />
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
