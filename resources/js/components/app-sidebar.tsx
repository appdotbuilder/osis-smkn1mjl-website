import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Megaphone, Calendar, Target, Users, MessageCircle, Download } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Pengumuman',
        href: '/announcements',
        icon: Megaphone,
    },
    {
        title: 'Kegiatan',
        href: '/activities',
        icon: Calendar,
    },
    {
        title: 'Program Kerja',
        href: '/work-programs',
        icon: Target,
    },
    {
        title: 'Profil OSIS',
        href: '/profile',
        icon: Users,
    },
    {
        title: 'Feedback',
        href: '/feedback',
        icon: MessageCircle,
    },
    {
        title: 'Download',
        href: '/downloads',
        icon: Download,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Beranda',
        href: '/',
        icon: Folder,
    },
    {
        title: 'FAQ',
        href: '/faq',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
