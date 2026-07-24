import { Link, usePage } from '@inertiajs/react';
import { ArrowLeftRight, BookOpen, CheckSquare, GraduationCap, Inbox, LayoutGrid, Layers, Mail, MapPin, Package, Phone, Shield, Tags, Trash2, Users } from 'lucide-react';
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
import { useLanguage } from '@/contexts/language-context';
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
    const { t } = useLanguage();
    const isProktor = auth.user?.role === 'proktor';

    const menuItems: NavItem[] = [
        { title: t('dashboard'), href: dashboard(), icon: LayoutGrid },
    ];

    const staffMasterDataItems: NavItem[] = [
        { title: t('manageStudents'), href: studentsIndex(), icon: Users },
        { title: t('manageItems'), href: itemsIndex(), icon: Package },
    ];

    const proktorMasterDataItems: NavItem[] = [
        { title: t('manageCategory'), href: categoriesIndex(), icon: Tags },
        { title: t('manageMajor'), href: majorsIndex(), icon: BookOpen },
        { title: t('manageLocation'), href: locationsIndex(), icon: MapPin },
        { title: t('manageClassesTitle'), href: classlevelsIndex(), icon: Layers },
        ...staffMasterDataItems,
    ];

    const transactionItems: NavItem[] = [
        { title: t('manageLoans'), href: loansIndex(), icon: ArrowLeftRight },
        { title: t('returned'), href: loansReturned(), icon: Trash2 },
        { title: t('overdueLetter'), href: loansOverdueLetter().url, icon: Mail, external: true },
    ];

    const depositItems: NavItem[] = [
        { title: t('manageDeposits'), href: depositsIndex(), icon: Inbox },
    ];

    const adminItems: NavItem[] = [
        { title: t('manageUsers'), href: usersIndex(), icon: Shield },
        { title: t('homeroomTeachers'), href: homeroomTeachersIndex(), icon: Phone },
        { title: 'Persetujuan Peminjaman', href: '/loans/approvals', icon: CheckSquare },
    ];

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
                <NavGroup label={t('menu')} items={menuItems} />
                <NavGroup label={t('masterData')} items={isProktor ? proktorMasterDataItems : staffMasterDataItems} />
                <NavGroup label={t('transaction')} items={transactionItems} />
                <NavGroup label={t('deposit')} items={depositItems} />
                {isProktor && (
                    <NavGroup label={t('administration')} items={adminItems} />
                )}
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
