import { Link, usePage } from '@inertiajs/react';
import { ArrowLeftRight, BookOpen, GraduationCap, Inbox, LayoutGrid, Mail, MapPin, Package, Phone, Shield, Tags, Trash2, Users } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { index as studentsIndex } from '@/routes/students';
import { index as itemsIndex } from '@/routes/items';
import { index as depositsIndex } from '@/routes/deposits';
import { index as loansIndex, returned as loansReturned } from '@/routes/loans';
import { index as locationsIndex } from '@/routes/locations';
import { index as categoriesIndex } from '@/routes/categories';
import { index as classlevelsIndex } from '@/routes/classlevels';
import { index as majorsIndex } from '@/routes/majors';
import { index as usersIndex } from '@/routes/users';
import { index as homeroomTeachersIndex } from '@/routes/homeroom-teachers';
import { overdueLetter as loansOverdueLetter } from '@/routes/loans';
import { useCurrentUrl } from '@/hooks/use-current-url';
import type { NavItem } from '@/types';

const menuItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
];

const masterDataItems: NavItem[] = [
    {
        title: 'Manage Category',
        href: categoriesIndex(),
        icon: Tags,
    },

    {
        title: 'Manage Major',
        href: majorsIndex(),
        icon: BookOpen,
    },
    {
        title: 'Manage Location',
        href: locationsIndex(),
        icon: MapPin,
    },
    {
        title: 'Manage Students',
        href: studentsIndex(),
        icon: Users,
    },
    {
        title: 'Manage Items',
        href: itemsIndex(),
        icon: Package,
    },
];

const transactionItems: NavItem[] = [
    {
        title: 'Manage Loans',
        href: loansIndex(),
        icon: ArrowLeftRight,
    },
    {
        title: 'Returned',
        href: loansReturned(),
        icon: Trash2,
    },
    {
        title: 'Surat Panggilan',
        href: loansOverdueLetter().url,
        icon: Mail,
        external: true,
    },
];

const depositItems: NavItem[] = [
    {
        title: 'Manage Deposits',
        href: depositsIndex(),
        icon: Inbox,
    },
];

function NavGroup({ label, items }: { label: string; items: NavItem[] }) {
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>{label}</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={item.external ? false : isCurrentUrl(item.href)}
                                tooltip={{ children: item.title }}
                            >
                                {item.external ? (
                                    <a href={item.href} target="_blank" rel="noopener noreferrer">
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </a>
                                ) : (
                                    <Link href={item.href} prefetch>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                )}
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}

export function AppSidebar() {
    const { auth } = usePage().props;
    const isProktor = auth.user?.role === 'proktor';

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavGroup label="Menu" items={menuItems} />
                <NavGroup label="Master Data" items={masterDataItems} />
                <NavGroup label="Transaction" items={transactionItems} />
                <NavGroup label="Deposit" items={depositItems} />
                {isProktor && (
                    <NavGroup label="Administration" items={[
                        {
                            title: 'Manage Users',
                            href: usersIndex(),
                            icon: Shield,
                        },
                        {
                            title: 'Wali Kelas',
                            href: homeroomTeachersIndex(),
                            icon: Phone,
                        },
                    ]} />
                )}
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
