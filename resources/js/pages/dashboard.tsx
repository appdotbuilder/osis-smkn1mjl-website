import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface DashboardStats {
    totalAnnouncements: number;
    totalActivities: number;
    totalPrograms: number;
    totalMembers: number;
}

interface RecentActivity {
    id: number;
    type: string;
    title: string;
    date: string;
}

interface Props {
    stats?: DashboardStats;
    recentActivities?: RecentActivity[];
    [key: string]: unknown;
}

export default function Dashboard({ stats, recentActivities }: Props) {
    // Mock data for demonstration if not provided
    const mockStats = {
        totalAnnouncements: 15,
        totalActivities: 28,
        totalPrograms: 12,
        totalMembers: 45,
    };

    const mockRecentActivities = [
        { id: 1, type: 'announcement', title: 'Pengumuman Pemilihan Ketua OSIS', date: '2024-01-15' },
        { id: 2, type: 'activity', title: 'Kegiatan Bakti Sosial', date: '2024-01-14' },
        { id: 3, type: 'program', title: 'Program Literasi Digital', date: '2024-01-13' },
    ];

    const displayStats = stats || mockStats;
    const displayActivities = recentActivities || mockRecentActivities;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard OSIS" />
            
            <div className="space-y-6">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-6">
                    <h1 className="text-2xl font-bold mb-2">🎓 Selamat Datang di Dashboard OSIS</h1>
                    <p className="text-blue-100">
                        SMK Negeri 1 Majalengka - Kelola konten dan aktivitas OSIS dengan mudah
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-4 gap-6">
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Pengumuman</CardTitle>
                            <span className="text-2xl">📢</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">{displayStats.totalAnnouncements}</div>
                            <p className="text-xs text-muted-foreground">Pengumuman aktif</p>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Kegiatan</CardTitle>
                            <span className="text-2xl">🎯</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{displayStats.totalActivities}</div>
                            <p className="text-xs text-muted-foreground">Kegiatan terdokumentasi</p>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Program Kerja</CardTitle>
                            <span className="text-2xl">⚡</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-600">{displayStats.totalPrograms}</div>
                            <p className="text-xs text-muted-foreground">Program aktif</p>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Anggota OSIS</CardTitle>
                            <span className="text-2xl">👥</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-600">{displayStats.totalMembers}</div>
                            <p className="text-xs text-muted-foreground">Anggota aktif</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                🚀 Aksi Cepat
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Link href="/announcements" className="block">
                                <Button variant="outline" className="w-full justify-start">
                                    📢 Kelola Pengumuman
                                </Button>
                            </Link>
                            <Link href="/activities" className="block">
                                <Button variant="outline" className="w-full justify-start">
                                    🎯 Kelola Kegiatan
                                </Button>
                            </Link>
                            <Link href="/work-programs" className="block">
                                <Button variant="outline" className="w-full justify-start">
                                    ⚡ Kelola Program Kerja
                                </Button>
                            </Link>
                            <Link href="/feedback" className="block">
                                <Button variant="outline" className="w-full justify-start">
                                    💬 Lihat Feedback
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                📊 Aktivitas Terbaru
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {displayActivities.map((activity) => (
                                <div key={activity.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                                    <div className="flex-shrink-0">
                                        {activity.type === 'announcement' && <span className="text-lg">📢</span>}
                                        {activity.type === 'activity' && <span className="text-lg">🎯</span>}
                                        {activity.type === 'program' && <span className="text-lg">⚡</span>}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {activity.title}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(activity.date).toLocaleDateString('id-ID')}
                                        </p>
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                        {activity.type === 'announcement' && 'Pengumuman'}
                                        {activity.type === 'activity' && 'Kegiatan'}
                                        {activity.type === 'program' && 'Program'}
                                    </Badge>
                                </div>
                            ))}
                            <div className="pt-2">
                                <Button variant="ghost" size="sm" className="w-full">
                                    Lihat Semua →
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Information Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    <Card className="bg-blue-50 border-blue-200">
                        <CardHeader>
                            <CardTitle className="text-blue-900 flex items-center">
                                📚 Panduan Penggunaan
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-blue-800 text-sm mb-3">
                                Pelajari cara menggunakan dashboard OSIS untuk mengelola konten dengan efektif.
                            </p>
                            <Button variant="outline" size="sm" className="border-blue-300 text-blue-700">
                                Baca Panduan
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-green-50 border-green-200">
                        <CardHeader>
                            <CardTitle className="text-green-900 flex items-center">
                                💡 Tips & Trik
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-green-800 text-sm mb-3">
                                Dapatkan tips untuk membuat konten yang menarik dan engaging untuk siswa.
                            </p>
                            <Button variant="outline" size="sm" className="border-green-300 text-green-700">
                                Lihat Tips
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-purple-50 border-purple-200">
                        <CardHeader>
                            <CardTitle className="text-purple-900 flex items-center">
                                🎯 Target Bulanan
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-purple-800 text-sm mb-3">
                                Pantau pencapaian target konten dan aktivitas OSIS bulan ini.
                            </p>
                            <Button variant="outline" size="sm" className="border-purple-300 text-purple-700">
                                Lihat Progress
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Footer Info */}
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                    <p className="text-gray-600 text-sm">
                        Dashboard OSIS SMK Negeri 1 Majalengka - Versi 1.0
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                        Terakhir diupdate: {new Date().toLocaleDateString('id-ID')}
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}