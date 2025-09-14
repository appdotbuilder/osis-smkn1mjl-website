import React from 'react';
import { Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Activity {
    id: number;
    title: string;
    description: string;
    category: string;
    activity_date: string;
    gallery_images?: string[];
    is_featured: boolean;
}

interface PaginatedActivities {
    data: Activity[];
    links: Array<{ url: string | null; label: string; active: boolean }>;
    meta: {
        current_page: number;
        last_page: number;
        total: number;
    };
}

interface Filters {
    category?: string;
    search?: string;
}

interface Props {
    activities: PaginatedActivities;
    filters: Filters;
    [key: string]: unknown;
}

export default function ActivityIndex({ activities, filters }: Props) {
    const handleSearch = (search: string) => {
        router.get('/activities', { ...filters, search }, { preserveState: true });
    };

    const handleCategoryFilter = (category: string) => {
        router.get('/activities', { ...filters, category: category === 'all' ? '' : category }, { preserveState: true });
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'academic': return '📚';
            case 'sports': return '⚽';
            case 'arts': return '🎨';
            case 'social': return '🤝';
            default: return '📋';
        }
    };

    const getCategoryName = (category: string) => {
        switch (category) {
            case 'academic': return 'Akademik';
            case 'sports': return 'Olahraga';
            case 'arts': return 'Seni & Budaya';
            case 'social': return 'Sosial';
            default: return category;
        }
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
            <header className="bg-gradient-to-r from-green-600 to-green-800 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold mb-4">🎯 Kegiatan OSIS</h1>
                    <p className="text-xl text-green-100">
                        Dokumentasi lengkap kegiatan dan program OSIS SMK Negeri 1 Majalengka
                    </p>
                </div>
            </header>

            {/* Filters */}
            <section className="py-8 bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <Input
                                placeholder="Cari kegiatan..."
                                defaultValue={filters.search || ''}
                                onChange={(e) => {
                                    const timer = setTimeout(() => handleSearch(e.target.value), 300);
                                    return () => clearTimeout(timer);
                                }}
                                className="w-full"
                            />
                        </div>
                        <Select 
                            value={filters.category || 'all'} 
                            onValueChange={handleCategoryFilter}
                        >
                            <SelectTrigger className="w-full md:w-48">
                                <SelectValue placeholder="Filter Kategori" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Kategori</SelectItem>
                                <SelectItem value="academic">📚 Akademik</SelectItem>
                                <SelectItem value="sports">⚽ Olahraga</SelectItem>
                                <SelectItem value="arts">🎨 Seni & Budaya</SelectItem>
                                <SelectItem value="social">🤝 Sosial</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </section>

            {/* Activities Grid */}
            <main className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {activities.data.length > 0 ? (
                        <>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                                {activities.data.map((activity) => (
                                    <Card key={activity.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                                        <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                                            {activity.gallery_images && activity.gallery_images.length > 0 ? (
                                                <img 
                                                    src={activity.gallery_images[0]} 
                                                    alt={activity.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <span className="text-4xl">
                                                        {getCategoryIcon(activity.category)}
                                                    </span>
                                                </div>
                                            )}
                                            {activity.is_featured && (
                                                <Badge className="absolute top-2 right-2 bg-yellow-500 text-yellow-900">
                                                    ⭐ Unggulan
                                                </Badge>
                                            )}
                                        </div>
                                        <CardContent className="p-4">
                                            <Badge className="mb-2" variant="secondary">
                                                {getCategoryIcon(activity.category)} {getCategoryName(activity.category)}
                                            </Badge>
                                            <CardTitle className="text-lg mb-2 group-hover:text-blue-600 transition-colors">
                                                {activity.title}
                                            </CardTitle>
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                {activity.description}
                                            </p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-500 flex items-center">
                                                    📅 {new Date(activity.activity_date).toLocaleDateString('id-ID', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                                <Link href={`/activities/${activity.id}`}>
                                                    <Button size="sm" variant="outline" className="group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                        Lihat Detail
                                                    </Button>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Pagination */}
                            {activities.meta.last_page > 1 && (
                                <div className="flex justify-center items-center space-x-2">
                                    {activities.links.map((link, index) => (
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
                            <div className="text-6xl mb-4">📋</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Tidak ada kegiatan ditemukan
                            </h3>
                            <p className="text-gray-500 mb-6">
                                {filters.search || filters.category 
                                    ? 'Coba ubah filter pencarian Anda'
                                    : 'Belum ada kegiatan yang didokumentasikan'
                                }
                            </p>
                            {(filters.search || filters.category) && (
                                <Link href="/activities">
                                    <Button variant="outline">Reset Filter</Button>
                                </Link>
                            )}
                        </div>
                    )}

                    {/* Call to Action */}
                    <div className="bg-green-50 rounded-lg p-8 text-center mt-12">
                        <h2 className="text-2xl font-bold text-green-900 mb-4">
                            🚀 Ikut Berpartisipasi!
                        </h2>
                        <p className="text-green-700 mb-6">
                            Ingin ikut serta dalam kegiatan OSIS? Bergabunglah dengan kami dan jadilah bagian dari perubahan positif!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/join">
                                <Button className="bg-green-600 hover:bg-green-700">
                                    📝 Daftar Jadi Anggota
                                </Button>
                            </Link>
                            <Link href="/feedback">
                                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                                    💡 Usulkan Kegiatan
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}