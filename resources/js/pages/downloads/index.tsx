import React from 'react';
import { Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Download {
    id: number;
    title: string;
    description: string;
    category: string;
    file_path: string;
    file_size: number;
    file_type: string;
    download_count: number;
    uploaded_at: string;
}

interface PaginatedDownloads {
    data: Download[];
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
    downloads: PaginatedDownloads;
    filters: Filters;
    [key: string]: unknown;
}

export default function DownloadsIndex({ downloads, filters }: Props) {
    const handleSearch = (search: string) => {
        router.get('/downloads', { ...filters, search }, { preserveState: true });
    };

    const handleCategoryFilter = (category: string) => {
        router.get('/downloads', { ...filters, category: category === 'all' ? '' : category }, { preserveState: true });
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'document': return '📄';
            case 'form': return '📝';
            case 'guideline': return '📋';
            case 'template': return '📃';
            case 'report': return '📊';
            case 'presentation': return '📺';
            default: return '📁';
        }
    };

    const getCategoryName = (category: string) => {
        switch (category) {
            case 'document': return 'Dokumen';
            case 'form': return 'Formulir';
            case 'guideline': return 'Panduan';
            case 'template': return 'Template';
            case 'report': return 'Laporan';
            case 'presentation': return 'Presentasi';
            default: return category;
        }
    };

    const getFileTypeIcon = (fileType: string) => {
        const type = fileType.toLowerCase();
        if (type.includes('pdf')) return '📕';
        if (type.includes('doc') || type.includes('docx')) return '📘';
        if (type.includes('xls') || type.includes('xlsx')) return '📗';
        if (type.includes('ppt') || type.includes('pptx')) return '📙';
        if (type.includes('image')) return '🖼️';
        return '📄';
    };

    const formatFileSize = (bytes: number) => {
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        if (bytes === 0) return '0 Bytes';
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    };

    const handleDownload = (downloadId: number) => {
        // In a real application, this would trigger the download
        router.post(`/downloads/${downloadId}`, {}, {
            onSuccess: () => {
                // Handle success if needed
            }
        });
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
            <header className="bg-gradient-to-r from-teal-600 to-teal-800 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold mb-4">📥 Download Center</h1>
                    <p className="text-xl text-teal-100">
                        Akses dokumen, formulir, dan materi penting dari OSIS SMK Negeri 1 Majalengka
                    </p>
                </div>
            </header>

            {/* Info Banner */}
            <div className="bg-blue-50 border-b border-blue-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Alert className="border-blue-200">
                        <AlertDescription className="text-blue-800">
                            💡 <strong>Info:</strong> Semua file dapat diunduh gratis. Pastikan Anda memiliki aplikasi yang sesuai untuk membuka file yang diunduh.
                        </AlertDescription>
                    </Alert>
                </div>
            </div>

            {/* Filters */}
            <section className="py-8 bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <Input
                                placeholder="Cari file..."
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
                                <SelectItem value="document">📄 Dokumen</SelectItem>
                                <SelectItem value="form">📝 Formulir</SelectItem>
                                <SelectItem value="guideline">📋 Panduan</SelectItem>
                                <SelectItem value="template">📃 Template</SelectItem>
                                <SelectItem value="report">📊 Laporan</SelectItem>
                                <SelectItem value="presentation">📺 Presentasi</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </section>

            {/* Downloads Grid */}
            <main className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {downloads.data.length > 0 ? (
                        <>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                                {downloads.data.map((download) => (
                                    <Card key={download.id} className="hover:shadow-lg transition-shadow group">
                                        <CardHeader>
                                            <div className="flex items-center justify-between mb-3">
                                                <Badge variant="secondary">
                                                    {getCategoryIcon(download.category)} {getCategoryName(download.category)}
                                                </Badge>
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <span className="mr-1">📥</span>
                                                    <span>{download.download_count}</span>
                                                </div>
                                            </div>
                                            <CardTitle className="text-lg group-hover:text-teal-600 transition-colors">
                                                {download.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                {download.description}
                                            </p>
                                            
                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="flex items-center">
                                                        <span className="mr-2">
                                                            {getFileTypeIcon(download.file_type)}
                                                        </span>
                                                        <span className="text-gray-600">
                                                            {download.file_type.toUpperCase()}
                                                        </span>
                                                    </span>
                                                    <span className="text-gray-500">
                                                        {formatFileSize(download.file_size)}
                                                    </span>
                                                </div>
                                                
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <span className="mr-2">📅</span>
                                                    <span>
                                                        {new Date(download.uploaded_at).toLocaleDateString('id-ID', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            <Button 
                                                onClick={() => handleDownload(download.id)}
                                                className="w-full bg-teal-600 hover:bg-teal-700 group-hover:shadow-md transition-all"
                                            >
                                                📥 Download
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Pagination */}
                            {downloads.meta.last_page > 1 && (
                                <div className="flex justify-center items-center space-x-2">
                                    {downloads.links.map((link, index) => (
                                        <div key={index}>
                                            {link.url ? (
                                                <Link
                                                    href={link.url}
                                                    className={`px-3 py-2 rounded-lg text-sm ${
                                                        link.active
                                                            ? 'bg-teal-600 text-white'
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
                            <div className="text-6xl mb-4">📁</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Tidak ada file ditemukan
                            </h3>
                            <p className="text-gray-500 mb-6">
                                {filters.search || filters.category 
                                    ? 'Coba ubah filter pencarian Anda'
                                    : 'Belum ada file yang tersedia untuk diunduh'
                                }
                            </p>
                            {(filters.search || filters.category) && (
                                <Link href="/downloads">
                                    <Button variant="outline">Reset Filter</Button>
                                </Link>
                            )}
                        </div>
                    )}

                    {/* Featured Categories */}
                    <div className="grid md:grid-cols-3 gap-6 mt-12">
                        <Card className="bg-teal-50 border-teal-200">
                            <CardHeader>
                                <CardTitle className="flex items-center text-teal-900">
                                    📝 Formulir OSIS
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-teal-800 text-sm space-y-1">
                                <p>• Formulir Pendaftaran Anggota</p>
                                <p>• Formulir Usulan Kegiatan</p>
                                <p>• Formulir Feedback</p>
                                <p>• Formulir Pengajuan Dana</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-blue-50 border-blue-200">
                            <CardHeader>
                                <CardTitle className="flex items-center text-blue-900">
                                    📋 Panduan & Tutorial
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-blue-800 text-sm space-y-1">
                                <p>• Panduan Organisasi OSIS</p>
                                <p>• Tutorial Penyelenggaraan Event</p>
                                <p>• Panduan Leadership</p>
                                <p>• Manual Administrasi</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-purple-50 border-purple-200">
                            <CardHeader>
                                <CardTitle className="flex items-center text-purple-900">
                                    📊 Laporan & Data
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-purple-800 text-sm space-y-1">
                                <p>• Laporan Kegiatan Bulanan</p>
                                <p>• Data Partisipasi Siswa</p>
                                <p>• Evaluasi Program Kerja</p>
                                <p>• Laporan Keuangan</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Call to Action */}
                    <div className="bg-teal-50 rounded-lg p-8 text-center mt-12">
                        <h2 className="text-2xl font-bold text-teal-900 mb-4">
                            📧 Butuh File Khusus?
                        </h2>
                        <p className="text-teal-700 mb-6">
                            Jika Anda membutuhkan dokumen atau file tertentu yang tidak tersedia di sini, jangan ragu untuk menghubungi kami!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact">
                                <Button className="bg-teal-600 hover:bg-teal-700">
                                    📞 Hubungi OSIS
                                </Button>
                            </Link>
                            <Link href="/feedback">
                                <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white">
                                    📝 Request File
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}