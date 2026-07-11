import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { index, edit, update } from '@/routes/classlevels';
import type { BreadcrumbItem, Classlevel, ClasslevelForm } from '@/types';

export default function ClasslevelEdit({ classlevel }: { classlevel: Classlevel }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Manage Classes', href: index() },
        { title: 'Edit Class', href: edit(classlevel.id) },
    ];

    const { data, setData, put, errors, reset, processing, recentlySuccessful } =
        useForm<ClasslevelForm>({ level: classlevel.level });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(update.url(classlevel.id), { onSuccess: () => reset() });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Class" />
            <div className="flex h-full flex-col gap-4 overflow-x-auto p-4">
                <h3 className="text-lg font-medium">Edit Class</h3>
                <Separator />
                <form onSubmit={handleSubmit} method="post" className="space-y-6">
                    <div className="space-y-2">
                        <Label className="block text-sm font-medium">Level</Label>
                        <Select
                            value={data.level.toString()}
                            onValueChange={(value) => setData('level', Number(value))}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Levels</SelectLabel>
                                    <SelectItem value="10">Class 10</SelectItem>
                                    <SelectItem value="11">Class 11</SelectItem>
                                    <SelectItem value="12">Class 12</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <InputError className="mt-2" message={errors.level} />
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
