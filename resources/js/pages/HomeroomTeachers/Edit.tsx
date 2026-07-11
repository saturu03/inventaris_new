import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { index, edit, update } from '@/routes/homeroom-teachers';
import type { BreadcrumbItem } from '@/types';
import type { HomeroomTeacher } from '@/types/homeroom-teacher';

const classLevels = ['10', '11', '12'] as const;
const majors = ['PPLG1', 'PPLG2', 'TKR1', 'TKR2', 'TBSM1', 'TBSM2', 'MPLB1', 'MPLB2'] as const;

export default function HomeroomTeacherEdit({ homeroomTeacher }: { homeroomTeacher: HomeroomTeacher }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Wali Kelas', href: index() },
        { title: 'Edit Wali Kelas', href: edit(homeroomTeacher.id) },
    ];

    const { data, setData, put, errors, processing, recentlySuccessful } =
        useForm({
            name: homeroomTeacher.name,
            class_level: homeroomTeacher.class_level,
            major: homeroomTeacher.major,
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
                <h3 className="text-lg font-medium">Edit Wali Kelas</h3>
                <Separator />
                <form onSubmit={handleSubmit} method="post" className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input type="text" id="name" required value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="class_level">Kelas</Label>
                        <RadioGroup
                            value={data.class_level}
                            onValueChange={(value) => setData('class_level', value)}
                            className="flex flex-wrap gap-4"
                        >
                            {classLevels.map((level) => (
                                <div key={level} className="flex items-center gap-2">
                                    <RadioGroupItem value={level} id={`class_${level}`} />
                                    <Label htmlFor={`class_${level}`}>{level}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                        <InputError className="mt-2" message={errors.class_level} />
                    </div>

                    <div className="space-y-2">
                        <Label>Jurusan</Label>
                        <RadioGroup
                            value={data.major}
                            onValueChange={(value) => setData('major', value)}
                            className="flex flex-wrap gap-4"
                        >
                            {majors.map((major) => (
                                <div key={major} className="flex items-center gap-2">
                                    <RadioGroupItem value={major} id={major} />
                                    <Label htmlFor={major}>{major}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                        <InputError className="mt-2" message={errors.major} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">No. WhatsApp</Label>
                        <Input type="text" id="phone" required value={data.phone} onChange={(e) => setData('phone', e.target.value)} placeholder="08xxxxxxxxxx" />
                        <InputError className="mt-2" message={errors.phone} />
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
