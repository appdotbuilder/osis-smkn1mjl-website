import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Announcement {
    id: number;
    title: string;
    content: string;
    type: string;
    is_featured: boolean;
    published_at: string;
}

interface Activity {
    id: number;
    title: string;
    description: string;
    category: string;
    activity_date: string;
    gallery_images?: string[];
}

interface WorkProgram {
    id: number;
    title: string;
    description: string;
    category: string;
    status: string;
    start_date: string;
    end_date?: string;
}

interface Testimonial {
    id: number;
    name: string;
    role: string;
    content: string;
    rating: number;
}

interface Props {
    featuredAnnouncements: Announcement[];
    latestAnnouncements: Announcement[];
    featuredActivities: Activity[];
    currentPrograms: WorkProgram[];
    testimonials: Testimonial[];
    [key: string]: unknown;
}

export default function Welcome({
    featuredAnnouncements,
    featuredActivities,
    currentPrograms,
    testimonials,
}: Props) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-blue-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">📚</span>
                                </div>
                                <div className="ml-3">
                                    <h1 className="text-lg font-bold text-gray-900">OSIS</h1>
                                    <p className="text-xs text-gray-500">SMK Negeri 1 Majalengka</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="hidden md:flex items-center space-x-6">
                            <Link href="/announcements" className="text-gray-700 hover:text-blue-600 transition-colors">
                                Pengumuman
                            </Link>
                            <Link href="/activities" className="text-gray-700 hover:text-blue-600 transition-colors">
                                Kegiatan
                            </Link>
                            <Link href="/work-programs" className="text-gray-700 hover:text-blue-600 transition-colors">
                                Program Kerja
                            </Link>
                            <Link href="/profile" className="text-gray-700 hover:text-blue-600 transition-colors">
                                Profil
                            </Link>
                            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                                Kontak
                            </Link>
                        </div>

                        <div className="flex items-center space-x-4">
                            <Link href="/join">
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                    Gabung OSIS
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button variant="outline" size="sm">
                                    Login
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        🎓 OSIS SMK Negeri 1 Majalengka
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-blue-100">
                        Membangun Generasi Unggul, Berkarakter, dan Berprestasi
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/join">
                            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                                🤝 Bergabung Dengan Kami
                            </Button>
                        </Link>
                        <Link href="/activities">
                            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                                📸 Lihat Kegiatan
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Announcements */}
            {featuredAnnouncements.length > 0 && (
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">📢 Pengumuman Penting</h2>
                            <p className="text-gray-600">Informasi terbaru dari OSIS</p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-6">
                            {featuredAnnouncements.map((announcement) => (
                                <Card key={announcement.id} className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex justify-between items-start mb-2">
                                            <Badge variant={announcement.type === 'urgent' ? 'destructive' : 'default'}>
                                                {announcement.type === 'urgent' ? '⚠️ Penting' : '📝 Umum'}
                                            </Badge>
                                            <span className="text-sm text-gray-500">
                                                {new Date(announcement.published_at).toLocaleDateString('id-ID')}
                                            </span>
                                        </div>
                                        <CardTitle className="text-lg">{announcement.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                            {announcement.content}
                                        </p>
                                        <Link href={`/announcements/${announcement.id}`}>
                                            <Button variant="outline" size="sm">
                                                Baca Selengkapnya
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        
                        <div className="text-center mt-8">
                            <Link href="/announcements">
                                <Button variant="outline">
                                    Lihat Semua Pengumuman
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Featured Activities */}
            {featuredActivities.length > 0 && (
                <section className="py-16 bg-blue-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">🎯 Kegiatan Unggulan</h2>
                            <p className="text-gray-600">Dokumentasi kegiatan OSIS yang telah dilaksanakan</p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-6">
                            {featuredActivities.slice(0, 6).map((activity) => (
                                <Card key={activity.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                                        <span className="text-white text-4xl">
                                            {activity.category === 'academic' && '📚'}
                                            {activity.category === 'sports' && '⚽'}
                                            {activity.category === 'arts' && '🎨'}
                                            {activity.category === 'social' && '🤝'}
                                        </span>
                                    </div>
                                    <CardContent className="p-4">
                                        <Badge className="mb-2" variant="secondary">
                                            {activity.category === 'academic' && 'Akademik'}
                                            {activity.category === 'sports' && 'Olahraga'}
                                            {activity.category === 'arts' && 'Seni'}
                                            {activity.category === 'social' && 'Sosial'}
                                        </Badge>
                                        <h3 className="font-semibold text-lg mb-2">{activity.title}</h3>
                                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                            {activity.description}
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-500">
                                                {new Date(activity.activity_date).toLocaleDateString('id-ID')}
                                            </span>
                                            <Link href={`/activities/${activity.id}`}>
                                                <Button size="sm" variant="outline">
                                                    Lihat Detail
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        
                        <div className="text-center mt-8">
                            <Link href="/activities">
                                <Button variant="outline">
                                    Lihat Semua Kegiatan
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Current Programs */}
            {currentPrograms.length > 0 && (
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">⚡ Program Kerja 2024/2025</h2>
                            <p className="text-gray-600">Program unggulan yang sedang berjalan</p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {currentPrograms.map((program) => (
                                <Card key={program.id} className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <Badge className="w-fit" variant="secondary">
                                            {program.category === 'academic' && '📚 Akademik'}
                                            {program.category === 'extracurricular' && '🎯 Ekstrakurikuler'}
                                            {program.category === 'social' && '🤝 Sosial'}
                                            {program.category === 'leadership' && '👑 Kepemimpinan'}
                                        </Badge>
                                        <CardTitle className="text-lg">{program.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                            {program.description}
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <Badge 
                                                variant={program.status === 'ongoing' ? 'default' : 'secondary'}
                                                className={program.status === 'ongoing' ? 'bg-green-100 text-green-800' : ''}
                                            >
                                                {program.status === 'ongoing' && '🔄 Berjalan'}
                                                {program.status === 'planned' && '📅 Direncanakan'}
                                                {program.status === 'completed' && '✅ Selesai'}
                                            </Badge>
                                            <Link href={`/work-programs/${program.id}`}>
                                                <Button size="sm" variant="outline">
                                                    Detail
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        
                        <div className="text-center mt-8">
                            <Link href="/work-programs">
                                <Button variant="outline">
                                    Lihat Semua Program
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Testimonials */}
            {testimonials.length > 0 && (
                <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">💬 Testimoni</h2>
                            <p className="text-blue-100">Apa kata mereka tentang OSIS SMK Negeri 1 Majalengka</p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            {testimonials.map((testimonial) => (
                                <Card key={testimonial.id} className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                                    <CardContent className="p-6">
                                        <div className="flex items-center mb-4">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <span key={i} className="text-yellow-400">⭐</span>
                                            ))}
                                        </div>
                                        <p className="text-white/90 mb-4 italic">
                                            "{testimonial.content}"
                                        </p>
                                        <div>
                                            <p className="font-semibold">{testimonial.name}</p>
                                            <p className="text-blue-200 text-sm">{testimonial.role}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Admin Features Showcase */}
            <section className="py-16 bg-gradient-to-br from-purple-900 to-blue-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">🎛️ Admin Panel Lengkap</h2>
                        <p className="text-purple-200">
                            Sistem manajemen konten dengan dukungan upload file dan validasi data yang robust
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white p-6">
                            <div className="text-3xl mb-4">📅</div>
                            <h3 className="font-semibold mb-2">Kelola Kegiatan</h3>
                            <p className="text-white/80 text-sm mb-4">
                                Upload galeri foto, set kategori, dan atur kegiatan unggulan
                            </p>
                            <Link href="/admin/activities">
                                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                                    Lihat Demo
                                </Button>
                            </Link>
                        </Card>

                        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white p-6">
                            <div className="text-3xl mb-4">📢</div>
                            <h3 className="font-semibold mb-2">Pengumuman</h3>
                            <p className="text-white/80 text-sm mb-4">
                                Publikasi pengumuman dengan gambar, jadwal otomatis
                            </p>
                            <Link href="/admin/announcements">
                                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                                    Lihat Demo
                                </Button>
                            </Link>
                        </Card>

                        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white p-6">
                            <div className="text-3xl mb-4">📁</div>
                            <h3 className="font-semibold mb-2">File Upload</h3>
                            <p className="text-white/80 text-sm mb-4">
                                Upload dokumen, validasi ukuran dan format otomatis
                            </p>
                            <Link href="/admin/downloads">
                                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                                    Lihat Demo
                                </Button>
                            </Link>
                        </Card>

                        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white p-6">
                            <div className="text-3xl mb-4">👥</div>
                            <h3 className="font-semibold mb-2">Manajemen Data</h3>
                            <p className="text-white/80 text-sm mb-4">
                                Kelola anggota, feedback, dan testimoni dengan mudah
                            </p>
                            <Link href="/admin">
                                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                                    Dashboard
                                </Button>
                            </Link>
                        </Card>
                    </div>

                    <div className="mt-12 text-center">
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8 max-w-4xl mx-auto">
                            <h3 className="text-2xl font-bold mb-4">✨ Fitur Utama Admin Panel</h3>
                            <div className="grid md:grid-cols-2 gap-6 text-left">
                                <div>
                                    <h4 className="font-semibold mb-2">🔧 Teknologi Modern</h4>
                                    <ul className="space-y-1 text-white/80 text-sm">
                                        <li>• Laravel 11 dengan Inertia.js</li>
                                        <li>• React + TypeScript</li>
                                        <li>• Validasi form yang robust</li>
                                        <li>• Upload file dengan preview</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">🛡️ Keamanan & Validasi</h4>
                                    <ul className="space-y-1 text-white/80 text-sm">
                                        <li>• Form Request validation</li>
                                        <li>• File type & size validation</li>
                                        <li>• XSS dan CSRF protection</li>
                                        <li>• Authorization middleware</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        🚀 Bergabunglah Dengan Kami!
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Jadilah bagian dari perubahan positif di SMK Negeri 1 Majalengka. 
                        Kembangkan potensi kepemimpinanmu bersama OSIS!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/admin">
                            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                                🎛️ Coba Admin Panel
                            </Button>
                        </Link>
                        <Link href="/join">
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                                📝 Daftar Sekarang
                            </Button>
                        </Link>
                        <Link href="/feedback">
                            <Button size="lg" variant="outline">
                                💬 Berikan Masukan
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
                                    <span className="text-white font-bold">📚</span>
                                </div>
                                <span className="text-lg font-bold">OSIS</span>
                            </div>
                            <p className="text-gray-400">
                                Organisasi Siswa Intra Sekolah SMK Negeri 1 Majalengka
                            </p>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold mb-4">Menu</h3>
                            <div className="space-y-2">
                                <Link href="/announcements" className="block text-gray-400 hover:text-white transition-colors">
                                    Pengumuman
                                </Link>
                                <Link href="/activities" className="block text-gray-400 hover:text-white transition-colors">
                                    Kegiatan
                                </Link>
                                <Link href="/work-programs" className="block text-gray-400 hover:text-white transition-colors">
                                    Program Kerja
                                </Link>
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold mb-4">Tentang</h3>
                            <div className="space-y-2">
                                <Link href="/profile" className="block text-gray-400 hover:text-white transition-colors">
                                    Profil OSIS
                                </Link>
                                <Link href="/downloads" className="block text-gray-400 hover:text-white transition-colors">
                                    Download
                                </Link>
                                <Link href="/faq" className="block text-gray-400 hover:text-white transition-colors">
                                    FAQ
                                </Link>
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold mb-4">Kontak</h3>
                            <div className="space-y-2 text-gray-400">
                                <p>📧 osis@smkn1majalengka.sch.id</p>
                                <p>📍 SMK Negeri 1 Majalengka</p>
                                <Link href="/contact" className="block text-blue-400 hover:text-blue-300 transition-colors">
                                    Selengkapnya →
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 OSIS SMK Negeri 1 Majalengka. Semua hak dilindungi.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}