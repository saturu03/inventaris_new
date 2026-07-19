import { Head, Link } from '@inertiajs/react';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { index, edit, barcode } from '@/routes/students';
import type { BreadcrumbItem, Student } from '@/types';

export default function StudentShow({ student }: { student: Student }) {
    const { t } = useLanguage();
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Manage Students',
            href: index(),
        },
        {
            title: student.name,
            href: '#',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={student.name} />
            <div className="flex h-full flex-col gap-4 overflow-x-auto p-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">{student.name}</h3>
                    <Link href={edit(student.id)}>
                        <Button variant="outline" size="sm">
                            {t('edit')}
                        </Button>
                    </Link>
                </div>
                <Separator />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">{t('name')}</p>
                            <p className="text-sm">{student.name}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">{t('nis')}</p>
                            <p className="text-sm">{student.nis}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">{t('gender')}</p>
                            <p className="text-sm">{student.gender === 'male' ? t('male') : t('female')}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">{t('phone')}</p>
                            <p className="text-sm">{student.phone}</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">{t('major')}</p>
                            <p className="text-sm">{student.major.alias}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">{t('class')}</p>
                            <p className="text-sm">{student.class.level}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">{t('address')}</p>
                            <p className="text-sm">{student.address ?? '-'}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Barcode</p>
                            <p className="text-sm">{student.barcode}</p>
                        </div>
                    </div>
                </div>

                {student.photo && (
                    <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">{t('photo')}</p>
                        <img
                            src={`/storage/${student.photo}`}
                            alt={student.name}
                            className="h-32 w-32 rounded-md object-cover"
                        />
                    </div>
                )}

                <Separator />
                <h3 className="text-base font-medium">Barcode</h3>
                <div className="flex flex-col items-center gap-2 border p-4 rounded-md">
                    <img
                        src={barcode.url({ student: student.id })}
                        alt="Barcode"
                        className="h-20"
                    />
                    <p className="text-xs text-muted-foreground">{student.barcode}</p>
                    <a
                        href={barcode.url({ student: student.id })}
                        download
                        className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium whitespace-nowrap text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                    >
                        {t('downloadBarcode')}
                    </a>
                </div>
            </div>
        </AppLayout>
    );
}
