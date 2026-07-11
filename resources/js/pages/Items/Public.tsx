import { useState, useMemo, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { home, login } from '@/routes';
import itemsRoute from '@/routes/items';
import type { Item, LocationWithItems } from '@/types';

function statusIndicator(status: Item['status']) {
    if (status === 'available') {
        return (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-600/20 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-emerald-400/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                Tersedia
            </span>
        );
    }

    return (
        <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700 ring-1 ring-red-600/20 dark:bg-red-400/10 dark:text-red-400 dark:ring-red-400/20">
            <span className="h-1.5 w-1.5 rounded-full bg-red-600 dark:bg-red-400" />
            Dipinjam
        </span>
    );
}

function conditionLabel(condition: Item['condition']) {
    if (condition === 'functional') return 'Baik';
    if (condition === 'slightly_damaged') return 'Rusak Ringan';
    return 'Rusak';
}

function Lightbox({ item, onClose }: { item: Item | null; onClose: () => void }) {
    useEffect(() => {
        if (!item) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [item, onClose]);

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

export default function ItemsPublic({ locations }: { locations: LocationWithItems[] }) {
    const [selectedLocationId, setSelectedLocationId] = useState<number | null>(
        locations.length > 0 ? locations[0].id : null,
    );
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'inavailable'>('all');
    const [previewItem, setPreviewItem] = useState<Item | null>(null);

    const selectedLocation = locations.find((l) => l.id === selectedLocationId);

    const filteredItems = useMemo(() => {
        if (!selectedLocation) return [];
        let result = selectedLocation.items;
        if (statusFilter !== 'all') {
            result = result.filter((item) => item.status === statusFilter);
        }
        const q = search.toLowerCase().trim();
        if (q) {
            result = result.filter((item) => item.name.toLowerCase().includes(q));
        }
        return result;
    }, [selectedLocation, search, statusFilter]);

    const groupedByCategory = useMemo(() => {
        const groups = new Map<string, Item[]>();
        for (const item of filteredItems) {
            const key = item.category.name;
            if (!groups.has(key)) groups.set(key, []);
            groups.get(key)!.push(item);
        }
        return Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b));
    }, [filteredItems]);

    const allItems = locations.flatMap((l) => l.items);
    const availableCount = allItems.filter((i) => i.status === 'available').length;
    const borrowedCount = allItems.filter((i) => i.status === 'inavailable').length;

    return (
        <>
            <Head title="Cek Status Barang" />

            <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-950">
                <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
                        <Link href={home()} className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                            Inventra School
                        </Link>

                        <nav className="flex items-center gap-3">
                            <Link
                                href={itemsRoute.public().url}
                                className="text-sm font-medium text-indigo-600 underline underline-offset-4 dark:text-indigo-400"
                            >
                                Cek Barang
                            </Link>
                            <Link
                                href={login()}
                                className="inline-flex h-8 items-center justify-center rounded-md bg-gray-900 px-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                            >
                                Staff Login
                            </Link>
                        </nav>
                    </div>
                </header>

                <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                            Cek Status Barang
                        </h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Pilih lokasi untuk melihat barang yang tersedia.
                        </p>
                    </div>

                    <div className="mb-8">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'available' | 'inavailable')}
                            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
                        >
                            <option value="all">Semua ({allItems.length})</option>
                            <option value="available">Tersedia ({availableCount})</option>
                            <option value="inavailable">Dipinjam ({borrowedCount})</option>
                        </select>
                    </div>

                    {selectedLocation && (
                        <div className="mb-6">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Cari barang..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 pl-10 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
                                />
                                <svg
                                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="m21 21-4.3-4.3" />
                                </svg>
                            </div>
                        </div>
                    )}

                    <div className="mb-6 flex flex-wrap gap-2">
                        {locations.map((location) => (
                            <button
                                key={location.id}
                                onClick={() => {
                                    setSelectedLocationId(location.id);
                                    setSearch('');
                                    setStatusFilter('all');
                                }}
                                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                                    selectedLocationId === location.id
                                        ? 'bg-indigo-600 text-white shadow-sm'
                                        : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-400 dark:ring-gray-800 dark:hover:bg-gray-800'
                                }`}
                            >
                                {location.name}
                            </button>
                        ))}
                    </div>

                    {groupedByCategory.length > 0 ? (
                        groupedByCategory.map(([categoryName, categoryItems]) => (
                            <div key={categoryName} className="mb-8">
                                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                    {categoryName}
                                </h2>
                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                                    {categoryItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="group relative flex flex-col items-center rounded-xl bg-white p-2 pb-12 shadow-sm ring-1 ring-gray-200 transition-all duration-150 hover:shadow-md dark:bg-gray-900 dark:ring-gray-800"
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
                                                aria-label={`Lihat foto ${item.name}`}
                                            >
                                                {item.photo ? (
                                                    <img
                                                        src={'/storage/' + item.photo}
                                                        alt={item.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <svg
                                                        className="h-10 w-10 text-gray-400"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
                                                        <path d="M12 22V12" />
                                                        <polyline points="3.29 7 12 12 20.71 7" />
                                                        <path d="M7.5 4.27l9 5.15" />
                                                    </svg>
                                                )}
                                            </div>

                                            <span className="absolute bottom-7 left-2.5 text-sm font-normal text-gray-900 dark:text-white">
                                                {item.name}
                                            </span>

                                            <span className="absolute bottom-1 left-2.5 text-xs text-gray-500 dark:text-gray-400">
                                                {conditionLabel(item.condition)}
                                            </span>

                                            <div className="absolute right-2 top-2">
                                                {statusIndicator(item.status)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <svg
                                className="mb-3 h-10 w-10 text-gray-400 dark:text-gray-600"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
                                <path d="M12 22V12" />
                                <polyline points="3.29 7 12 12 20.71 7" />
                                <path d="M7.5 4.27l9 5.15" />
                            </svg>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Tidak ada barang
                            </p>
                        </div>
                    )}
                </main>

                <footer className="border-t border-gray-200 dark:border-gray-800">
                    <div className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-gray-400 dark:text-gray-600 sm:px-6">
                        Inventra School Inventory System
                    </div>
                </footer>
            </div>

            <Lightbox item={previewItem} onClose={() => setPreviewItem(null)} />
        </>
    );
}
