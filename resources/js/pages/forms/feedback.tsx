import React, { useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function FeedbackForm() {
    const { flash } = usePage<{ flash: { success?: string; error?: string } }>().props;
    const [isAnonymous, setIsAnonymous] = useState(false);
    
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        category: '',
        subject: '',
        message: '',
        is_anonymous: 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/feedback');
    };

    const handleAnonymousToggle = () => {
        const newAnonymous = !isAnonymous;
        setIsAnonymous(newAnonymous);
        setData('is_anonymous', newAnonymous ? 1 : 0);
        if (newAnonymous) {
            setData('name', '');
            setData('email', '');
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
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold mb-4">💬 Kirim Feedback</h1>
                    <p className="text-xl text-green-100">
                        Masukan dan saran Anda sangat berharga untuk kemajuan OSIS
                    </p>
                </div>
            </header>

            <main className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Success Message */}
                    {flash?.success && (
                        <Alert className="mb-6 border-green-200 bg-green-50">
                            <AlertDescription className="text-green-800">
                                ✅ {flash.success}
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Form */}
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-2xl text-center">Formulir Feedback</CardTitle>
                                    <p className="text-gray-600 text-center">
                                        Sampaikan kritik, saran, atau apresiasi untuk OSIS
                                    </p>
                                </CardHeader>
                                
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Anonymous Option */}
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <label className="flex items-center space-x-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={isAnonymous}
                                                    onChange={handleAnonymousToggle}
                                                    className="rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                <div>
                                                    <span className="font-medium text-blue-900">🔒 Kirim secara anonim</span>
                                                    <p className="text-sm text-blue-700">
                                                        Identitas Anda akan disembunyikan (nama dan email tidak wajib diisi)
                                                    </p>
                                                </div>
                                            </label>
                                        </div>

                                        {/* Contact Information */}
                                        {!isAnonymous && (
                                            <div className="space-y-4">
                                                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                                                    👤 Informasi Kontak
                                                </h3>
                                                
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div>
                                                        <Label htmlFor="name">Nama Lengkap *</Label>
                                                        <Input
                                                            id="name"
                                                            type="text"
                                                            value={data.name}
                                                            onChange={e => setData('name', e.target.value)}
                                                            placeholder="Masukkan nama lengkap"
                                                            required={!isAnonymous}
                                                        />
                                                        {errors.name && (
                                                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="email">Email</Label>
                                                        <Input
                                                            id="email"
                                                            type="email"
                                                            value={data.email}
                                                            onChange={e => setData('email', e.target.value)}
                                                            placeholder="nama@email.com (opsional)"
                                                        />
                                                        {errors.email && (
                                                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Feedback Details */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                                                💬 Detail Feedback
                                            </h3>

                                            <div>
                                                <Label htmlFor="category">Kategori *</Label>
                                                <Select onValueChange={(value) => setData('category', value)} required>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih kategori feedback" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="suggestion">💡 Saran & Usulan</SelectItem>
                                                        <SelectItem value="complaint">⚠️ Keluhan</SelectItem>
                                                        <SelectItem value="appreciation">👏 Apresiasi</SelectItem>
                                                        <SelectItem value="question">❓ Pertanyaan</SelectItem>
                                                        <SelectItem value="program">📋 Tentang Program Kerja</SelectItem>
                                                        <SelectItem value="event">🎉 Tentang Kegiatan</SelectItem>
                                                        <SelectItem value="other">📝 Lainnya</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                {errors.category && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                                                )}
                                            </div>

                                            <div>
                                                <Label htmlFor="subject">Subjek *</Label>
                                                <Input
                                                    id="subject"
                                                    type="text"
                                                    value={data.subject}
                                                    onChange={e => setData('subject', e.target.value)}
                                                    placeholder="Ringkasan singkat tentang feedback Anda"
                                                    required
                                                />
                                                {errors.subject && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                                                )}
                                            </div>

                                            <div>
                                                <Label htmlFor="message">Pesan *</Label>
                                                <p className="text-sm text-gray-500 mb-2">
                                                    Sampaikan feedback Anda dengan detail (minimal 20 karakter)
                                                </p>
                                                <Textarea
                                                    id="message"
                                                    value={data.message}
                                                    onChange={e => setData('message', e.target.value)}
                                                    placeholder="Tuliskan feedback, saran, atau pertanyaan Anda di sini..."
                                                    rows={5}
                                                    required
                                                />
                                                <p className="text-xs text-gray-400 mt-1">
                                                    {data.message.length} karakter
                                                </p>
                                                {errors.message && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <Button 
                                                type="submit" 
                                                disabled={processing}
                                                className="bg-green-600 hover:bg-green-700 flex-1"
                                            >
                                                {processing ? 'Mengirim...' : '📤 Kirim Feedback'}
                                            </Button>
                                            <Link href="/">
                                                <Button type="button" variant="outline" className="w-full sm:w-auto">
                                                    Batal
                                                </Button>
                                            </Link>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar Info */}
                        <div className="space-y-6">
                            <Card className="bg-green-50 border-green-200">
                                <CardHeader>
                                    <CardTitle className="text-green-900 flex items-center">
                                        📞 Kontak Langsung
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-green-800 text-sm space-y-2">
                                    <p>📧 Email: osis@smkn1majalengka.sch.id</p>
                                    <p>📱 WhatsApp: 0812-xxxx-xxxx</p>
                                    <p>📍 Ruang OSIS SMK N 1 Majalengka</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        💡 Tips Feedback Efektif
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm space-y-2">
                                    <div className="flex items-start space-x-2">
                                        <span>✓</span>
                                        <span>Berikan detail yang jelas dan spesifik</span>
                                    </div>
                                    <div className="flex items-start space-x-2">
                                        <span>✓</span>
                                        <span>Sertakan contoh jika memungkinkan</span>
                                    </div>
                                    <div className="flex items-start space-x-2">
                                        <span>✓</span>
                                        <span>Gunakan bahasa yang sopan dan konstruktif</span>
                                    </div>
                                    <div className="flex items-start space-x-2">
                                        <span>✓</span>
                                        <span>Berikan solusi alternatif jika ada</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-blue-50 border-blue-200">
                                <CardHeader>
                                    <CardTitle className="text-blue-900 flex items-center">
                                        🔒 Privasi & Keamanan
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-blue-800 text-sm space-y-1">
                                    <p>• Data Anda akan dijaga kerahasiaannya</p>
                                    <p>• Feedback anonim tidak menyimpan identitas</p>
                                    <p>• Respon dalam 2-3 hari kerja</p>
                                    <p>• Feedback digunakan untuk perbaikan OSIS</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}