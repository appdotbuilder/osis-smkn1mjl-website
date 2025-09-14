import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';





export default function MemberRegistration() {
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    
    const { data, setData, post, processing, errors } = useForm({
        full_name: '',
        email: '',
        phone: '',
        class: '',
        student_id: '',
        motivation: '',
        preferred_division: '',
        skills: [],
    });

    const availableSkills = [
        'Komunikasi',
        'Organisasi',
        'Kepemimpinan',
        'Public Speaking',
        'Desain Grafis',
        'Fotografi',
        'Videografi',
        'Teknologi',
        'Media Sosial',
        'Event Planning',
        'MC/Presenter',
        'Menulis',
    ];

    const handleSkillToggle = (skill: string) => {
        const updatedSkills = selectedSkills.includes(skill)
            ? selectedSkills.filter(s => s !== skill)
            : [...selectedSkills, skill];
        
        setSelectedSkills(updatedSkills);
        setData('skills', updatedSkills as never);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/join');
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
            <header className="bg-blue-600 text-white py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold mb-4">🤝 Bergabung dengan OSIS</h1>
                    <p className="text-xl text-blue-100">
                        Jadilah bagian dari perubahan positif di SMK Negeri 1 Majalengka
                    </p>
                </div>
            </header>

            <main className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl text-center">Formulir Pendaftaran Anggota OSIS</CardTitle>
                            <p className="text-gray-600 text-center">
                                Isi formulir berikut dengan lengkap dan jujur untuk bergabung dengan OSIS
                            </p>
                        </CardHeader>
                        
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Personal Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                                        👤 Informasi Pribadi
                                    </h3>
                                    
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="full_name">Nama Lengkap *</Label>
                                            <Input
                                                id="full_name"
                                                type="text"
                                                value={data.full_name}
                                                onChange={e => setData('full_name', e.target.value)}
                                                placeholder="Masukkan nama lengkap"
                                                required
                                            />
                                            {errors.full_name && (
                                                <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="student_id">NIS (Nomor Induk Siswa) *</Label>
                                            <Input
                                                id="student_id"
                                                type="text"
                                                value={data.student_id}
                                                onChange={e => setData('student_id', e.target.value)}
                                                placeholder="Masukkan NIS"
                                                required
                                            />
                                            {errors.student_id && (
                                                <p className="text-red-500 text-sm mt-1">{errors.student_id}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="email">Email *</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={data.email}
                                                onChange={e => setData('email', e.target.value)}
                                                placeholder="nama@email.com"
                                                required
                                            />
                                            {errors.email && (
                                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="phone">Nomor Telepon/WhatsApp *</Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                value={data.phone}
                                                onChange={e => setData('phone', e.target.value)}
                                                placeholder="0812-xxxx-xxxx"
                                                required
                                            />
                                            {errors.phone && (
                                                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="class">Kelas *</Label>
                                        <Select onValueChange={(value) => setData('class', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih kelas" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="X RPL 1">X RPL 1</SelectItem>
                                                <SelectItem value="X RPL 2">X RPL 2</SelectItem>
                                                <SelectItem value="X TKJ 1">X TKJ 1</SelectItem>
                                                <SelectItem value="X TKJ 2">X TKJ 2</SelectItem>
                                                <SelectItem value="X MM 1">X MM 1</SelectItem>
                                                <SelectItem value="X MM 2">X MM 2</SelectItem>
                                                <SelectItem value="X TKRO 1">X TKRO 1</SelectItem>
                                                <SelectItem value="X TKRO 2">X TKRO 2</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.class && (
                                            <p className="text-red-500 text-sm mt-1">{errors.class}</p>
                                        )}
                                    </div>
                                </div>

                                {/* OSIS Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                                        🎯 Informasi OSIS
                                    </h3>

                                    <div>
                                        <Label htmlFor="preferred_division">Divisi yang Diminati</Label>
                                        <Select onValueChange={(value) => setData('preferred_division', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih divisi (opsional)" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Akademik">📚 Bidang Akademik</SelectItem>
                                                <SelectItem value="Olahraga">⚽ Bidang Olahraga</SelectItem>
                                                <SelectItem value="Seni">🎨 Bidang Seni dan Budaya</SelectItem>
                                                <SelectItem value="Sosial">🤝 Bidang Sosial dan Kemasyarakatan</SelectItem>
                                                <SelectItem value="Keamanan">🛡️ Bidang Keamanan dan Ketertiban</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label>Keahlian/Skill yang Dimiliki</Label>
                                        <p className="text-sm text-gray-500 mb-3">
                                            Pilih keahlian yang kamu miliki (bisa lebih dari satu)
                                        </p>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                            {availableSkills.map((skill) => (
                                                <label
                                                    key={skill}
                                                    className={`flex items-center space-x-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                                                        selectedSkills.includes(skill)
                                                            ? 'bg-blue-50 border-blue-200 text-blue-900'
                                                            : 'bg-white border-gray-200 hover:bg-gray-50'
                                                    }`}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedSkills.includes(skill)}
                                                        onChange={() => handleSkillToggle(skill)}
                                                        className="sr-only"
                                                    />
                                                    <span className="text-sm">{skill}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="motivation">Motivasi Bergabung dengan OSIS *</Label>
                                        <p className="text-sm text-gray-500 mb-2">
                                            Ceritakan alasan dan motivasi kamu ingin bergabung dengan OSIS (minimal 50 karakter)
                                        </p>
                                        <Textarea
                                            id="motivation"
                                            value={data.motivation}
                                            onChange={e => setData('motivation', e.target.value)}
                                            placeholder="Saya ingin bergabung dengan OSIS karena..."
                                            rows={4}
                                            required
                                        />
                                        <p className="text-xs text-gray-400 mt-1">
                                            {data.motivation.length} karakter
                                        </p>
                                        {errors.motivation && (
                                            <p className="text-red-500 text-sm mt-1">{errors.motivation}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Submission */}
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <h3 className="font-semibold text-blue-900 mb-2">📋 Informasi Seleksi</h3>
                                    <ul className="text-sm text-blue-800 space-y-1">
                                        <li>• Pendaftaran akan diverifikasi oleh pengurus OSIS</li>
                                        <li>• Proses seleksi memakan waktu 2-3 hari kerja</li>
                                        <li>• Hasil seleksi akan dihubungi melalui WhatsApp/Email</li>
                                        <li>• Pastikan data yang diisi sudah benar dan lengkap</li>
                                    </ul>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button 
                                        type="submit" 
                                        disabled={processing}
                                        className="bg-blue-600 hover:bg-blue-700 flex-1"
                                    >
                                        {processing ? 'Mengirim...' : '🚀 Kirim Pendaftaran'}
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
            </main>
        </div>
    );
}