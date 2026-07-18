import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { useLanguage } from '@/contexts/language-context';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    RadioGroup,
    RadioGroupItem,
} from '@/components/ui/radio-group';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { index, create, store } from '@/routes/students';
import type { BreadcrumbItem, StudentForm, Major, Class } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Students',
        href: index(),
    },
    {
        title: 'Add Student',
        href: create(),
    },
];

export default function StudentCreate({
    majors,
    classes,
}: {
    majors: Major[];
    classes: Class[];
}) {
    const { t } = useLanguage();
    const {
        data,
        setData,
        post,
        errors,
        reset,
        processing,
        recentlySuccessful,
    } = useForm<StudentForm>({
        major_id: 0,
        class_id: 0,
        name: '',
        nis: 0,
        gender: '',
        address: '',
        phone: '',
        photo: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store.url(), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add a new Student" />
            <div className="flex h-full flex-col gap-4 overflow-x-auto p-4">
                <h3 className="text-lg font-medium">Add a new Student</h3>
                <Separator />
                <form
                    onSubmit={handleSubmit}
                    method="post"
                    className="space-y-6"
                >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label className="block text-sm font-medium">
                                {t('major')}
                            </Label>
                            <Select
                                value={
                                    data.major_id
                                        ? data.major_id.toString()
                                        : ''
                                }
                                onValueChange={(value) =>
                                    setData('major_id', Number(value))
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={t('selectMajor')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>{t('majors')}</SelectLabel>
                                        {majors.map((major) => (
                                            <SelectItem
                                                value={major.id.toString()}
                                                key={major.id}
                                            >
                                                {major.full_name} (
                                                {major.alias})
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError
                                className="mt-2"
                                message={errors.major_id}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="block text-sm font-medium">
                                {t('class')}
                            </Label>
                            <Select
                                value={
                                    data.class_id
                                        ? data.class_id.toString()
                                        : ''
                                }
                                onValueChange={(value) =>
                                    setData('class_id', Number(value))
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={t('selectClass')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>{t('classes')}</SelectLabel>
                                        {classes.map((cls) => (
                                            <SelectItem
                                                value={cls.id.toString()}
                                                key={cls.id}
                                            >
                                                {cls.level}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError
                                className="mt-2"
                                message={errors.class_id}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label
                                htmlFor="name"
                                className="block text-sm font-medium"
                            >
                                {t('name')}
                            </Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                required
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                            />
                            <InputError
                                className="mt-2"
                                message={errors.name}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="nis"
                                className="block text-sm font-medium"
                            >
                                {t('nis')}
                            </Label>
                            <Input
                                type="number"
                                name="nis"
                                id="nis"
                                required
                                value={data.nis || ''}
                                onChange={(e) =>
                                    setData('nis', Number(e.target.value))
                                }
                            />
                            <InputError
                                className="mt-2"
                                message={errors.nis}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label className="block text-sm font-medium">
                                {t('gender')}
                            </Label>
                            <RadioGroup
                                value={data.gender}
                                onValueChange={(value) =>
                                    setData('gender', value)
                                }
                                className="flex items-center gap-6 pt-1"
                            >
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem
                                        value="male"
                                        id="gender-male"
                                    />
                                    <Label htmlFor="gender-male">{t('male')}</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem
                                        value="female"
                                        id="gender-female"
                                    />
                                    <Label htmlFor="gender-female">
                                        {t('female')}
                                    </Label>
                                </div>
                            </RadioGroup>
                            <InputError
                                className="mt-2"
                                message={errors.gender}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="phone"
                                className="block text-sm font-medium"
                            >
                                {t('phone')}
                            </Label>
                            <Input
                                type="text"
                                name="phone"
                                id="phone"
                                value={data.phone}
                                onChange={(e) =>
                                    setData('phone', e.target.value)
                                }
                            />
                            <InputError
                                className="mt-2"
                                message={errors.phone}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label
                                htmlFor="address"
                                className="block text-sm font-medium"
                            >
                                {t('address')}
                            </Label>
                            <Textarea
                                name="address"
                                id="address"
                                rows={3}
                                value={data.address}
                                onChange={(e) =>
                                    setData('address', e.target.value)
                                }
                            />
                            <InputError
                                className="mt-2"
                                message={errors.address}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="photo"
                                className="block text-sm font-medium"
                            >
                                {t('photo')}
                            </Label>
                            <Input
                                type="file"
                                name="photo"
                                id="photo"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setData(
                                            'photo',
                                            file as unknown as string,
                                        );
                                    }
                                }}
                            />
                            <InputError
                                className="mt-2"
                                message={errors.photo}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            {t('add')}
                        </Button>
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-green-600">{t('added')}</p>
                        </Transition>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
