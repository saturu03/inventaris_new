import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { index, edit, update } from '@/routes/categories';
import { useLanguage } from '@/contexts/language-context';
import type { BreadcrumbItem, Category, CategoryForm } from '@/types';

export default function CategoryEdit({ category }: { category: Category }) {
    const { t } = useLanguage();
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Manage Categories', href: index() },
        { title: 'Edit Category', href: edit(category.id) },
    ];

    const { data, setData, put, errors, reset, processing, recentlySuccessful } =
        useForm<CategoryForm>({ name: category.name });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(update.url(category.id), { onSuccess: () => reset() });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Category" />
            <div className="flex h-full flex-col gap-4 overflow-x-auto p-4">
                <h3 className="text-lg font-medium">{t('editCategory')}</h3>
                <Separator />
                <form onSubmit={handleSubmit} method="post" className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="block text-sm font-medium">{t('name')}</Label>
                        <Input type="text" id="name" required value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        <InputError className="mt-2" message={errors.name} />
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
