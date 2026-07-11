import { Head, Link } from '@inertiajs/react';
import { ArrowLeftRight, Clock, Inbox, Package, Users } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { index as itemsIndex } from '@/routes/items';
import { index as loansIndex } from '@/routes/loans';
import { index as depositsIndex } from '@/routes/deposits';
import { index as studentsIndex } from '@/routes/students';
import type { BreadcrumbItem } from '@/types';

type StatCard = {
    title: string;
    value: number;
    icon: typeof Package;
    href: string;
    color: string;
};

type DashboardStats = {
    items: { total: number; available: number; borrowed: number };
    students: number;
    loans: { active: number; returned: number; overdue: number };
    deposits: { active: number; picked_up: number };
};

type RecentLoan = {
    id: number;
    item_name: string;
    borrower_name: string;
    student_name: string | null;
    borrower_date: string;
    estimated_return_date: string | null;
    returned: string | null;
    is_overdue: boolean;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
    },
];

function StatCard({ title, value, icon: Icon, href, color }: StatCard) {
    return (
        <Link
            href={href}
            className="group relative overflow-hidden rounded-xl border border-sidebar-border/70 bg-white p-5 transition-all hover:shadow-md dark:bg-sidebar-accent/10 dark:hover:bg-sidebar-accent/20"
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {title}
                    </p>
                    <p className="mt-1 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {value}
                    </p>
                </div>
                <div className={`rounded-lg p-2.5 ${color}`}>
                    <Icon className="h-5 w-5" />
                </div>
            </div>
        </Link>
    );
}

export default function Dashboard({
    stats,
    recentLoans,
}: {
    stats: DashboardStats;
    recentLoans: RecentLoan[];
}) {
    const cards: StatCard[] = [
    {
        title: 'Total Barang',
        value: stats.items.total,
        icon: Package,
        href: itemsIndex().url,
        color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    },
    {
        title: 'Tersedia',
        value: stats.items.available,
        icon: Package,
        href: itemsIndex().url,
        color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    },
    {
        title: 'Dipinjam',
        value: stats.items.borrowed,
        icon: Package,
        href: loansIndex().url,
        color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
    },
    {
        title: 'Peminjaman Aktif',
        value: stats.loans.active,
        icon: ArrowLeftRight,
        href: loansIndex().url,
        color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
    },
    {
        title: 'Overdue',
        value: stats.loans.overdue,
        icon: Clock,
        href: loansIndex().url,
        color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
    },
    {
        title: 'Titipan Aktif',
        value: stats.deposits.active,
        icon: Inbox,
        href: depositsIndex().url,
        color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    },
    {
        title: 'Total Siswa',
        value: stats.students,
        icon: Users,
        href: studentsIndex().url,
        color: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400',
    },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-4">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Overview
                    </h2>
                    <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                        Ringkasan data inventaris sekolah
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {cards.map((card) => (
                        <StatCard key={card.title} {...card} />
                    ))}
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-xl border border-sidebar-border/70 bg-white p-5 dark:bg-sidebar-accent/10">
                        <h3 className="mb-4 text-base font-semibold text-gray-900 dark:text-white">
                            Peminjaman Terbaru
                        </h3>
                        {recentLoans.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <th className="pb-2 text-left font-medium text-gray-500 dark:text-gray-400">
                                                Barang
                                            </th>
                                            <th className="pb-2 text-left font-medium text-gray-500 dark:text-gray-400">
                                                Peminjam
                                            </th>
                                            <th className="pb-2 text-left font-medium text-gray-500 dark:text-gray-400">
                                                Tanggal
                                            </th>
                                            <th className="pb-2 text-right font-medium text-gray-500 dark:text-gray-400">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentLoans.map((loan) => (
                                            <tr
                                                key={loan.id}
                                                className="border-b border-gray-100 dark:border-gray-800"
                                            >
                                                <td className="py-2.5 pr-4 text-gray-900 dark:text-white">
                                                    {loan.item_name}
                                                </td>
                                                <td className="py-2.5 pr-4 text-gray-600 dark:text-gray-400">
                                                    {loan.student_name ?? loan.borrower_name}
                                                </td>
                                                <td className="py-2.5 pr-4 text-gray-600 dark:text-gray-400">
                                                    {loan.borrower_date}
                                                </td>
                                                <td className="py-2.5 text-right">
                                                    {loan.returned ? (
                                                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-600/20 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-emerald-400/20">
                                                            Kembali
                                                        </span>
                                                    ) : loan.is_overdue ? (
                                                        <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700 ring-1 ring-red-600/20 dark:bg-red-400/10 dark:text-red-400 dark:ring-red-400/20">
                                                            Overdue
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700 ring-1 ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-400 dark:ring-amber-400/20">
                                                            Dipinjam
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="py-6 text-center text-sm text-gray-400 dark:text-gray-600">
                                Belum ada peminjaman
                            </p>
                        )}
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 bg-white p-5 dark:bg-sidebar-accent/10">
                        <h3 className="mb-4 text-base font-semibold text-gray-900 dark:text-white">
                            Ringkasan Cepat
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    Barang tersedia
                                </span>
                                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                                    {stats.items.available} / {stats.items.total}
                                </span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    Peminjaman aktif
                                </span>
                                <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                                    {stats.loans.active}
                                </span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    Peminjaman overdue
                                </span>
                                <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                                    {stats.loans.overdue}
                                </span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    Titipan aktif
                                </span>
                                <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                                    {stats.deposits.active}
                                </span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    Total siswa
                                </span>
                                <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                                    {stats.students}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
