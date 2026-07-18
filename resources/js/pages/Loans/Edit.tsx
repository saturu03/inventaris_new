import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/language-context';
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
import AppLayout from '@/layouts/app-layout';
import { index, edit, update } from '@/routes/loans';
import type { BreadcrumbItem, Item, Student, Loan, LoanForm } from '@/types';

export default function LoanEdit({
    loan,
    items,
    students,
}: {
    loan: Loan;
    items: Item[];
    students: Student[];
}) {
    const { t } = useLanguage();
    const roleOptions = [
        { value: 'student', label: t('student') },
        { value: 'teacher', label: t('teacher') },
        { value: 'staff', label: t('staffRole') },
        { value: 'external', label: t('external') },
        { value: 'tukang', label: t('tukang') },
        { value: 'other', label: t('other') },
    ] as const;
    const predefinedRole = roleOptions.find((r) => r.value === loan.borrower_role);
    const [isCustomRole, setIsCustomRole] = useState(!predefinedRole);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Manage Loans',
            href: index(),
        },
        {
            title: 'Edit Loan',
            href: edit(loan.id),
        },
    ];

    const {
        data,
        setData,
        put,
        errors,
        reset,
        processing,
        recentlySuccessful,
    } = useForm<LoanForm>({
        entries: [],
        item_ids: [],
        item_id: loan.item_id || 0,
        student_id: loan.student_id || null,
        borrower_name: loan.borrower_name || '',
        borrower_role: loan.borrower_role || 'student',
        collateral_type: loan.collateral_type || 'Kartu Pelajar',
        borrower_date: loan.borrower_date || '',
        estimated_return_date: loan.estimated_return_date || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(update.url(loan.id), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Loan" />
            <div className="flex h-full flex-col gap-4 overflow-x-auto p-4">
                <h3 className="text-lg font-medium">Edit Loan</h3>
                <Separator />
                <form
                    onSubmit={handleSubmit}
                    method="post"
                    className="space-y-6"
                >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label className="block text-sm font-medium">
                                {t('items')}
                            </Label>
                            <Select
                                value={
                                    data.item_id
                                        ? data.item_id.toString()
                                        : ''
                                }
                                onValueChange={(value) =>
                                    setData('item_id', Number(value))
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={t('selectItem')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>{t('items')}</SelectLabel>
                                        {items.map((item) => (
                                            <SelectItem
                                                value={item.id.toString()}
                                                key={item.id}
                                            >
                                                {item.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError
                                className="mt-2"
                                message={errors.item_id}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="block text-sm font-medium">
                                {t('borrowerName')}
                            </Label>
                            <Input
                                type="text"
                                name="borrower_name"
                                id="borrower_name"
                                required
                                value={data.borrower_name}
                                onChange={(e) =>
                                    setData('borrower_name', e.target.value)
                                }
                            />
                            <InputError
                                className="mt-2"
                                message={errors.borrower_name}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label className="block text-sm font-medium">
                                {t('borrowerRole')}
                            </Label>
                            <Select
                                value={isCustomRole ? 'other' : data.borrower_role}
                                onValueChange={(value) => {
                                    if (value === 'other') {
                                        setIsCustomRole(true);
                                        setData('borrower_role', '');
                                    } else {
                                        setIsCustomRole(false);
                                        setData('borrower_role', value);
                                        if (value !== 'student') {
                                            setData('student_id', null);
                                        }
                                    }
                                }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={t('selectRole')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>{t('roles')}</SelectLabel>
                                        {roleOptions.map((role) => (
                                            <SelectItem key={role.value} value={role.value}>
                                                {role.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {isCustomRole && (
                                <Input
                                    type="text"
                                    placeholder={t('typeCustomRole')}
                                    value={data.borrower_role}
                                    onChange={(e) => setData('borrower_role', e.target.value)}
                                    className="mt-2"
                                />
                            )}
                            <InputError
                                className="mt-2"
                                message={errors.borrower_role}
                            />
                        </div>

                        {data.borrower_role === 'student' && (
                            <div className="space-y-2">
                                    <Label className="block text-sm font-medium">
                                        {t('student')}
                                    </Label>
                                <Select
                                    value={
                                        data.student_id
                                            ? data.student_id.toString()
                                            : ''
                                    }
                                    onValueChange={(value) =>
                                        setData('student_id', Number(value))
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder={t('selectStudentOptional')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>{t('students')}</SelectLabel>
                                            {students.map((student) => (
                                                <SelectItem
                                                    value={student.id.toString()}
                                                    key={student.id}
                                                >
                                                    {student.name} ({student.nis})
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <InputError
                                    className="mt-2"
                                    message={errors.student_id}
                                />
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label
                                htmlFor="collateral_type"
                                className="block text-sm font-medium"
                            >
                                {t('collateralType')}
                            </Label>
                            <Input
                                type="text"
                                name="collateral_type"
                                id="collateral_type"
                                required
                                value={data.collateral_type}
                                onChange={(e) =>
                                    setData('collateral_type', e.target.value)
                                }
                            />
                            <InputError
                                className="mt-2"
                                message={errors.collateral_type}
                            />
                        </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="borrower_date"
                            className="block text-sm font-medium"
                        >
                            {t('borrowDate')}
                        </Label>
                        <Input
                            type="datetime-local"
                            name="borrower_date"
                            id="borrower_date"
                            required
                            value={data.borrower_date}
                            onChange={(e) =>
                                setData('borrower_date', e.target.value)
                            }
                        />
                        <InputError
                            className="mt-2"
                            message={errors.borrower_date}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="estimated_return_date"
                            className="block text-sm font-medium"
                        >
                            {t('estimatedReturn')}
                        </Label>
                        <Input
                            type="datetime-local"
                            name="estimated_return_date"
                            id="estimated_return_date"
                            value={data.estimated_return_date}
                            onChange={(e) =>
                                setData('estimated_return_date', e.target.value)
                            }
                        />
                        <InputError
                            className="mt-2"
                            message={errors.estimated_return_date}
                        />
                    </div>
                </div>

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            Update
                        </Button>
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-green-600">Updated.</p>
                        </Transition>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
