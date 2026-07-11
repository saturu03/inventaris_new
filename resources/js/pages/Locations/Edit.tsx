import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { index, edit, update } from '@/routes/locations';
import type { BreadcrumbItem, Location, LocationForm } from '@/types';

export default function LocationEdit({ location }: { location: Location }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Manage Locations',
            href: index(),
        },
        {
            title: 'Edit Location',
            href: edit(location.id),
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
    } = useForm<LocationForm>({
        name: location.name,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(update.url(location.id), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Location" />
            <div className="flex h-full flex-col gap-4 overflow-x-auto p-4">
                <h3 className="text-lg font-medium">Edit Location</h3>
                <Separator />
                <form
                    onSubmit={handleSubmit}
                    method="post"
                    className="space-y-6"
                >
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

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            Edit
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
