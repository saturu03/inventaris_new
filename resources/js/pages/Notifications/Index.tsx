import { Head, Link, router } from '@inertiajs/react';
import { Bell, CheckCheck, Clock } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableRow,
    TableHeader,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { index as notificationsIndex } from '@/routes/notifications';
import type { BreadcrumbItem } from '@/types';

interface NotificationItem {
    id: string;
    type: string;
    data: {
        title: string;
        message: string;
        borrower_name?: string;
        estimated_return_date?: string;
        days_overdue?: number;
    };
    read_at: string | null;
    created_at: string;
}

interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: { url: string | null; label: string; active: boolean }[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Notifications',
        href: notificationsIndex(),
    },
];

export default function NotificationsIndex({ notifications }: { notifications: PaginatedData<NotificationItem> }) {
    const [markingAll, setMarkingAll] = useState(false);

    const handleMarkAllAsRead = () => {
        setMarkingAll(true);
        router.post('/notifications/mark-all-read', {}, {
            preserveState: true,
            onFinish: () => setMarkingAll(false),
        });
    };

    const handleMarkAsRead = (id: string) => {
        router.post(`/notifications/${id}/mark-as-read`, {}, { preserveState: true });
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notifications" />
            <div className="flex h-full flex-col gap-4 overflow-x-auto p-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Notifications</h3>
                    <Button variant="outline" size="sm" onClick={handleMarkAllAsRead} disabled={markingAll}>
                        <CheckCheck className="mr-2 h-4 w-4" />
                        Mark All as Read
                    </Button>
                </div>
                <Table>
                    <TableCaption>Total {notifications.total} notifications</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Status</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {notifications.data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                                    No notifications
                                </TableCell>
                            </TableRow>
                        ) : (
                            notifications.data.map((notification) => (
                                <TableRow key={notification.id} className={notification.read_at ? '' : 'bg-muted/50'}>
                                    <TableCell>
                                        {notification.read_at ? (
                                            <Bell className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            <Bell className="h-4 w-4 text-blue-500" />
                                        )}
                                    </TableCell>
                                    <TableCell className="max-w-md">
                                        <p className="font-medium">{notification.data.title}</p>
                                        <p className="text-sm text-muted-foreground">{notification.data.message}</p>
                                        {notification.data.days_overdue && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {notification.data.days_overdue} day(s) overdue
                                            </p>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            {formatDate(notification.created_at)}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {!notification.read_at && (
                                            <Button variant="ghost" size="sm" onClick={() => handleMarkAsRead(notification.id)}>
                                                Mark Read
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                {notifications.last_page > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-4">
                        {notifications.links.map((link, i) => (
                            link.url ? (
                                <Link
                                    key={i}
                                    href={link.url}
                                    className={`inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors
                                        ${link.active ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                                    preserveState
                                >
                                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                </Link>
                            ) : (
                                <span key={i} className="inline-flex h-9 items-center justify-center px-3 text-sm text-muted-foreground">
                                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                </span>
                            )
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
