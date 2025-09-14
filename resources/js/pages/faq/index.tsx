import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';



export default function FaqIndex() {
    const faqs = [
        {
            question: "Apa itu OSIS?",
            answer: "OSIS (Organisasi Siswa Intra Sekolah) adalah organisasi siswa yang ada di tingkat sekolah di Indonesia. OSIS merupakan wadah untuk mengembangkan kemampuan kepemimpinan, organisasi, dan berpartisipasi dalam kegiatan sekolah."
        },
        {
            question: "Bagaimana cara bergabung dengan OSIS?",
            answer: "Untuk bergabung dengan OSIS, kamu bisa mengisi formulir pendaftaran yang tersedia di website ini atau mendatangi ruang OSIS di sekolah. Pendaftaran biasanya dibuka di awal tahun ajaran atau saat ada lowongan."
        },
        {
            question: "Apa saja kegiatan OSIS?",
            answer: "OSIS menyelenggarakan berbagai kegiatan seperti upacara bendera, kegiatan MPLS, perayaan hari besar, turnamen olahraga, festival seni, bakti sosial, dan masih banyak lagi."
        },
        {
            question: "Apa manfaat bergabung dengan OSIS?",
            answer: "Bergabung dengan OSIS dapat mengembangkan kemampuan leadership, public speaking, manajemen waktu, networking, dan pengalaman organisasi yang akan berguna untuk masa depan."
        },
        {
            question: "Berapa lama masa jabatan pengurus OSIS?",
            answer: "Masa jabatan pengurus OSIS biasanya selama 1 tahun, dari periode tahun ajaran baru hingga pemilihan pengurus berikutnya."
        },
        {
            question: "Bagaimana cara mengusulkan kegiatan atau program baru?",
            answer: "Kamu bisa mengusulkan kegiatan melalui form feedback di website ini atau langsung menyampaikan usulan ke pengurus OSIS melalui kontak yang tersedia."
        },
        {
            question: "Apakah ada persyaratan khusus untuk menjadi pengurus OSIS?",
            answer: "Persyaratan umum biasanya meliputi: siswa aktif kelas X atau XI, memiliki prestasi akademik yang baik, tidak pernah melanggar tata tertib sekolah, dan memiliki kemampuan komunikasi yang baik."
        },
        {
            question: "Bagaimana cara mendapatkan informasi terbaru tentang OSIS?",
            answer: "Kamu bisa mengikuti media sosial OSIS, mengunjungi website ini secara berkala, atau bergabung dengan grup WhatsApp/Telegram OSIS jika ada."
        }
    ];

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
            <header className="bg-purple-600 text-white py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold mb-4">❓ Frequently Asked Questions</h1>
                    <p className="text-xl text-purple-100">
                        Pertanyaan yang sering ditanyakan tentang OSIS SMK Negeri 1 Majalengka
                    </p>
                </div>
            </header>

            <main className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <Card key={index} className="hover:shadow-md transition-shadow">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-start">
                                        <span className="text-purple-600 mr-3">Q{index + 1}.</span>
                                        {faq.question}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-start">
                                        <span className="text-green-600 mr-3 font-semibold">A:</span>
                                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Still have questions section */}
                    <div className="bg-purple-50 rounded-lg p-8 text-center mt-12">
                        <h2 className="text-2xl font-bold text-purple-900 mb-4">
                            🤔 Masih ada pertanyaan?
                        </h2>
                        <p className="text-purple-700 mb-6">
                            Jangan ragu untuk menghubungi kami jika ada hal yang ingin ditanyakan lebih lanjut.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/feedback">
                                <Button className="bg-purple-600 hover:bg-purple-700">
                                    💬 Kirim Pertanyaan
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
                                    📞 Hubungi Kami
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}