<?php

namespace Database\Seeders;

use App\Models\Announcement;
use App\Models\Activity;
use App\Models\WorkProgram;
use App\Models\OrganizationMember;
use App\Models\Testimonial;
use App\Models\MemberRegistration;
use App\Models\Feedback;
use App\Models\Download;
use Illuminate\Database\Seeder;

class OsisSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create announcements
        Announcement::factory()->count(10)->create();
        Announcement::factory()->featured()->count(3)->create();
        Announcement::factory()->urgent()->count(2)->create();

        // Create activities
        Activity::factory()->count(15)->create();
        Activity::factory()->featured()->count(5)->create();

        // Create work programs
        WorkProgram::factory()->count(12)->create();
        WorkProgram::factory()->completed()->count(5)->create();

        // Create organization members
        $leaders = [
            ['name' => 'Ahmad Rizki', 'position' => 'Ketua OSIS', 'class' => 'XII RPL 1', 'order_position' => 1],
            ['name' => 'Siti Nurhaliza', 'position' => 'Wakil Ketua OSIS', 'class' => 'XII TKJ 2', 'order_position' => 2],
            ['name' => 'Budi Santoso', 'position' => 'Sekretaris', 'class' => 'XI MM 1', 'order_position' => 3],
            ['name' => 'Dewi Lestari', 'position' => 'Bendahara', 'class' => 'XI RPL 2', 'order_position' => 4],
            ['name' => 'Andi Wijaya', 'position' => 'Koordinator Bidang Akademik', 'class' => 'XII TKJ 1', 'order_position' => 5],
            ['name' => 'Maya Sari', 'position' => 'Koordinator Bidang Olahraga', 'class' => 'XI TKRO 1', 'order_position' => 6],
            ['name' => 'Reza Pratama', 'position' => 'Koordinator Bidang Seni', 'class' => 'XII MM 2', 'order_position' => 7],
            ['name' => 'Lisa Permata', 'position' => 'Koordinator Bidang Sosial', 'class' => 'XI RPL 1', 'order_position' => 8],
        ];

        foreach ($leaders as $leader) {
            OrganizationMember::factory()->create([
                ...$leader,
                'period' => '2024/2025',
                'bio' => fake()->paragraph(),
                'is_active' => true,
            ]);
        }

        // Create additional members
        OrganizationMember::factory()->count(10)->create([
            'period' => '2024/2025',
            'position' => 'Anggota',
            'order_position' => fake()->numberBetween(9, 20),
        ]);

        // Create testimonials
        $testimonials = [
            [
                'name' => 'Dr. Hendra Gunawan, S.Pd., M.Pd.',
                'role' => 'Kepala SMK Negeri 1 Majalengka',
                'content' => 'OSIS SMK Negeri 1 Majalengka telah menunjukkan dedikasi yang luar biasa dalam mengembangkan potensi siswa. Mereka berhasil menciptakan berbagai program inovatif yang tidak hanya mengembangkan kepemimpinan, tetapi juga membangun karakter siswa yang bertanggung jawab.',
                'rating' => 5,
                'is_featured' => true,
            ],
            [
                'name' => 'Fajar Ramadhan',
                'role' => 'Alumni OSIS 2023',
                'content' => 'Bergabung dengan OSIS adalah keputusan terbaik selama masa sekolah. Saya belajar banyak tentang kepemimpinan, organisasi, dan kerja tim. Pengalaman ini sangat membantu saya di perguruan tinggi.',
                'rating' => 5,
                'is_featured' => true,
            ],
            [
                'name' => 'Indah Permatasari',
                'role' => 'Alumni OSIS 2022',
                'content' => 'OSIS mengajarkan saya untuk berani mengambil inisiatif dan bertanggung jawab. Program-program yang kami jalankan memberikan dampak positif bagi sekolah dan teman-teman.',
                'rating' => 5,
                'is_featured' => true,
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::factory()->create($testimonial);
        }

        Testimonial::factory()->count(8)->create();

        // Create member registrations
        MemberRegistration::factory()->count(20)->create();
        MemberRegistration::factory()->pending()->count(5)->create();

        // Create feedback
        Feedback::factory()->count(15)->create();
        Feedback::factory()->unread()->count(8)->create();

        // Create downloads
        $downloads = [
            [
                'title' => 'Formulir Pendaftaran Anggota OSIS 2024/2025',
                'description' => 'Form pendaftaran untuk calon anggota OSIS periode 2024/2025',
                'category' => 'forms',
                'file_type' => 'pdf',
                'file_size' => '2.1 MB',
            ],
            [
                'title' => 'Panduan Kegiatan OSIS',
                'description' => 'Panduan lengkap untuk pelaksanaan kegiatan OSIS',
                'category' => 'brochures',
                'file_type' => 'pdf',
                'file_size' => '5.2 MB',
            ],
            [
                'title' => 'Laporan Kegiatan OSIS Semester 1',
                'description' => 'Laporan komprehensif kegiatan OSIS semester 1 tahun ajaran 2024/2025',
                'category' => 'reports',
                'file_type' => 'pdf',
                'file_size' => '8.7 MB',
            ],
        ];

        foreach ($downloads as $download) {
            Download::factory()->create([
                ...$download,
                'file_path' => 'downloads/' . fake()->slug() . '.' . $download['file_type'],
            ]);
        }

        Download::factory()->count(10)->create();
    }
}