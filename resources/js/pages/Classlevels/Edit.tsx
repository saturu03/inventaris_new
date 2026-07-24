import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { index, edit, update } from '@/routes/classlevels';
import { useLanguage } from '@/contexts/language-context';
import type { BreadcrumbItem, Classlevel, ClasslevelForm } from '@/types';

export default function ClasslevelEdit({ classlevel }: { classlevel: Classlevel }) {
    const { t } = useLanguage();
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Manage Classes', href: index() },
        { title: 'Edit Class', href: edit(classlevel.id) },
    ];

    const { data, setData, put, errors, reset, processing, recentlySuccessful } =
        useForm<ClasslevelForm>({ level: String(classlevel.level) });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(update.url(classlevel.id), { onSuccess: () => reset() });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Class" />
            <div className="flex h-full flex-col gap-4 overflow-x-auto p-4">
                <h3 className="text-lg font-medium">{t('editClass')}</h3>
                <Separator />
                <form onSubmit={handleSubmit} method="post" className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="level" className="block text-sm font-medium">{t('level')}</Label>
                            <Input
                                type="text"
                                name="level"
                                id="level"
                                required
                                placeholder="contoh: 10"
                                value={data.level}
                                onChange={(e) => setData('level', e.target.value)}
                            />
                            <InputError className="mt-2" message={errors.level} />
                        </div>
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
