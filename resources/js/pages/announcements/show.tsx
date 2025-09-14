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
    published_at: string;
    is_featured: boolean;
    image_path?: string;
}

interface Props {
    announcement: Announcement;
    relatedAnnouncements: Announcement[];
    [key: string]: unknown;
}

export default function AnnouncementShow({ announcement, relatedAnnouncements }: Props) {
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
                        <div className="flex items-center space-x-4">
                            <Link href="/announcements">
                                <Button variant="ghost">← Semua Pengumuman</Button>
                            </Link>
                            <Link href="/">
                                <Button variant="ghost">Beranda</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex text-sm text-gray-500">
                        <Link href="/" className="hover:text-gray-700">Beranda</Link>
                        <span className="mx-2">›</span>
                        <Link href="/announcements" className="hover:text-gray-700">Pengumuman</Link>
                        <span className="mx-2">›</span>
                        <span className="text-gray-900">Detail</span>
                    </nav>
                </div>
            </div>

            <main className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Article Header */}
                    <header className="mb-8">
                        <div className="flex flex-wrap gap-2 mb-4">
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
                        
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {announcement.title}
                        </h1>
                        
                        <div className="flex items-center text-gray-500">
                            <span className="text-sm">
                                📅 Dipublikasikan pada {new Date(announcement.published_at).toLocaleDateString('id-ID', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>
                    </header>

                    {/* Article Image */}
                    {announcement.image_path && (
                        <div className="mb-8">
                            <img 
                                src={announcement.image_path} 
                                alt={announcement.title}
                                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-md"
                            />
                        </div>
                    )}

                    {/* Article Content */}
                    <article className="prose max-w-none mb-12">
                        <div className="bg-white rounded-lg p-8 shadow-sm border">
                            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-lg">
                                {announcement.content}
                            </div>
                        </div>
                    </article>

                    {/* Share Actions */}
                    <div className="bg-gray-100 rounded-lg p-6 mb-12">
                        <h3 className="font-semibold text-gray-900 mb-4">📢 Bagikan Pengumuman Ini</h3>
                        <div className="flex flex-wrap gap-3">
                            <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                    const url = window.location.href;
                                    const text = `${announcement.title} - OSIS SMK N 1 Majalengka`;
                                    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + '\n' + url)}`;
                                    window.open(whatsappUrl, '_blank');
                                }}
                            >
                                📱 WhatsApp
                            </Button>
                            <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                    alert('Link berhasil disalin!');
                                }}
                            >
                                🔗 Salin Link
                            </Button>
                        </div>
                    </div>

                    {/* Related Announcements */}
                    {relatedAnnouncements.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                📰 Pengumuman Terkait
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {relatedAnnouncements.map((related) => (
                                    <Card key={related.id} className="hover:shadow-lg transition-shadow">
                                        <CardHeader>
                                            <Badge 
                                                variant={related.type === 'urgent' ? 'destructive' : 'default'}
                                                className={`w-fit ${related.type === 'event' ? 'bg-purple-100 text-purple-800' : ''}`}
                                            >
                                                {related.type === 'urgent' && '⚠️ Penting'}
                                                {related.type === 'general' && '📝 Umum'}
                                                {related.type === 'event' && '🎉 Event'}
                                            </Badge>
                                            <CardTitle className="text-lg">{related.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                                {related.content}
                                            </p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-500">
                                                    {new Date(related.published_at).toLocaleDateString('id-ID')}
                                                </span>
                                                <Link href={`/announcements/${related.id}`}>
                                                    <Button size="sm" variant="outline">
                                                        Baca
                                                    </Button>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Back to List */}
                    <div className="text-center mt-12">
                        <Link href="/announcements">
                            <Button>
                                ← Kembali ke Semua Pengumuman
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}