import { Head, Link, router } from '@inertiajs/react';
import { SquarePen, Trash2, Plus, QrCode, Search } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/language-context';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import AppLayout from '@/layouts/app-layout';
import { index, create, edit, destroy } from '@/routes/items';
import barcode from '@/routes/items/barcode';
import type { BreadcrumbItem, Item } from '@/types';

function statusIndicator(status: Item['status'], t: (key: string) => string) {
    if (status === 'available') {
        return (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-600/20 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-emerald-400/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                {t('available')}
            </span>
        );
    }

    return (
        <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700 ring-1 ring-red-600/20 dark:bg-red-400/10 dark:text-red-400 dark:ring-red-400/20">
            <span className="h-1.5 w-1.5 rounded-full bg-red-600 dark:bg-red-400" />
            {t('borrowed')}
        </span>
    );
}

function conditionLabel(condition: Item['condition'], t: (key: string) => string) {
    if (condition === 'functional') return t('functional');
    if (condition === 'slightly_damaged') return t('slightlyDamaged');
    return t('broken');
}

function Lightbox({ item, onClose }: { item: Item | null; onClose: () => void }) {
    if (!item) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl bg-white p-2 shadow-2xl dark:bg-gray-900"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                    </svg>
                </button>
                <img
                    src={'/storage/' + item.photo}
                    alt={item.name}
                    className="max-h-[80vh] w-auto max-w-full rounded-lg object-contain"
                />
                <p className="mt-2 text-center text-sm font-medium text-gray-900 dark:text-white">
                    {item.name}
                </p>
            </div>
        </div>
    );
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Manage Items', href: index() },
];

export default function ItemsIndex({ items }: { items: Item[] }) {
    const { t } = useLanguage();
    const [deleteItemId, setDeleteItemId] = useState(0);
    const [deleteItemName, setDeleteItemName] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [previewItem, setPreviewItem] = useState<Item | null>(null);
    const [search, setSearch] = useState('');

    const allLocations = useMemo(() => {
        const map = new Map<string, Item[]>();
        for (const item of items) {
            const loc = item.location.name;
            if (!map.has(loc)) map.set(loc, []);
            map.get(loc)!.push(item);
        }
        return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
    }, [items]);

    const [selectedLocation, setSelectedLocation] = useState(allLocations[0]?.[0] ?? '');

    const filteredItems = useMemo(() => {
        const locItems = allLocations.find(([name]) => name === selectedLocation)?.[1] ?? [];
        let result = locItems;
        const q = search.toLowerCase().trim();
        if (q) {
            result = result.filter((item) => item.name.toLowerCase().includes(q));
        }
        return result;
    }, [allLocations, selectedLocation, search]);

    const groupedByCategory = useMemo(() => {
        const groups = new Map<string, Item[]>();
        for (const item of filteredItems) {
            const key = item.category.name;
            if (!groups.has(key)) groups.set(key, []);
            groups.get(key)!.push(item);
        }
        return Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b));
    }, [filteredItems]);

    const handleDelete = () => {
        router.delete(destroy(deleteItemId));
        setDeleteItemId(0);
        setDeleteItemName('');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Items" />
            <div className="flex h-full flex-col gap-4 overflow-x-auto p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-lg font-medium">Manage Items</h3>
                    <div className="flex gap-2">
                        <Link
                            href={create()}
                            className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                        >
                            <Plus size={16} />
                            Add Item
                        </Link>
                        <a
                            href={barcode.all.url()}
                            className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                        >
                            <QrCode size={16} />
                            QR Codes
                        </a>
                    </div>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder={t('searchItems')}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
                    />
                </div>

                <div className="flex flex-wrap gap-2">
                    {allLocations.map(([name, locItems]) => (
                        <button
                            key={name}
                            onClick={() => {
                                setSelectedLocation(name);
                                setSearch('');
                            }}
                            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                                selectedLocation === name
                                    ? 'bg-indigo-600 text-white shadow-sm'
                                    : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-400 dark:ring-gray-800 dark:hover:bg-gray-800'
                            }`}
                        >
                            {name} ({locItems.length})
                        </button>
                    ))}
                </div>

                {groupedByCategory.length > 0 ? (
                    groupedByCategory.map(([categoryName, categoryItems]) => (
                        <div key={categoryName} className="mb-4">
                            <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                                {categoryName}
                            </h2>
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                                {categoryItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="group relative flex flex-col items-center rounded-xl bg-white p-2 shadow-sm ring-1 ring-gray-200 transition-all duration-150 hover:shadow-md dark:bg-gray-900 dark:ring-gray-800"
                                    >
                                        <div
                                            className="flex h-40 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gray-100 transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98] dark:bg-gray-800"
                                            onClick={() => {
                                                if (item.photo) setPreviewItem(item);
                                            }}
                                            role="button"
                                            tabIndex={0}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && item.photo) setPreviewItem(item);
                                            }}
                                        >
                                            {item.photo ? (
                                                <img
                                                    src={'/storage/' + item.photo}
                                                    alt={item.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <svg className="h-10 w-10 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
                                                    <path d="M12 22V12" />
                                                    <polyline points="3.29 7 12 12 20.71 7" />
                                                    <path d="M7.5 4.27l9 5.15" />
                                                </svg>
                                            )}
                                        </div>

                                        <span className="mt-2 w-full truncate px-1 text-sm font-normal text-gray-900 dark:text-white">
                                            {item.name}
                                        </span>
                                        <span className="w-full truncate px-1 text-xs text-gray-500 dark:text-gray-400">
                                            {conditionLabel(item.condition, t)}
                                        </span>

                                        <div className="absolute right-2 top-2">
                                            {statusIndicator(item.status, t)}
                                        </div>

                                        <div className="absolute bottom-2 right-2 flex gap-1">
                                            <Link
                                                href={edit(item.id)}
                                                className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-100 text-gray-600 transition-colors hover:bg-indigo-100 hover:text-indigo-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-indigo-900 dark:hover:text-indigo-400"
                                            >
                                                <SquarePen size={14} />
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    setDeleteItemId(item.id);
                                                    setDeleteItemName(item.name);
                                                    setShowAlert(true);
                                                }}
                                                className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-100 text-gray-600 transition-colors hover:bg-red-100 hover:text-red-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-red-900 dark:hover:text-red-400"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {t('noItems')}
                        </p>
                    </div>
                )}
            </div>

            <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {t('areYouSureDelete', { name: deleteItemName })}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {t('thisActionCannotUndone')}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                        <AlertDialogAction variant="destructive" onClick={handleDelete}>
                            {t('delete')}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <Lightbox item={previewItem} onClose={() => setPreviewItem(null)} />
        </AppLayout>
    );
}
