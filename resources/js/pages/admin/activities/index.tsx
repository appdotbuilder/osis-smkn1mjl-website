import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Link, router } from '@inertiajs/react';

interface Activity {
    id: number;
    title: string;
    description: string;
    category: string;
    activity_date: string;
    is_featured: boolean;
    gallery_images?: string[];
    created_at: string;
}

interface PaginatedData {
    data: Activity[];
    links: Array<{
        url?: string;
        label: string;
        active: boolean;
    }>;
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

interface Filters {
    search?: string;
    category?: string;
    featured?: string;
}

interface Props {
    activities: PaginatedData;
    filters: Filters;
    [key: string]: unknown;
}

export default function ActivitiesIndex({ activities, filters }: Props) {
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const search = formData.get('search') as string;
        
        router.get(route('admin.activities.index'), {
            ...filters,
            search: search || undefined,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleFilter = (key: string, value: string) => {
        router.get(route('admin.activities.index'), {
            ...filters,
            [key]: value || undefined,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleDelete = (activity: Activity) => {
        if (confirm(`Apakah Anda yakin ingin menghapus kegiatan "${activity.title}"?`)) {
            router.delete(route('admin.activities.destroy', activity.id));
        }
    };

    const getCategoryDisplay = (category: string) => {
        const categories: Record<string, string> = {
            'academic': '📚 Akademik',
            'social': '🤝 Sosial',
            'sports': '⚽ Olahraga',
            'arts': '🎨 Seni',
            'volunteer': '🙋 Volunteer',
            'competition': '🏆 Kompetisi',
        };
        return categories[category] || category;
    };

    return (
        <AppLayout>
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">📅 Kelola Kegiatan</h1>
                        <p className="text-gray-600 mt-1">Kelola semua kegiatan OSIS dengan upload gambar</p>
                    </div>
                    <Link href={route('admin.activities.create')}>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            ➕ Tambah Kegiatan
                        </Button>
                    </Link>
                </div>

                {/* Filters */}
                <Card className="p-4">
                    <div className="grid md:grid-cols-4 gap-4">
                        <form onSubmit={handleSearch} className="flex gap-2">
                            <Input
                                name="search"
                                placeholder="Cari kegiatan..."
                                defaultValue={filters.search}
                                className="flex-1"
                            />
                            <Button type="submit" variant="outline">
                                🔍
                            </Button>
                        </form>
                        
                        <select
                            value={filters.category || ''}
                            onChange={(e) => handleFilter('category', e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Semua Kategori</option>
                            <option value="academic">📚 Akademik</option>
                            <option value="social">🤝 Sosial</option>
                            <option value="sports">⚽ Olahraga</option>
                            <option value="arts">🎨 Seni</option>
                            <option value="volunteer">🙋 Volunteer</option>
                            <option value="competition">🏆 Kompetisi</option>
                        </select>

                        <select
                            value={filters.featured || ''}
                            onChange={(e) => handleFilter('featured', e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Semua Status</option>
                            <option value="yes">⭐ Unggulan</option>
                            <option value="no">📝 Biasa</option>
                        </select>

                        <div className="flex gap-2">
                            <Button 
                                variant="outline" 
                                onClick={() => router.get(route('admin.activities.index'))}
                                className="flex-1"
                            >
                                🔄 Reset
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Activities List */}
                <div className="grid gap-4">
                    {activities.data.length > 0 ? (
                        activities.data.map((activity) => (
                            <Card key={activity.id} className="p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <h3 className="text-lg font-semibold text-gray-900">{activity.title}</h3>
                                            <Badge variant="secondary">
                                                {getCategoryDisplay(activity.category)}
                                            </Badge>
                                            {activity.is_featured && (
                                                <Badge className="bg-yellow-100 text-yellow-800">
                                                    ⭐ Unggulan
                                                </Badge>
                                            )}
                                        </div>
                                        
                                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                            {activity.description}
                                        </p>

                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span>📅 {new Date(activity.activity_date).toLocaleDateString('id-ID')}</span>
                                            {activity.gallery_images && activity.gallery_images.length > 0 && (
                                                <span>📷 {activity.gallery_images.length} foto</span>
                                            )}
                                            <span>🕒 {new Date(activity.created_at).toLocaleDateString('id-ID')}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 ml-4">
                                        <Link href={route('admin.activities.show', activity.id)}>
                                            <Button size="sm" variant="outline">
                                                👁️ Lihat
                                            </Button>
                                        </Link>
                                        <Link href={route('admin.activities.edit', activity.id)}>
                                            <Button size="sm" variant="outline">
                                                ✏️ Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleDelete(activity)}
                                            className="text-red-600 hover:bg-red-50"
                                        >
                                            🗑️
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <Card className="p-8 text-center">
                            <div className="text-gray-500">
                                <div className="text-4xl mb-4">📅</div>
                                <h3 className="text-lg font-medium mb-2">Belum Ada Kegiatan</h3>
                                <p className="text-sm mb-4">Mulai dengan menambahkan kegiatan pertama</p>
                                <Link href={route('admin.activities.create')}>
                                    <Button className="bg-blue-600 hover:bg-blue-700">
                                        ➕ Tambah Kegiatan Pertama
                                    </Button>
                                </Link>
                            </div>
                        </Card>
                    )}
                </div>

                {/* Pagination */}
                {activities.meta.last_page > 1 && (
                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-700">
                                Menampilkan {activities.data.length} dari {activities.meta.total} kegiatan
                            </div>
                            <div className="flex items-center gap-2">
                                {activities.links.map((link, index) => (
                                    <button
                                        key={index}
                                        onClick={() => link.url && router.get(link.url)}
                                        disabled={!link.url}
                                        className={`px-3 py-1 rounded text-sm transition-colors ${
                                            link.active
                                                ? 'bg-blue-600 text-white'
                                                : link.url
                                                ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                                : 'text-gray-400 cursor-not-allowed'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    </Card>
                )}

                {/* Stats */}
                <Card className="p-4 bg-blue-50 border-blue-200">
                    <div className="grid md:grid-cols-4 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-bold text-blue-600">{activities.meta.total}</div>
                            <div className="text-sm text-blue-800">Total Kegiatan</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-green-600">
                                {activities.data.filter(a => a.is_featured).length}
                            </div>
                            <div className="text-sm text-green-800">Kegiatan Unggulan</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-purple-600">
                                {activities.data.filter(a => a.gallery_images && a.gallery_images.length > 0).length}
                            </div>
                            <div className="text-sm text-purple-800">Dengan Galeri</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-orange-600">
                                {activities.data.reduce((acc, a) => acc + (a.gallery_images?.length || 0), 0)}
                            </div>
                            <div className="text-sm text-orange-800">Total Foto</div>
                        </div>
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}