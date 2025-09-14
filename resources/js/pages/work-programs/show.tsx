import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface WorkProgram {
    id: number;
    title: string;
    description: string;
    category: string;
    status: string;
    academic_year: string;
    start_date: string;
    end_date?: string;
    objectives: string[];
    activities: string[];
    target_participants: string;
    budget: number;
    responsible_division: string;
    is_featured: boolean;
}

interface Props {
    program: WorkProgram;
    relatedPrograms: WorkProgram[];
    [key: string]: unknown;
}

export default function WorkProgramShow({ program, relatedPrograms }: Props) {
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
            case 'ongoing': return '🔄 Sedang Berjalan';
            case 'planned': return '📅 Direncanakan';
            case 'completed': return '✅ Selesai';
            default: return status;
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(amount);
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
                            <Link href="/work-programs">
                                <Button variant="ghost" size="sm">← Kembali ke Program Kerja</Button>
                            </Link>
                            <Link href="/">
                                <Button variant="outline" size="sm">Beranda</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Header */}
            <header className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center space-x-4 mb-4">
                        <Badge className="bg-white/20 text-white">
                            {getCategoryIcon(program.category)} {getCategoryName(program.category)}
                        </Badge>
                        <Badge className={`${getStatusBadgeColor(program.status)} border-0`}>
                            {getStatusName(program.status)}
                        </Badge>
                        {program.is_featured && (
                            <Badge className="bg-yellow-500 text-yellow-900">
                                ⭐ Program Unggulan
                            </Badge>
                        )}
                    </div>
                    <h1 className="text-4xl font-bold mb-4">{program.title}</h1>
                    <div className="flex items-center space-x-6 text-purple-100">
                        <span>📅 Tahun: {program.academic_year}</span>
                        <span>🏢 Divisi: {program.responsible_division}</span>
                        {program.target_participants && (
                            <span>👥 Target: {program.target_participants}</span>
                        )}
                    </div>
                </div>
            </header>

            <main className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Description */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        📝 Deskripsi Program
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                        {program.description}
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Objectives */}
                            {program.objectives && program.objectives.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            🎯 Tujuan Program
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-3">
                                            {program.objectives.map((objective, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                                                        {index + 1}
                                                    </span>
                                                    <span className="text-gray-700">{objective}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Activities */}
                            {program.activities && program.activities.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            🎪 Kegiatan yang Dilaksanakan
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {program.activities.map((activity, index) => (
                                                <div key={index} className="flex items-center p-3 bg-purple-50 rounded-lg">
                                                    <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-3">
                                                        ✓
                                                    </span>
                                                    <span className="text-gray-800">{activity}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Program Info */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">📊 Informasi Program</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Status</label>
                                        <div className="mt-1">
                                            <Badge className={getStatusBadgeColor(program.status)}>
                                                {getStatusName(program.status)}
                                            </Badge>
                                        </div>
                                    </div>
                                    
                                    <Separator />
                                    
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Tanggal Mulai</label>
                                        <p className="mt-1 text-gray-900">
                                            📅 {new Date(program.start_date).toLocaleDateString('id-ID', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    
                                    {program.end_date && (
                                        <>
                                            <Separator />
                                            <div>
                                                <label className="text-sm font-medium text-gray-500">Tanggal Selesai</label>
                                                <p className="mt-1 text-gray-900">
                                                    🏁 {new Date(program.end_date).toLocaleDateString('id-ID', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                        </>
                                    )}
                                    
                                    <Separator />
                                    
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Divisi Penanggung Jawab</label>
                                        <p className="mt-1 text-gray-900">🏢 {program.responsible_division}</p>
                                    </div>
                                    
                                    {program.target_participants && (
                                        <>
                                            <Separator />
                                            <div>
                                                <label className="text-sm font-medium text-gray-500">Target Peserta</label>
                                                <p className="mt-1 text-gray-900">👥 {program.target_participants}</p>
                                            </div>
                                        </>
                                    )}
                                    
                                    {program.budget > 0 && (
                                        <>
                                            <Separator />
                                            <div>
                                                <label className="text-sm font-medium text-gray-500">Anggaran</label>
                                                <p className="mt-1 text-gray-900 font-medium">💰 {formatCurrency(program.budget)}</p>
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
                                        <Button className="w-full bg-purple-600 hover:bg-purple-700">
                                            🤝 Bergabung OSIS
                                        </Button>
                                    </Link>
                                    <Link href="/feedback">
                                        <Button variant="outline" className="w-full">
                                            💬 Berikan Feedback
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Related Programs */}
                    {relatedPrograms.length > 0 && (
                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                🔗 Program Kerja Terkait
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {relatedPrograms.map((relatedProgram) => (
                                    <Card key={relatedProgram.id} className="hover:shadow-lg transition-shadow">
                                        <CardHeader>
                                            <Badge variant="secondary" className="w-fit mb-2">
                                                {getCategoryIcon(relatedProgram.category)} {getCategoryName(relatedProgram.category)}
                                            </Badge>
                                            <CardTitle className="text-lg">{relatedProgram.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                {relatedProgram.description}
                                            </p>
                                            <div className="flex justify-between items-center">
                                                <Badge className={getStatusBadgeColor(relatedProgram.status)}>
                                                    {getStatusName(relatedProgram.status)}
                                                </Badge>
                                                <Link href={`/work-programs/${relatedProgram.id}`}>
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