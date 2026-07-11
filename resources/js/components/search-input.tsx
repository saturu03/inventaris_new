import { router } from '@inertiajs/react';
import { Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function SearchInput({ route, currentSearch = '', placeholder = 'Cari...' }: { route: string; currentSearch?: string; placeholder?: string }) {
    const [value, setValue] = useState(currentSearch);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

    useEffect(() => {
        setValue(currentSearch);
    }, [currentSearch]);

    const handleSearch = (term: string) => {
        setValue(term);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            router.get(route, term ? { search: term } : {}, {
                preserveState: true,
                replace: true,
            });
        }, 300);
    };

    const clearSearch = () => {
        handleSearch('');
    };

    return (
        <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
                type="text"
                value={value}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder={placeholder}
                className="flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 pl-9 pr-8 text-base shadow-sm transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            />
            {value && (
                <button
                    onClick={clearSearch}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-0.5 text-gray-400 hover:text-gray-600"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    );
}
