import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Plus, Scan, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import YudielScanner from '@/components/yudiel-scanner';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multi-select';
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
import { index, create, store } from '@/routes/loans';
import { byBarcode as studentByBarcode } from '@/routes/students';
import { byBarcode as itemByBarcode } from '@/routes/items';
import type { BreadcrumbItem, Item, Student, LoanForm } from '@/types';

const roleOptions = [
    { value: 'student', label: 'Student' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'staff', label: 'Staff' },
    { value: 'external', label: 'External' },
    { value: 'tukang', label: 'Tukang' },
    { value: 'other', label: 'Other...' },
] as const;

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Loans',
        href: index(),
    },
    {
        title: 'Add Loan',
        href: create(),
    },
];

export default function LoanCreate({
    items,
    students,
}: {
    items: Item[];
    students: Student[];
}) {
    const [isCustomRole, setIsCustomRole] = useState(false);
    const [scanningStudent, setScanningStudent] = useState<number | null>(null);
    const [scanningItem, setScanningItem] = useState<number | null>(null);
    const [scanError, setScanError] = useState<string | null>(null);

    const {
        data,
        setData,
        post,
        errors,
        reset,
        processing,
        recentlySuccessful,
    } = useForm<LoanForm>({
        entries: [
            { student_id: null, borrower_name: '', item_ids: [] },
        ],
        borrower_role: 'student',
        collateral_type: 'Kartu Pelajar',
        borrower_date: '',
        estimated_return_date: '',
    });

    useEffect(() => {
        if (!data.borrower_date) {
            setData('borrower_date', getCurrentDateTimeLocal());
        }
    }, []);

    const getCurrentDateTimeLocal = () => {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        return now.toISOString().slice(0, 16);
    };

    const addEntry = () => {
        setData('entries', [
            ...data.entries,
            { student_id: null, borrower_name: '', item_ids: [] },
        ]);
    };

    const removeEntry = (index: number) => {
        setData(
            'entries',
            data.entries.filter((_, i) => i !== index),
        );
    };

    const handleStudentChange = (index: number, studentId: number) => {
        const updated = [...data.entries];
        const student = students.find((s) => s.id === studentId);
        updated[index].student_id = studentId;
        if (student) {
            updated[index].borrower_name = student.name;
        }
        setData('entries', updated);
    };

    const handleStudentScan = async (barcode: string, entryIndex: number) => {
        setScanError(null);
        setScanningStudent(entryIndex);
        try {
            const res = await fetch(studentByBarcode.url({ barcode }));
            if (!res.ok) {
                setScanError('Siswa dengan barcode tersebut tidak ditemukan.');
                return;
            }
            const student: Student = await res.json();
            const updated = [...data.entries];
            updated[entryIndex].student_id = student.id;
            updated[entryIndex].borrower_name = student.name;
            setData('entries', updated);
        } catch {
            setScanError('Gagal memuat data siswa. Periksa koneksi Anda.');
        } finally {
            setScanningStudent(null);
        }
    };

    const handleItemScan = async (barcode: string, entryIndex: number) => {
        setScanError(null);
        setScanningItem(entryIndex);
        try {
            const res = await fetch(itemByBarcode.url({ barcode }));
            if (!res.ok) {
                setScanError('Barang dengan barcode tersebut tidak ditemukan.');
                return;
            }
            const item: Item = await res.json();
            const updated = [...data.entries];
            if (!updated[entryIndex].item_ids.includes(item.id)) {
                updated[entryIndex].item_ids = [...updated[entryIndex].item_ids, item.id];
            }
            setData('entries', updated);
        } catch {
            setScanError('Gagal memuat data barang. Periksa koneksi Anda.');
        } finally {
            setScanningItem(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store.url(), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add a new Loan" />
            <div className="flex h-full flex-col gap-4 overflow-x-auto p-4">
                <h3 className="text-lg font-medium">Add a new Loan</h3>
                <Separator />
                <form
                    onSubmit={handleSubmit}
                    method="post"
                    className="space-y-6"
                >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        <div className="space-y-2">
                            <Label className="block text-sm font-medium">
                                Borrower Role
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
                                            setData('entries', data.entries.map((e) => ({ ...e, student_id: null })));
                                        }
                                    }
                                }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Roles</SelectLabel>
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
                                    placeholder="Type custom role..."
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

                        <div className="space-y-2">
                            <Label
                                htmlFor="collateral_type"
                                className="block text-sm font-medium"
                            >
                                Collateral Type
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
                            Borrow Date
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
                            Estimasi Kembali
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

                    <Separator />

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium">
                                Borrowers
                            </Label>
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={addEntry}
                                >
                                    <Plus className="mr-1 size-4" />
                                    Add Borrower
                                </Button>
                            </div>
                        </div>

                        {data.entries.map((entry, entryIndex) => (
                            <div
                                key={entryIndex}
                                className="space-y-4 rounded-lg border p-4"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    {data.borrower_role === 'student' && (
                                        <div className="flex-1 space-y-2">
                                            <Label className="block text-sm font-medium">
                                                Student
                                            </Label>
                                            <Select
                                                value={
                                                    entry.student_id
                                                        ? entry.student_id.toString()
                                                        : ''
                                                }
                                                onValueChange={(value) =>
                                                    handleStudentChange(
                                                        entryIndex,
                                                        Number(value),
                                                    )
                                                }
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select student" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>
                                                            Students
                                                        </SelectLabel>
                                                        {students.map(
                                                            (student) => (
                                                                <SelectItem
                                                                    value={student.id.toString()}
                                                                    key={
                                                                        student.id
                                                                    }
                                                                >
                                                                    {student.name}{' '}
                                                                    ({student.nis})
                                                                </SelectItem>
                                                            ),
                                                        )}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <InputError
                                                className="mt-2"
                                                message={errors[`entries.${entryIndex}.student_id` as keyof typeof errors]}
                                            />
                                        </div>
                                    )}

                                    <div className="flex-1 space-y-2">
                                        <Label
                                            htmlFor={`borrower_name_${entryIndex}`}
                                            className="block text-sm font-medium"
                                        >
                                            Borrower Name
                                        </Label>
                                        <Input
                                            type="text"
                                            name={`entries.${entryIndex}.borrower_name`}
                                            id={`borrower_name_${entryIndex}`}
                                            required
                                            value={entry.borrower_name}
                                            onChange={(e) => {
                                                const updated = [...data.entries];
                                                updated[entryIndex].borrower_name = e.target.value;
                                                setData('entries', updated);
                                            }}
                                        />
                                        <InputError
                                            className="mt-2"
                                            message={errors[`entries.${entryIndex}.borrower_name` as keyof typeof errors]}
                                        />
                                    </div>

                                    {data.entries.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="mt-6 shrink-0"
                                            onClick={() =>
                                                removeEntry(entryIndex)
                                            }
                                        >
                                            <Trash2 className="size-4" />
                                        </Button>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label className="block text-sm font-medium">
                                        Items
                                    </Label>
                                    <MultiSelect
                                        options={items.map((item) => ({
                                            value: item.id,
                                            label: item.name,
                                            sublabel: item.barcode,
                                        }))}
                                        selected={entry.item_ids}
                                        onChange={(selected) => {
                                            const updated = [...data.entries];
                                            updated[entryIndex].item_ids = selected;
                                            setData('entries', updated);
                                        }}
                                        placeholder="Select items"
                                        emptyMessage="No items available."
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors[`entries.${entryIndex}.item_ids` as keyof typeof errors]}
                                    />
                                    <div className="flex gap-2 mt-2">
                                        <YudielScanner
                                            onScan={(barcode) => handleStudentScan(barcode, entryIndex)}
                                            triggerLabel={scanningStudent === entryIndex ? <><LoaderCircle className="mr-1 size-4 animate-spin" /> Mencari...</> : <><Scan className="mr-1 size-4" /> Scan Siswa</>}
                                            title="Scan Barcode Siswa"
                                            description="Arahkan kamera ke barcode kartu siswa."
                                            variant="outline"
                                            size="sm"
                                            disabled={scanningStudent === entryIndex}
                                        />
                                        <YudielScanner
                                            onScan={(barcode) => handleItemScan(barcode, entryIndex)}
                                            triggerLabel={scanningItem === entryIndex ? <><LoaderCircle className="mr-1 size-4 animate-spin" /> Mencari...</> : <><Scan className="mr-1 size-4" /> Scan Barang</>}
                                            title="Scan Barcode Barang"
                                            description="Arahkan kamera ke barcode barang."
                                            variant="outline"
                                            size="sm"
                                            disabled={scanningItem === entryIndex}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {scanError && (
                        <p className="text-sm text-red-600">{scanError}</p>
                    )}

                    {(errors as Record<string, string>).items_unavailable && (
                        <p className="text-sm text-red-600">{(errors as Record<string, string>).items_unavailable}</p>
                    )}

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            Add
                        </Button>
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-green-600">Added.</p>
                        </Transition>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
