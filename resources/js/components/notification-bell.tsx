import { router } from '@inertiajs/react';
import { Bell } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { index as notificationsIndex } from '@/routes/notifications';

interface NotificationItem {
    id: string;
    data: {
        title: string;
        message: string;
        borrower_name?: string;
    };
    read_at: string | null;
    created_at: string;
}

export function NotificationBell({ unreadCount, recent }: { unreadCount: number; recent: NotificationItem[] }) {
    const { t } = useLanguage();
    const [open, setOpen] = useState(false);

    const handleMarkAsRead = (id: string) => {
        router.post(`/notifications/${id}/mark-as-read`, {}, {
            preserveState: true,
            onSuccess: () => setOpen(false),
        });
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger className="relative inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-muted transition-colors outline-none">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                    <span>{t('notificationsTitle')}</span>
                    {unreadCount > 0 && (
                        <span className="text-xs text-muted-foreground">{t('unread', { n: unreadCount })}</span>
                    )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {recent.length === 0 ? (
                    <div className="px-2 py-6 text-center text-sm text-muted-foreground">
                        {t('noNotifications')}
                    </div>
                ) : (
                    recent.map((notification) => (
                        <DropdownMenuItem
                            key={notification.id}
                            className={`flex flex-col items-start gap-1 px-4 py-3 cursor-pointer ${notification.read_at ? '' : 'bg-muted/50'}`}
                            onClick={() => { if (!notification.read_at) handleMarkAsRead(notification.id); }}
                        >
                            <div className="flex items-center gap-2 w-full">
                                <span className="text-sm font-medium">{notification.data.title}</span>
                                {!notification.read_at && (
                                    <span className="ml-auto h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                                )}
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2">{notification.data.message}</p>
                            <span className="text-xs text-muted-foreground">{formatDate(notification.created_at)}</span>
                        </DropdownMenuItem>
                    ))
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="justify-center text-sm font-medium cursor-pointer">
                    <a href={notificationsIndex().url}>{t('viewAllNotifications')}</a>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
