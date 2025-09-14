import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface DashboardStats {
    activities: number;
    announcements: number;
    workPrograms: number;
    organizationMembers: number;
    testimonials: number;
    downloads: number;
    memberRegistrations: number;
    feedback: number;
}

interface Activity {
    id: number;
    title: string;
    category: string;
    activity_date: string;
}

interface Announcement {
    id: number;
    title: string;
    type: string;
    is_active: boolean;
    created_at: string;
}

interface Registration {
    id: number;
    full_name: string;
    class: string;
    preferred_division?: string;
    created_at: string;
}

interface FeedbackItem {
    id: number;
    name: string;
    category: string;
    subject: string;
    status: string;
    created_at: string;
}

interface Props {
    stats: DashboardStats;
    recentActivities: Activity[];
    recentAnnouncements: Announcement[];
    recentRegistrations: Registration[];
    recentFeedback: FeedbackItem[];
    [key: string]: unknown;
}

export default function AdminDashboard({ 
    stats, 
    recentActivities, 
    recentAnnouncements, 
    recentRegistrations, 
    recentFeedback 
}: Props) {
    const statsCards = [
        { title: '📅 Kegiatan', count: stats.activities, link: 'admin.activities.index', color: 'bg-blue-50 border-blue-200' },
        { title: '📢 Pengumuman', count: stats.announcements, link: 'admin.announcements.index', color: 'bg-green-50 border-green-200' },
        { title: '📋 Program Kerja', count: stats.workPrograms, link: 'admin.work-programs.index', color: 'bg-purple-50 border-purple-200' },
        { title: '👥 Anggota Organisasi', count: stats.organizationMembers, link: 'admin.organization-members.index', color: 'bg-orange-50 border-orange-200' },
        { title: '⭐ Testimoni', count: stats.testimonials, link: 'admin.testimonials.index', color: 'bg-yellow-50 border-yellow-200' },
        { title: '📁 Download', count: stats.downloads, link: 'admin.downloads.index', color: 'bg-indigo-50 border-indigo-200' },
        { title: '✋ Pendaftaran Anggota', count: stats.memberRegistrations, link: 'admin.member-registrations.index', color: 'bg-pink-50 border-pink-200' },
        { title: '💬 Feedback', count: stats.feedback, link: 'admin.feedback.index', color: 'bg-teal-50 border-teal-200' },
    ];

    return (
        <AppLayout>
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">🏛️ Admin Panel OSIS</h1>
                    <p className="text-gray-600 mt-2">Kelola semua konten dan data organisasi</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statsCards.map((stat, index) => (
                        <Card key={index} className={`p-6 hover:shadow-lg transition-shadow ${stat.color}`}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-lg font-semibold text-gray-800">{stat.title}</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.count}</p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <Link href={route(stat.link)} className="text-blue-600 hover:text-blue-800 font-medium">
                                    Kelola →
                                </Link>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Recent Data Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                    {/* Recent Activities */}
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">📅 Kegiatan Terbaru</h3>
                            <Link href={route('admin.activities.index')} className="text-blue-600 hover:text-blue-800">
                                Lihat Semua
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {recentActivities.length > 0 ? (
                                recentActivities.map((activity) => (
                                    <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900">{activity.title}</p>
                                            <p className="text-sm text-gray-600">{activity.category} • {new Date(activity.activity_date).toLocaleDateString('id-ID')}</p>
                                        </div>
                                        <Link 
                                            href={route('admin.activities.show', activity.id)} 
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            Lihat
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4">Belum ada kegiatan</p>
                            )}
                        </div>
                    </Card>

                    {/* Recent Announcements */}
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">📢 Pengumuman Terbaru</h3>
                            <Link href={route('admin.announcements.index')} className="text-blue-600 hover:text-blue-800">
                                Lihat Semua
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {recentAnnouncements.length > 0 ? (
                                recentAnnouncements.map((announcement) => (
                                    <div key={announcement.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900">{announcement.title}</p>
                                            <p className="text-sm text-gray-600">
                                                {announcement.type} • {announcement.is_active ? '✅ Aktif' : '❌ Tidak Aktif'}
                                            </p>
                                        </div>
                                        <Link 
                                            href={route('admin.announcements.show', announcement.id)} 
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            Lihat
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4">Belum ada pengumuman</p>
                            )}
                        </div>
                    </Card>

                    {/* Recent Member Registrations */}
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">✋ Pendaftaran Terbaru</h3>
                            <Link href={route('admin.member-registrations.index')} className="text-blue-600 hover:text-blue-800">
                                Lihat Semua
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {recentRegistrations.length > 0 ? (
                                recentRegistrations.map((registration) => (
                                    <div key={registration.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900">{registration.full_name}</p>
                                            <p className="text-sm text-gray-600">
                                                {registration.class} • {registration.preferred_division || 'Belum ditentukan'}
                                            </p>
                                        </div>
                                        <Link 
                                            href={route('admin.member-registrations.show', registration.id)} 
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            Lihat
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4">Belum ada pendaftaran</p>
                            )}
                        </div>
                    </Card>

                    {/* Recent Feedback */}
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">💬 Feedback Terbaru</h3>
                            <Link href={route('admin.feedback.index')} className="text-blue-600 hover:text-blue-800">
                                Lihat Semua
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {recentFeedback.length > 0 ? (
                                recentFeedback.map((feedback) => (
                                    <div key={feedback.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900">{feedback.subject}</p>
                                            <p className="text-sm text-gray-600">
                                                {feedback.name} • {feedback.category} • {feedback.status}
                                            </p>
                                        </div>
                                        <Link 
                                            href={route('admin.feedback.show', feedback.id)} 
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            Lihat
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4">Belum ada feedback</p>
                            )}
                        </div>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card className="p-6 mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 Aksi Cepat</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link href={route('admin.activities.create')}>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                ➕ Tambah Kegiatan
                            </Button>
                        </Link>
                        <Link href={route('admin.announcements.create')}>
                            <Button className="w-full bg-green-600 hover:bg-green-700">
                                📢 Buat Pengumuman
                            </Button>
                        </Link>
                        <Link href={route('admin.work-programs.create')}>
                            <Button className="w-full bg-purple-600 hover:bg-purple-700">
                                📋 Program Kerja Baru
                            </Button>
                        </Link>
                        <Link href={route('admin.downloads.create')}>
                            <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                                📁 Upload File
                            </Button>
                        </Link>
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}