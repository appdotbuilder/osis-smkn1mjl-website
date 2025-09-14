import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface Activity {
    id: number;
    title: string;
    description: string;
    category: string;
    activity_date: string;
    location: string;
    participants_count: number;
    gallery_images?: string[];
    objectives: string[];
    achievements: string[];
    organizer: string;
    is_featured: boolean;
}

interface Props {
    activity: Activity;
    relatedActivities: Activity[];
    [key: string]: unknown;
}

export default function ActivityShow({ activity, relatedActivities }: Props) {
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
                        <div className="flex items-center space-x-2">
                            <Link href="/activities">
                                <Button variant="ghost" size="sm">← Kembali ke Kegiatan</Button>
                            </Link>
                            <Link href="/">
                                <Button variant="outline" size="sm">Beranda</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Header */}
            <header className="bg-gradient-to-r from-green-600 to-green-800 text-white py-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center space-x-4 mb-4">
                        <Badge className="bg-white/20 text-white">
                            {getCategoryIcon(activity.category)} {getCategoryName(activity.category)}
                        </Badge>
                        {activity.is_featured && (
                            <Badge className="bg-yellow-500 text-yellow-900">
                                ⭐ Kegiatan Unggulan
                            </Badge>
                        )}
                    </div>
                    <h1 className="text-4xl font-bold mb-4">{activity.title}</h1>
                    <div className="flex flex-wrap items-center gap-6 text-green-100">
                        <span>📅 {new Date(activity.activity_date).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</span>
                        {activity.location && <span>📍 {activity.location}</span>}
                        {activity.participants_count && <span>👥 {activity.participants_count} peserta</span>}
                        <span>👨‍💼 {activity.organizer}</span>
                    </div>
                </div>
            </header>

            <main className="py-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-4 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-3 space-y-8">
                            {/* Gallery */}
                            {activity.gallery_images && activity.gallery_images.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            📸 Galeri Kegiatan
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {activity.gallery_images.map((image, index) => (
                                                <div key={index} className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                                                    <img 
                                                        src={image} 
                                                        alt={`${activity.title} - Foto ${index + 1}`}
                                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Description */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        📝 Deskripsi Kegiatan
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                        {activity.description}
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Objectives */}
                            {activity.objectives && activity.objectives.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            🎯 Tujuan Kegiatan
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-3">
                                            {activity.objectives.map((objective, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                                                        {index + 1}
                                                    </span>
                                                    <span className="text-gray-700">{objective}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Achievements */}
                            {activity.achievements && activity.achievements.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            🏆 Pencapaian & Hasil
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {activity.achievements.map((achievement, index) => (
                                                <div key={index} className="flex items-center p-4 bg-green-50 rounded-lg">
                                                    <span className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-lg flex items-center justify-center text-lg font-bold mr-4">
                                                        🏆
                                                    </span>
                                                    <span className="text-gray-800">{achievement}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Activity Info */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">📊 Informasi Kegiatan</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Tanggal</label>
                                        <p className="mt-1 text-gray-900">
                                            📅 {new Date(activity.activity_date).toLocaleDateString('id-ID', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    
                                    <Separator />
                                    
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Kategori</label>
                                        <p className="mt-1">
                                            <Badge variant="secondary">
                                                {getCategoryIcon(activity.category)} {getCategoryName(activity.category)}
                                            </Badge>
                                        </p>
                                    </div>
                                    
                                    {activity.location && (
                                        <>
                                            <Separator />
                                            <div>
                                                <label className="text-sm font-medium text-gray-500">Lokasi</label>
                                                <p className="mt-1 text-gray-900">📍 {activity.location}</p>
                                            </div>
                                        </>
                                    )}
                                    
                                    <Separator />
                                    
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Penyelenggara</label>
                                        <p className="mt-1 text-gray-900">👨‍💼 {activity.organizer}</p>
                                    </div>
                                    
                                    {activity.participants_count && (
                                        <>
                                            <Separator />
                                            <div>
                                                <label className="text-sm font-medium text-gray-500">Jumlah Peserta</label>
                                                <p className="mt-1 text-gray-900 font-medium">👥 {activity.participants_count} orang</p>
                                            </div>
                                        </>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Actions */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">🚀 Aksi</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Link href="/join">
                                        <Button className="w-full bg-green-600 hover:bg-green-700">
                                            🤝 Bergabung OSIS
                                        </Button>
                                    </Link>
                                    <Link href="/feedback">
                                        <Button variant="outline" className="w-full">
                                            💬 Berikan Feedback
                                        </Button>
                                    </Link>
                                    <Link href="/activities">
                                        <Button variant="outline" className="w-full">
                                            📋 Lihat Kegiatan Lain
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>

                            {/* Share */}
                            <Card className="bg-blue-50 border-blue-200">
                                <CardHeader>
                                    <CardTitle className="text-lg text-blue-900">📢 Bagikan</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-blue-800 text-sm mb-3">
                                        Bagikan kegiatan ini kepada teman-teman!
                                    </p>
                                    <div className="flex space-x-2">
                                        <Button size="sm" variant="outline" className="flex-1 text-xs">
                                            WhatsApp
                                        </Button>
                                        <Button size="sm" variant="outline" className="flex-1 text-xs">
                                            Facebook
                                        </Button>
                                        <Button size="sm" variant="outline" className="flex-1 text-xs">
                                            Copy Link
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Related Activities */}
                    {relatedActivities.length > 0 && (
                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                🔗 Kegiatan Terkait
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {relatedActivities.map((relatedActivity) => (
                                    <Card key={relatedActivity.id} className="hover:shadow-lg transition-shadow">
                                        <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                                            {relatedActivity.gallery_images && relatedActivity.gallery_images.length > 0 ? (
                                                <img 
                                                    src={relatedActivity.gallery_images[0]} 
                                                    alt={relatedActivity.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <span className="text-3xl">
                                                        {getCategoryIcon(relatedActivity.category)}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <CardHeader>
                                            <Badge variant="secondary" className="w-fit mb-2">
                                                {getCategoryIcon(relatedActivity.category)} {getCategoryName(relatedActivity.category)}
                                            </Badge>
                                            <CardTitle className="text-lg">{relatedActivity.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                {relatedActivity.description}
                                            </p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-gray-500">
                                                    📅 {new Date(relatedActivity.activity_date).toLocaleDateString('id-ID')}
                                                </span>
                                                <Link href={`/activities/${relatedActivity.id}`}>
                                                    <Button size="sm" variant="outline">
                                                        Lihat Detail
                                                    </Button>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}