import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
import { index, create, store } from '@/routes/items';
import type { BreadcrumbItem, Category, Location, ItemForm } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Items',
        href: index(),
    },
    {
        title: 'Add Item',
        href: create(),
    },
];

export default function ItemCreate({
    categories,
    locations,
}: {
    categories: Category[];
    locations: Location[];
}) {
    const {
        data,
        setData,
        post,
        errors,
        reset,
        processing,
        recentlySuccessful,
    } = useForm<ItemForm>({
        category_id: 0,
        location_id: 0,
        name: '',
        status: 'available',
        spec: '',
        condition: 'functional',
        photo: null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store.url(), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add a new Item" />
            <div className="flex h-full flex-col gap-4 overflow-x-auto p-4">
                <h3 className="text-lg font-medium">Add a new Item</h3>
                <Separator />
                <form
                    onSubmit={handleSubmit}
                    method="post"
                    className="space-y-6"
                >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label className="block text-sm font-medium">
                                Category
                            </Label>
                            <Select
                                value={
                                    data.category_id
                                        ? data.category_id.toString()
                                        : ''
                                }
                                onValueChange={(value) =>
                                    setData('category_id', Number(value))
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Categories</SelectLabel>
                                        {categories.map((category) => (
                                            <SelectItem
                                                value={category.id.toString()}
                                                key={category.id}
                                            >
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError
                                className="mt-2"
                                message={errors.category_id}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="block text-sm font-medium">
                                Location
                            </Label>
                            <Select
                                value={
                                    data.location_id
                                        ? data.location_id.toString()
                                        : ''
                                }
                                onValueChange={(value) =>
                                    setData('location_id', Number(value))
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select location" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Locations</SelectLabel>
                                        {locations.map((location) => (
                                            <SelectItem
                                                value={location.id.toString()}
                                                key={location.id}
                                            >
                                                {location.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError
                                className="mt-2"
                                message={errors.location_id}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="name"
                            className="block text-sm font-medium"
                        >
                            Name
                        </Label>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            required
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label className="block text-sm font-medium">
                                Status
                            </Label>
                            <RadioGroup
                                value={data.status}
                                onValueChange={(value) =>
                                    setData('status', value)
                                }
                                className="flex items-center gap-6 pt-1"
                            >
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem
                                        value="available"
                                        id="status-available"
                                    />
                                    <Label htmlFor="status-available">
                                        Available
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem
                                        value="inavailable"
                                        id="status-inavailable"
                                    />
                                    <Label htmlFor="status-inavailable">
                                        Unavailable
                                    </Label>
                                </div>
                            </RadioGroup>
                            <InputError
                                className="mt-2"
                                message={errors.status}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="block text-sm font-medium">
                                Condition
                            </Label>
                            <Select
                                value={data.condition}
                                onValueChange={(value) =>
                                    setData('condition', value)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select condition" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="functional">
                                            Functional
                                        </SelectItem>
                                        <SelectItem value="slightly_damaged">
                                            Slightly Damaged
                                        </SelectItem>
                                        <SelectItem value="broken">
                                            Broken
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError
                                className="mt-2"
                                message={errors.condition}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="spec"
                            className="block text-sm font-medium"
                        >
                            Specification
                        </Label>
                        <Textarea
                            name="spec"
                            id="spec"
                            rows={4}
                            value={data.spec}
                            onChange={(e) => setData('spec', e.target.value)}
                        />
                        <InputError className="mt-2" message={errors.spec} />
                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="photo"
                            className="block text-sm font-medium"
                        >
                            Photo
                        </Label>
                        <Input
                            type="file"
                            name="photo"
                            id="photo"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setData('photo', file as unknown as string);
                                }
                            }}
                        />
                        <InputError className="mt-2" message={errors.photo} />
                    </div>

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
