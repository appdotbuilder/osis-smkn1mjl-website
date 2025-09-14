import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface ContactInfo {
    school_name: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    osis_email: string;
    social_media: {
        instagram: string;
        youtube: string;
        facebook: string;
        tiktok: string;
    };
    coordinates: {
        lat: number;
        lng: number;
    };
}

interface Props {
    contactInfo: ContactInfo;
    [key: string]: unknown;
}

export default function ContactIndex({ contactInfo }: Props) {
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
            <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold mb-4">📞 Hubungi Kami</h1>
                    <p className="text-xl text-blue-100">
                        Temukan informasi kontak dan lokasi OSIS SMK Negeri 1 Majalengka
                    </p>
                </div>
            </header>

            <main className="py-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Contact Information */}
                        <div className="space-y-6">
                            {/* School Info */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        🏫 Informasi Sekolah
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{contactInfo.school_name}</h3>
                                    </div>
                                    
                                    <Separator />
                                    
                                    <div className="space-y-3">
                                        <div className="flex items-start">
                                            <span className="flex-shrink-0 mr-3 text-lg">📍</span>
                                            <div>
                                                <p className="font-medium">Alamat</p>
                                                <p className="text-gray-600">{contactInfo.address}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center">
                                            <span className="flex-shrink-0 mr-3 text-lg">📞</span>
                                            <div>
                                                <p className="font-medium">Telepon</p>
                                                <a 
                                                    href={`tel:${contactInfo.phone}`}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    {contactInfo.phone}
                                                </a>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center">
                                            <span className="flex-shrink-0 mr-3 text-lg">📧</span>
                                            <div>
                                                <p className="font-medium">Email Sekolah</p>
                                                <a 
                                                    href={`mailto:${contactInfo.email}`}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    {contactInfo.email}
                                                </a>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center">
                                            <span className="flex-shrink-0 mr-3 text-lg">🌐</span>
                                            <div>
                                                <p className="font-medium">Website</p>
                                                <a 
                                                    href={contactInfo.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    {contactInfo.website}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* OSIS Contact */}
                            <Card className="bg-blue-50 border-blue-200">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-blue-900">
                                        👥 Kontak OSIS
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-center">
                                        <span className="flex-shrink-0 mr-3 text-lg">📧</span>
                                        <div>
                                            <p className="font-medium text-blue-900">Email OSIS</p>
                                            <a 
                                                href={`mailto:${contactInfo.osis_email}`}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                {contactInfo.osis_email}
                                            </a>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center">
                                        <span className="flex-shrink-0 mr-3 text-lg">📍</span>
                                        <div>
                                            <p className="font-medium text-blue-900">Ruang OSIS</p>
                                            <p className="text-blue-700">Lantai 2, Gedung Utama SMK N 1 Majalengka</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center">
                                        <span className="flex-shrink-0 mr-3 text-lg">⏰</span>
                                        <div>
                                            <p className="font-medium text-blue-900">Jam Operasional</p>
                                            <p className="text-blue-700">Senin - Jumat: 07:00 - 16:00 WIB</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Social Media */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        📱 Media Sosial
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-4">
                                        <a 
                                            href={contactInfo.social_media.instagram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center p-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow"
                                        >
                                            <span className="mr-2">📷</span>
                                            <span className="font-medium">Instagram</span>
                                        </a>
                                        
                                        <a 
                                            href={contactInfo.social_media.youtube}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center p-3 bg-red-600 text-white rounded-lg hover:shadow-lg transition-shadow"
                                        >
                                            <span className="mr-2">📹</span>
                                            <span className="font-medium">YouTube</span>
                                        </a>
                                        
                                        <a 
                                            href={contactInfo.social_media.facebook}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center p-3 bg-blue-600 text-white rounded-lg hover:shadow-lg transition-shadow"
                                        >
                                            <span className="mr-2">👥</span>
                                            <span className="font-medium">Facebook</span>
                                        </a>
                                        
                                        <a 
                                            href={contactInfo.social_media.tiktok}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center p-3 bg-gray-900 text-white rounded-lg hover:shadow-lg transition-shadow"
                                        >
                                            <span className="mr-2">🎵</span>
                                            <span className="font-medium">TikTok</span>
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Map and Quick Actions */}
                        <div className="space-y-6">
                            {/* Map Placeholder */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        🗺️ Lokasi Sekolah
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-4xl mb-2">🗺️</div>
                                            <p className="text-gray-600 mb-4">Peta Lokasi Sekolah</p>
                                            <div className="text-sm text-gray-500">
                                                <p>Koordinat: {contactInfo.coordinates.lat}, {contactInfo.coordinates.lng}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        <Button 
                                            size="sm" 
                                            variant="outline" 
                                            className="flex-1"
                                            onClick={() => window.open(
                                                `https://maps.google.com/?q=${contactInfo.coordinates.lat},${contactInfo.coordinates.lng}`,
                                                '_blank'
                                            )}
                                        >
                                            📍 Buka di Google Maps
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Quick Actions */}
                            <Card className="bg-green-50 border-green-200">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-green-900">
                                        🚀 Hubungi Kami Sekarang
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Link href="/feedback">
                                        <Button className="w-full bg-green-600 hover:bg-green-700">
                                            💬 Kirim Pesan
                                        </Button>
                                    </Link>
                                    
                                    <a 
                                        href={`mailto:${contactInfo.osis_email}?subject=Pertanyaan tentang OSIS`}
                                        className="block"
                                    >
                                        <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                                            📧 Email Langsung
                                        </Button>
                                    </a>
                                    
                                    <Link href="/join">
                                        <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                                            🤝 Bergabung OSIS
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>

                            {/* Office Hours */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        🕒 Jam Operasional
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="font-medium">Senin - Jumat</span>
                                            <span className="text-green-600">07:00 - 16:00 WIB</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium">Sabtu</span>
                                            <span className="text-orange-600">07:00 - 12:00 WIB</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium">Minggu</span>
                                            <span className="text-red-600">Tutup</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                        <p className="text-blue-800 text-sm">
                                            💡 <strong>Tips:</strong> Untuk pertemuan langsung, sebaiknya hubungi kami terlebih dahulu untuk memastikan ketersediaan pengurus.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="mt-12 bg-purple-50 rounded-lg p-8 text-center">
                        <h2 className="text-2xl font-bold text-purple-900 mb-4">
                            ❓ Ada Pertanyaan Lain?
                        </h2>
                        <p className="text-purple-700 mb-6">
                            Lihat halaman FAQ untuk menemukan jawaban atas pertanyaan yang sering ditanyakan.
                        </p>
                        <Link href="/faq">
                            <Button className="bg-purple-600 hover:bg-purple-700">
                                📋 Lihat FAQ
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}