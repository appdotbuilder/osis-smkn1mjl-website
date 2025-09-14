import React from 'react';
import { Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface WorkProgram {
    id: number;
    title: string;
    description: string;
    category: string;
    status: string;
    academic_year: string;
    start_date: string;
    end_date?: string;
    is_featured: boolean;
}

interface PaginatedPrograms {
    data: WorkProgram[];
    links: Array<{ url: string | null; label: string; active: boolean }>;
    meta: {
        current_page: number;
        last_page: number;
        total: number;
    };
}

interface Filters {
    year?: string;
    category?: string;
    status?: string;
}

interface Props {
    programs: PaginatedPrograms;
    availableYears: string[];
    filters: Filters;
    [key: string]: unknown;
}

export default function WorkProgramIndex({ programs, availableYears, filters }: Props) {
    const handleYearFilter = (year: string) => {
        router.get('/work-programs', { ...filters, year }, { preserveState: true });
    };

    const handleCategoryFilter = (category: string) => {
        router.get('/work-programs', { ...filters, category: category === 'all' ? '' : category }, { preserveState: true });
    };

    const handleStatusFilter = (status: string) => {
        router.get('/work-programs', { ...filters, status: status === 'all' ? '' : status }, { preserveState: true });
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'academic': return '📚';
            case 'extracurricular': return '🎯';
            case 'social': return '🤝';
            case 'leadership': return '👑';
            default: return '📋';
        }
    };

    const getCategoryName = (category: string) => {
        switch (category) {
            case 'academic': return 'Akademik';
            case 'extracurricular': return 'Ekstrakurikuler';
            case 'social': return 'Sosial';
            case 'leadership': return 'Kepemimpinan';
            default: return category;
        }
    };

    const getStatusBadgeColor = (status: string) => {
        switch (status) {
            case 'ongoing': return 'bg-green-100 text-green-800';
            case 'planned': return 'bg-blue-100 text-blue-800';
            case 'completed': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusName = (status: string) => {
        switch (status) {
            case 'ongoing': return '🔄 Berjalan';
            case 'planned': return '📅 Direncanakan';
            case 'completed': return '✅ Selesai';
            default: return status;
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
            <header className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold mb-4">⚡ Program Kerja OSIS</h1>
                    <p className="text-xl text-purple-100">
                        Rencana dan pelaksanaan program kerja OSIS SMK Negeri 1 Majalengka
                    </p>
                </div>
            </header>

            {/* Filters */}
            <section className="py-8 bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-4">
                        <Select 
                            value={filters.year || '2024/2025'} 
                            onValueChange={handleYearFilter}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih Tahun" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableYears.map((year) => (
                                    <SelectItem key={year} value={year}>
                                        📅 {year}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select 
                            value={filters.category || 'all'} 
                            onValueChange={handleCategoryFilter}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Filter Kategori" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Kategori</SelectItem>
                                <SelectItem value="academic">📚 Akademik</SelectItem>
                                <SelectItem value="extracurricular">🎯 Ekstrakurikuler</SelectItem>
                                <SelectItem value="social">🤝 Sosial</SelectItem>
                                <SelectItem value="leadership">👑 Kepemimpinan</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select 
                            value={filters.status || 'all'} 
                            onValueChange={handleStatusFilter}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Filter Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Status</SelectItem>
                                <SelectItem value="ongoing">🔄 Berjalan</SelectItem>
                                <SelectItem value="planned">📅 Direncanakan</SelectItem>
                                <SelectItem value="completed">✅ Selesai</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </section>

            {/* Programs Grid */}
            <main className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {programs.data.length > 0 ? (
                        <>
                            {/* Featured Programs */}
                            {programs.data.some(program => program.is_featured) && (
                                <div className="mb-12">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">⭐ Program Unggulan</h2>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                        {programs.data.filter(program => program.is_featured).map((program) => (
                                            <Card key={program.id} className="border-2 border-yellow-200 hover:shadow-lg transition-shadow group">
                                                <CardHeader>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <Badge className="bg-yellow-100 text-yellow-800">
                                                            ⭐ Unggulan
                                                        </Badge>
                                                        <Badge className={getStatusBadgeColor(program.status)}>
                                                            {getStatusName(program.status)}
                                                        </Badge>
                                                    </div>
                                                    <Badge variant="secondary" className="w-fit mb-2">
                                                        {getCategoryIcon(program.category)} {getCategoryName(program.category)}
                                                    </Badge>
                                                    <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">
                                                        {program.title}
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                        {program.description}
                                                    </p>
                                                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                                                        <span>📅 Mulai: {new Date(program.start_date).toLocaleDateString('id-ID')}</span>
                                                        {program.end_date && (
                                                            <span>🏁 Selesai: {new Date(program.end_date).toLocaleDateString('id-ID')}</span>
                                                        )}
                                                    </div>
                                                    <Link href={`/work-programs/${program.id}`}>
                                                        <Button size="sm" className="w-full group-hover:bg-purple-600 transition-colors">
                                                            Lihat Detail
                                                        </Button>
                                                    </Link>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* All Programs */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    📋 Semua Program {filters.year || '2024/2025'}
                                </h2>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                                    {programs.data.map((program) => (
                                        <Card key={program.id} className="hover:shadow-lg transition-shadow group">
                                            <CardHeader>
                                                <div className="flex items-center justify-between mb-2">
                                                    <Badge variant="secondary">
                                                        {getCategoryIcon(program.category)} {getCategoryName(program.category)}
                                                    </Badge>
                                                    <Badge className={getStatusBadgeColor(program.status)}>
                                                        {getStatusName(program.status)}
                                                    </Badge>
                                                </div>
                                                <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">
                                                    {program.title}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                                    {program.description}
                                                </p>
                                                <div className="space-y-1 text-sm text-gray-500 mb-4">
                                                    <div className="flex items-center">
                                                        <span className="mr-2">📅</span>
                                                        <span>Mulai: {new Date(program.start_date).toLocaleDateString('id-ID')}</span>
                                                    </div>
                                                    {program.end_date && (
                                                        <div className="flex items-center">
                                                            <span className="mr-2">🏁</span>
                                                            <span>Selesai: {new Date(program.end_date).toLocaleDateString('id-ID')}</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <Link href={`/work-programs/${program.id}`}>
                                                    <Button size="sm" variant="outline" className="w-full group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                                        Lihat Detail
                                                    </Button>
                                                </Link>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            {/* Pagination */}
                            {programs.meta.last_page > 1 && (
                                <div className="flex justify-center items-center space-x-2">
                                    {programs.links.map((link, index) => (
                                        <div key={index}>
                                            {link.url ? (
                                                <Link
                                                    href={link.url}
                                                    className={`px-3 py-2 rounded-lg text-sm ${
                                                        link.active
                                                            ? 'bg-purple-600 text-white'
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
                                Tidak ada program kerja ditemukan
                            </h3>
                            <p className="text-gray-500 mb-6">
                                {(filters.category || filters.status) 
                                    ? 'Coba ubah filter pencarian Anda'
                                    : `Belum ada program kerja untuk tahun ${filters.year || '2024/2025'}`
                                }
                            </p>
                            {(filters.category || filters.status) && (
                                <Link href={`/work-programs?year=${filters.year || '2024/2025'}`}>
                                    <Button variant="outline">Reset Filter</Button>
                                </Link>
                            )}
                        </div>
                    )}

                    {/* Call to Action */}
                    <div className="bg-purple-50 rounded-lg p-8 text-center mt-12">
                        <h2 className="text-2xl font-bold text-purple-900 mb-4">
                            💡 Punya Usulan Program?
                        </h2>
                        <p className="text-purple-700 mb-6">
                            Sampaikan ide dan usulan program kerja untuk meningkatkan kualitas kegiatan OSIS!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/feedback">
                                <Button className="bg-purple-600 hover:bg-purple-700">
                                    💬 Kirim Usulan
                                </Button>
                            </Link>
                            <Link href="/join">
                                <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
                                    🤝 Bergabung OSIS
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}