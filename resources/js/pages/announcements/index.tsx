import React from 'react';
import { Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Announcement {
    id: number;
    title: string;
    content: string;
    type: string;
    published_at: string;
    is_featured: boolean;
}

interface PaginatedAnnouncements {
    data: Announcement[];
    links: Array<{ url: string | null; label: string; active: boolean }>;
    meta: {
        current_page: number;
        last_page: number;
        total: number;
    };
}

interface Filters {
    type?: string;
    search?: string;
}

interface Props {
    announcements: PaginatedAnnouncements;
    filters: Filters;
    [key: string]: unknown;
}

export default function AnnouncementIndex({ announcements, filters }: Props) {
    const handleSearch = (search: string) => {
        router.get('/announcements', { ...filters, search }, { preserveState: true });
    };

    const handleTypeFilter = (type: string) => {
        router.get('/announcements', { ...filters, type: type === 'all' ? '' : type }, { preserveState: true });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">📚</span>
                            </div>
                            <span className="font-semibold text-gray-900">OSIS SMK N 1 Majalengka</span>
                        </Link>
                        <Link href="/">
                            <Button variant="ghost">← Kembali ke Beranda</Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Header */}
            <header className="bg-blue-600 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold mb-4">📢 Pengumuman</h1>
                    <p className="text-xl text-blue-100">
                        Informasi terbaru dan penting dari OSIS SMK Negeri 1 Majalengka
                    </p>
                </div>
            </header>

            {/* Filters */}
            <section className="py-8 bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <Input
                                placeholder="Cari pengumuman..."
                                defaultValue={filters.search || ''}
                                onChange={(e) => {
                                    const timer = setTimeout(() => handleSearch(e.target.value), 300);
                                    return () => clearTimeout(timer);
                                }}
                                className="w-full"
                            />
                        </div>
                        <Select 
                            value={filters.type || 'all'} 
                            onValueChange={handleTypeFilter}
                        >
                            <SelectTrigger className="w-full md:w-48">
                                <SelectValue placeholder="Filter Kategori" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Kategori</SelectItem>
                                <SelectItem value="general">📝 Umum</SelectItem>
                                <SelectItem value="urgent">⚠️ Penting</SelectItem>
                                <SelectItem value="event">🎉 Event</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </section>

            {/* Announcements Grid */}
            <main className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {announcements.data.length > 0 ? (
                        <>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                                {announcements.data.map((announcement) => (
                                    <Card key={announcement.id} className="hover:shadow-lg transition-shadow">
                                        <CardHeader>
                                            <div className="flex justify-between items-start mb-2">
                                                <Badge 
                                                    variant={announcement.type === 'urgent' ? 'destructive' : 'default'}
                                                    className={announcement.type === 'event' ? 'bg-purple-100 text-purple-800' : ''}
                                                >
                                                    {announcement.type === 'urgent' && '⚠️ Penting'}
                                                    {announcement.type === 'general' && '📝 Umum'}
                                                    {announcement.type === 'event' && '🎉 Event'}
                                                </Badge>
                                                {announcement.is_featured && (
                                                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                                        ⭐ Unggulan
                                                    </Badge>
                                                )}
                                            </div>
                                            <CardTitle className="text-lg">{announcement.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                                {announcement.content}
                                            </p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-500">
                                                    📅 {new Date(announcement.published_at).toLocaleDateString('id-ID', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                                <Link href={`/announcements/${announcement.id}`}>
                                                    <Button size="sm" variant="outline">
                                                        Baca Selengkapnya
                                                    </Button>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Pagination */}
                            {announcements.meta.last_page > 1 && (
                                <div className="flex justify-center items-center space-x-2">
                                    {announcements.links.map((link, index) => (
                                        <div key={index}>
                                            {link.url ? (
                                                <Link
                                                    href={link.url}
                                                    className={`px-3 py-2 rounded-lg text-sm ${
                                                        link.active
                                                            ? 'bg-blue-600 text-white'
                                                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ) : (
                                                <span
                                                    className="px-3 py-2 rounded-lg text-sm text-gray-400 border border-gray-200"
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📭</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Tidak ada pengumuman ditemukan
                            </h3>
                            <p className="text-gray-500 mb-6">
                                {filters.search || filters.type 
                                    ? 'Coba ubah filter pencarian Anda'
                                    : 'Belum ada pengumuman yang dipublikasikan'
                                }
                            </p>
                            {(filters.search || filters.type) && (
                                <Link href="/announcements">
                                    <Button variant="outline">Reset Filter</Button>
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}