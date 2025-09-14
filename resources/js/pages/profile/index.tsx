import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';


interface OrganizationMember {
    id: number;
    name: string;
    position: string;
    class: string;
    division: string;
    photo?: string;
    responsibilities: string[];
}

interface Props {
    organizationMembers?: OrganizationMember[];
    [key: string]: unknown;
}

export default function ProfileIndex({ organizationMembers = [] }: Props) {
    // Mock data for OSIS structure if not provided
    const mockMembers: OrganizationMember[] = [
        {
            id: 1,
            name: "Ahmad Rizki Pratama",
            position: "Ketua OSIS",
            class: "XII RPL 1",
            division: "Presidium",
            responsibilities: ["Memimpin organisasi", "Koordinasi antar divisi", "Representasi sekolah"]
        },
        {
            id: 2,
            name: "Siti Nurhaliza",
            position: "Wakil Ketua OSIS",
            class: "XII TKJ 2",
            division: "Presidium",
            responsibilities: ["Membantu tugas ketua", "Koordinasi kegiatan", "Supervisi divisi"]
        },
        {
            id: 3,
            name: "Muhammad Fajar",
            position: "Sekretaris",
            class: "XI RPL 2",
            division: "Sekretariat",
            responsibilities: ["Administrasi organisasi", "Dokumentasi rapat", "Surat menyurat"]
        },
        {
            id: 4,
            name: "Dewi Lestari",
            position: "Bendahara",
            class: "XI MM 1",
            division: "Sekretariat",
            responsibilities: ["Mengelola keuangan", "Laporan keuangan", "Anggaran kegiatan"]
        },
        {
            id: 5,
            name: "Andi Setiawan",
            position: "Kepala Bidang Akademik",
            class: "XII TKJ 1",
            division: "Akademik",
            responsibilities: ["Program literasi", "Olimpiade siswa", "Bimbingan belajar"]
        },
        {
            id: 6,
            name: "Maya Sari",
            position: "Kepala Bidang Seni & Budaya",
            class: "XI MM 2",
            division: "Seni & Budaya",
            responsibilities: ["Festival seni", "Pertunjukan budaya", "Kreativitas siswa"]
        }
    ];

    const members = organizationMembers.length > 0 ? organizationMembers : mockMembers;

    const visionMission = {
        vision: "Menjadi organisasi siswa yang unggul, berintegritas, dan berkontribusi positif dalam membangun karakter generasi muda yang beriman, bertakwa, dan berprestasi.",
        missions: [
            "Mengembangkan potensi kepemimpinan dan kewirausahaan siswa",
            "Menyalurkan aspirasi dan kreativitas siswa melalui berbagai kegiatan positif",
            "Membangun karakter siswa yang beriman, bertakwa, dan berakhlak mulia",
            "Meningkatkan prestasi akademik dan non-akademik siswa",
            "Mempererat tali persaudaraan antar siswa dan warga sekolah",
            "Mengembangkan jiwa nasionalisme dan patriotisme"
        ]
    };

    const achievements = [
        { year: "2024", achievement: "Juara 1 Kompetisi OSIS Tingkat Kabupaten" },
        { year: "2023", achievement: "Penghargaan Sekolah Adiwiyata Tingkat Provinsi" },
        { year: "2023", achievement: "Juara 2 Festival Seni Budaya Pelajar" },
        { year: "2022", achievement: "Sekolah Terbaik Program Gerakan Literasi" }
    ];

    const getPositionColor = (position: string) => {
        if (position.includes('Ketua')) return 'bg-blue-100 text-blue-800';
        if (position.includes('Sekretaris')) return 'bg-green-100 text-green-800';
        if (position.includes('Bendahara')) return 'bg-yellow-100 text-yellow-800';
        if (position.includes('Kepala')) return 'bg-purple-100 text-purple-800';
        return 'bg-gray-100 text-gray-800';
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
            <header className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold mb-4">👥 Profil OSIS</h1>
                    <p className="text-xl text-indigo-100">
                        Organisasi Siswa Intra Sekolah SMK Negeri 1 Majalengka Periode 2024/2025
                    </p>
                </div>
            </header>

            <main className="py-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Vision & Mission */}
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <Card className="bg-blue-50 border-blue-200">
                            <CardHeader>
                                <CardTitle className="flex items-center text-blue-900">
                                    🎯 Visi
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-blue-800 leading-relaxed">
                                    {visionMission.vision}
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-green-50 border-green-200">
                            <CardHeader>
                                <CardTitle className="flex items-center text-green-900">
                                    🚀 Misi
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {visionMission.missions.map((mission, index) => (
                                        <li key={index} className="flex items-start text-green-800">
                                            <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                                                {index + 1}
                                            </span>
                                            <span className="text-sm">{mission}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Organization Structure */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                            🏛️ Struktur Organisasi Periode 2024/2025
                        </h2>
                        
                        {/* Presidium */}
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Presidium</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {members.filter(m => m.division === 'Presidium').map((member) => (
                                    <Card key={member.id} className="hover:shadow-lg transition-shadow">
                                        <CardContent className="p-6 text-center">
                                            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                                <span className="text-2xl text-white">👑</span>
                                            </div>
                                            <h4 className="font-bold text-lg text-gray-900 mb-1">{member.name}</h4>
                                            <Badge className={`${getPositionColor(member.position)} mb-2`}>
                                                {member.position}
                                            </Badge>
                                            <p className="text-gray-600 text-sm mb-3">{member.class}</p>
                                            <div className="space-y-1">
                                                {member.responsibilities.map((resp, idx) => (
                                                    <p key={idx} className="text-xs text-gray-500">• {resp}</p>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Sekretariat */}
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Sekretariat</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {members.filter(m => m.division === 'Sekretariat').map((member) => (
                                    <Card key={member.id} className="hover:shadow-lg transition-shadow">
                                        <CardContent className="p-6 text-center">
                                            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                                <span className="text-2xl text-white">
                                                    {member.position.includes('Sekretaris') ? '📝' : '💰'}
                                                </span>
                                            </div>
                                            <h4 className="font-bold text-lg text-gray-900 mb-1">{member.name}</h4>
                                            <Badge className={`${getPositionColor(member.position)} mb-2`}>
                                                {member.position}
                                            </Badge>
                                            <p className="text-gray-600 text-sm mb-3">{member.class}</p>
                                            <div className="space-y-1">
                                                {member.responsibilities.map((resp, idx) => (
                                                    <p key={idx} className="text-xs text-gray-500">• {resp}</p>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Kepala Bidang */}
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Kepala Bidang</h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {members.filter(m => m.position.includes('Kepala')).map((member) => (
                                    <Card key={member.id} className="hover:shadow-lg transition-shadow">
                                        <CardContent className="p-6 text-center">
                                            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                                <span className="text-2xl text-white">
                                                    {member.division === 'Akademik' && '📚'}
                                                    {member.division === 'Seni & Budaya' && '🎨'}
                                                    {!['Akademik', 'Seni & Budaya'].includes(member.division) && '⚡'}
                                                </span>
                                            </div>
                                            <h4 className="font-bold text-lg text-gray-900 mb-1">{member.name}</h4>
                                            <Badge className={`${getPositionColor(member.position)} mb-2`}>
                                                {member.position}
                                            </Badge>
                                            <p className="text-gray-600 text-sm mb-3">{member.class}</p>
                                            <div className="space-y-1">
                                                {member.responsibilities.map((resp, idx) => (
                                                    <p key={idx} className="text-xs text-gray-500">• {resp}</p>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Achievements */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                            🏆 Pencapaian & Prestasi
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {achievements.map((achievement, index) => (
                                <Card key={index} className="bg-yellow-50 border-yellow-200 hover:shadow-lg transition-shadow">
                                    <CardContent className="p-6 flex items-center">
                                        <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-4">
                                            <span className="text-white font-bold">{achievement.year}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-yellow-900 mb-1">
                                                🏆 {achievement.achievement}
                                            </h4>
                                            <p className="text-yellow-700 text-sm">Tahun {achievement.year}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Values & Programs */}
                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        <Card className="bg-indigo-50 border-indigo-200">
                            <CardHeader>
                                <CardTitle className="flex items-center text-indigo-900">
                                    💎 Nilai-Nilai OSIS
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-indigo-800 space-y-2">
                                <div className="flex items-center">
                                    <span className="mr-2">🤝</span>
                                    <span className="font-medium">Integritas</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="mr-2">👑</span>
                                    <span className="font-medium">Kepemimpinan</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="mr-2">🎯</span>
                                    <span className="font-medium">Profesionalisme</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="mr-2">💡</span>
                                    <span className="font-medium">Inovasi</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="mr-2">❤️</span>
                                    <span className="font-medium">Empati</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-green-50 border-green-200">
                            <CardHeader>
                                <CardTitle className="flex items-center text-green-900">
                                    📋 Program Unggulan
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-green-800 space-y-2 text-sm">
                                <p>• Program Literasi Digital</p>
                                <p>• Festival Seni & Budaya</p>
                                <p>• Bakti Sosial Rutin</p>
                                <p>• Leadership Training</p>
                                <p>• Olimpiade Akademik</p>
                                <p>• Green School Movement</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-orange-50 border-orange-200">
                            <CardHeader>
                                <CardTitle className="flex items-center text-orange-900">
                                    🎯 Target 2024/2025
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-orange-800 space-y-2 text-sm">
                                <p>• 50+ kegiatan positif</p>
                                <p>• 100% partisipasi siswa</p>
                                <p>• 5 prestasi tingkat kabupaten</p>
                                <p>• Digitalisasi administrasi</p>
                                <p>• Kerjasama 10 instansi</p>
                                <p>• Program sustainability</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Call to Action */}
                    <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-lg p-8 text-white text-center">
                        <h2 className="text-2xl font-bold mb-4">
                            🚀 Bergabunglah dengan Kami!
                        </h2>
                        <p className="text-indigo-100 mb-6">
                            Jadilah bagian dari perubahan positif dan kembangkan potensi kepemimpinanmu bersama OSIS SMK Negeri 1 Majalengka.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/join">
                                <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50">
                                    📝 Daftar Jadi Anggota
                                </Button>
                            </Link>
                            <Link href="/feedback">
                                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-600">
                                    💬 Berikan Masukan
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}