import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/language-context';
import AppLayout from '@/layouts/app-layout';
import { index, edit, update } from '@/routes/homeroom-teachers';
import type { BreadcrumbItem } from '@/types';

type ClassLevel = {
    id: number;
    level: string;
};

type Major = {
    id: number;
    alias: string;
    full_name: string;
};

type HomeroomTeacher = {
    id: number;
    name: string;
    major_id: number;
    class_id: number;
    phone: string;
};

export default function HomeroomTeacherEdit({ homeroomTeacher, classLevels, majors }: { homeroomTeacher: HomeroomTeacher; classLevels: ClassLevel[]; majors: Major[] }) {
    const { t } = useLanguage();
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Wali Kelas', href: index() },
        { title: 'Edit Wali Kelas', href: edit(homeroomTeacher.id) },
    ];

    const { data, setData, put, errors, processing, recentlySuccessful } =
        useForm({
            name: homeroomTeacher.name,
            class_id: homeroomTeacher.class_id,
            major_id: homeroomTeacher.major_id,
            phone: homeroomTeacher.phone,
        });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(update.url(homeroomTeacher.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Wali Kelas" />
            <div className="flex h-full flex-col gap-4 overflow-x-auto p-4">
                <h3 className="text-lg font-medium">{t('editHomeroomTeacher')}</h3>
                <Separator />
                <form onSubmit={handleSubmit} method="post" className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">{t('name')}</Label>
                        <Input type="text" id="name" required value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="class_id">{t('classLabel')}</Label>
                        <RadioGroup
                            value={String(data.class_id)}
                            onValueChange={(value) => setData('class_id', Number(value))}
                            className="flex flex-wrap gap-4"
                        >
                            {classLevels.map((cls) => (
                                <div key={cls.id} className="flex items-center gap-2">
                                    <RadioGroupItem value={String(cls.id)} id={`class_${cls.id}`} />
                                    <Label htmlFor={`class_${cls.id}`}>{cls.level}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                        <InputError className="mt-2" message={errors.class_id} />
                    </div>

                    <div className="space-y-2">
                        <Label>{t('majorLabel')}</Label>
                        <RadioGroup
                            value={String(data.major_id)}
                            onValueChange={(value) => setData('major_id', Number(value))}
                            className="flex flex-wrap gap-4"
                        >
                            {majors.map((major) => (
                                <div key={major.id} className="flex items-center gap-2">
                                    <RadioGroupItem value={String(major.id)} id={`major_${major.id}`} />
                                    <Label htmlFor={`major_${major.id}`}>{major.alias}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                        <InputError className="mt-2" message={errors.major_id} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">{t('whatsapp')}</Label>
                        <Input type="text" id="phone" required value={data.phone} onChange={(e) => setData('phone', e.target.value)} placeholder="08xxxxxxxxxx" />
                        <InputError className="mt-2" message={errors.phone} />
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
