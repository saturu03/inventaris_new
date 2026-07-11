import { Check, ChevronDown, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

export type Option = {
    value: number;
    label: string;
    sublabel?: string;
};

export function MultiSelect({
    options,
    selected,
    onChange,
    placeholder = 'Select items',
    emptyMessage = 'No items found.',
}: {
    options: Option[];
    selected: number[];
    onChange: (selected: number[]) => void;
    placeholder?: string;
    emptyMessage?: string;
}) {
    const [open, setOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    const selectedLabels = options
        .filter((o) => selected.includes(o.value))
        .map((o) => o.label);

    const toggleItem = (value: number) => {
        onChange(
            selected.includes(value)
                ? selected.filter((v) => v !== value)
                : [...selected, value],
        );
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                popoverRef.current &&
                !popoverRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, [open]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="h-auto min-h-10 w-full justify-between"
                >
                    <div className="flex flex-wrap gap-1">
                        {selected.length > 0 ? (
                            selectedLabels.map((label) => (
                                <Badge
                                    key={label}
                                    variant="secondary"
                                    className="shrink-0"
                                >
                                    {label}
                                    <span
                                        role="button"
                                        tabIndex={0}
                                        className="ml-1 cursor-pointer rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                        onMouseDown={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            const value = options.find(
                                                (o) => o.label === label,
                                            )?.value;
                                            if (value) {
                                                toggleItem(value);
                                            }
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                const value = options.find(
                                                    (o) => o.label === label,
                                                )?.value;
                                                if (value) {
                                                    toggleItem(value);
                                                }
                                            }
                                        }}
                                    >
                                        <X className="size-3" />
                                    </span>
                                </Badge>
                            ))
                        ) : (
                            <span className="text-muted-foreground">
                                {placeholder}
                            </span>
                        )}
                    </div>
                    <ChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                ref={popoverRef}
                className="w-[var(--radix-popover-trigger-width)] p-0"
                align="start"
            >
                <div className="max-h-64 overflow-y-auto">
                    {options.length === 0 ? (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                            {emptyMessage}
                        </div>
                    ) : (
                        options.map((option) => {
                            const isSelected = selected.includes(option.value);

                            return (
                                <div
                                    key={option.value}
                                    className="flex cursor-pointer items-center gap-3 px-3 py-2 text-sm hover:bg-accent"
                                    onClick={() => toggleItem(option.value)}
                                >
                                    <Checkbox checked={isSelected} />
                                    <div className="flex flex-col">
                                        <span>{option.label}</span>
                                        {option.sublabel && (
                                            <span className="text-xs text-muted-foreground">
                                                {option.sublabel}
                                            </span>
                                        )}
                                    </div>
                                    {isSelected && (
                                        <Check className="ml-auto size-4" />
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
                {selected.length > 0 && (
                    <>
                        <Separator />
                        <div className="p-2">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="w-full text-xs"
                                onClick={() => onChange([])}
                            >
                                Clear all
                            </Button>
                        </div>
                    </>
                )}
            </PopoverContent>
        </Popover>
    );
}
