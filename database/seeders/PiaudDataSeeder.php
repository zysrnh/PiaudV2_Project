<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\SiteSetting;
use App\Models\Lecturer;
use App\Models\Category;
use App\Models\Article;
use App\Models\GalleryCategory;
use App\Models\Gallery;

class PiaudDataSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Akun Developer (Akses Penuh + Terminal)
        User::updateOrCreate(
            ['email' => 'dev@piaud.iaipibandung.ac.id'],
            [
                'name' => 'Admin Developer',
                'password' => Hash::make('DevPersis2026!'),
                'role' => 'dev',
            ]
        );

        // Akun Admin Biasa (Pengelola Konten Tanpa Akses Terminal)
        User::updateOrCreate(
            ['email' => 'admin@piaud.iaipibandung.ac.id'],
            [
                'name' => 'Admin Konten',
                'password' => Hash::make('PiaudPersis2026!'),
                'role' => 'admin',
            ]
        );

        // 2. Site Settings
        $settings = [
            'institution_name' => 'IAI Persis Bandung',
            'faculty_name' => 'Fakultas Tarbiyah',
            'program_name' => 'Pendidikan Islam Anak Usia Dini (PIAUD)',
            'program_degree' => 'Jenjang Sarjana (S1)',
            'phone' => '(022) 8752-1234',
            'whatsapp_number' => '6281220005678',
            'email' => 'piaud@iaipibandung.ac.id',
            'campus_address' => 'Jl. Ciganitri No. 2, Cipagalo, Kec. Bojongsoang, Kabupaten Bandung, Jawa Barat 40287',
            'office_hours' => 'Senin – Jumat, 08.00 – 16.00 WIB',
            'accreditation_status' => 'Terakreditasi Baik',
            'accreditation_institution' => 'LAMDIK',
            'accreditation_valid_until' => '2027',
            'footer_cta_title' => 'Siap Menjadi Pendidik Generasi Emas yang Berkarakter Islami?',
            'footer_cta_description' => 'Konsultasikan persyaratan pendaftaran, konversi nilai guru mengajar, serta jadwal perkuliahan reguler dan kelas karyawan dengan tim prodi.',
            'footer_copyright' => 'Program Studi S1 PIAUD IAI Persis Bandung. Hak Cipta Dilindungi Undang-Undang.',
        ];

        foreach ($settings as $key => $value) {
            SiteSetting::updateOrCreate(['key' => $key], ['value' => $value, 'group' => 'general']);
        }

        // 3. Lecturers
        $lecturers = [
            [
                'name' => 'Dra. Hj. Siti Komariah, M.Pd.',
                'nip' => '196805121994032001',
                'role' => 'Ketua Program Studi',
                'expertise' => 'Manajemen PAUD & Pengembangan Kurikulum RA Berbasis Fitrah',
                'photo_url' => '/images/piaud/kaprodi.jpg',
                'order' => 1,
            ],
            [
                'name' => 'Dr. H. Wildan Hasan, M.Pd.I.',
                'nip' => '197608142006041003',
                'role' => 'Dosen Senior / Pakar Tarbiyah',
                'expertise' => 'Filsafat Pendidikan Islam & Kebijakan Kurikulum',
                'photo_url' => '/images/piaud/team-1.jpg',
                'order' => 2,
            ],
            [
                'name' => 'Ahmad Fauzi, M.Pd.',
                'nip' => '197203152002121002',
                'role' => 'Dosen Senior',
                'expertise' => 'Pendidikan Karakter & Pemikiran Jam\'iyyah Persis',
                'photo_url' => '/images/piaud/team-2.jpg',
                'order' => 3,
            ],
            [
                'name' => 'Dian Permana, M.Pd.',
                'nip' => '198807212019031008',
                'role' => 'Dosen Keahlian Khusus',
                'expertise' => 'Media Pembelajaran Digital & Storytelling AUD',
                'photo_url' => '/images/piaud/team-3.jpg',
                'order' => 4,
            ],
            [
                'name' => 'Fitri Nurhayati, M.Pd.',
                'nip' => '199104102021042011',
                'role' => 'Dosen Keahlian Khusus',
                'expertise' => 'Manajemen PAUD Inklusif & Supervisi Kelas',
                'photo_url' => '/images/piaud/team-4.jpg',
                'order' => 5,
            ],
        ];

        foreach ($lecturers as $lecturer) {
            Lecturer::updateOrCreate(['name' => $lecturer['name']], $lecturer);
        }

        // 4. Categories & Articles
        $categories = [
            'Parenting Islami' => 'parenting-islami',
            'Kreativitas APE' => 'kreativitas-ape',
            'Akademik & Lab' => 'akademik-lab',
            'Psikologi AUD' => 'psikologi-aud',
        ];

        $catModels = [];
        foreach ($categories as $name => $slug) {
            $catModels[$name] = Category::updateOrCreate(['slug' => $slug], ['name' => $name]);
        }

        $articles = [
            [
                'category_name' => 'Akademik & Lab',
                'title' => 'Praktik Lapangan Terpadu Mahasiswa PIAUD di Lembaga PAUD Unggulan',
                'slug' => 'praktik-lapangan-terpadu-mahasiswa-piaud',
                'excerpt' => 'Implementasi metode sentra dan stimulasi perkembangan anak berbasis Al-Qur\'an langsung di sekolah mitra se-Bandung Raya.',
                'photo_url' => '/images/piaud/Foto-Kegiatan-1.jpg',
                'read_time' => '5 menit baca',
                'is_featured' => true,
                'published_at' => now()->subDays(2),
            ],
            [
                'category_name' => 'Kreativitas APE',
                'title' => 'Workshop Pembuatan APE Ramah Lingkungan dari Bahan Daur Ulang',
                'slug' => 'workshop-pembuatan-ape-ramah-lingkungan',
                'excerpt' => 'Mahasiswa mendesain alat peraga edukatif sensorial menggunakan bahan loose parts lokal yang aman bagi anak usia prasekolah.',
                'photo_url' => '/images/piaud/Foto-Kegiatan-2.jpg',
                'read_time' => '3 menit baca',
                'is_featured' => false,
                'published_at' => now()->subDays(4),
            ],
            [
                'category_name' => 'Parenting Islami',
                'title' => 'Mengoptimalkan Golden Age Anak Melalui Keteladanan Akhlak Qur\'ani',
                'slug' => 'mengoptimalkan-golden-age-keteladanan-akhlak',
                'excerpt' => 'Kajian parenting ilmiah mengenai pentingnya stimulasi fitrah tauhid dan pengenalan adab harian sejak usia 0–6 tahun.',
                'photo_url' => '/images/piaud/Foto-Kegiatan-3.jpg',
                'read_time' => '4 menit baca',
                'is_featured' => false,
                'published_at' => now()->subDays(7),
            ],
        ];

        foreach ($articles as $art) {
            $cat = $catModels[$art['category_name']] ?? null;
            Article::updateOrCreate(
                ['slug' => $art['slug']],
                [
                    'category_id' => $cat ? $cat->id : null,
                    'title' => $art['title'],
                    'excerpt' => $art['excerpt'],
                    'photo_url' => $art['photo_url'],
                    'read_time' => $art['read_time'],
                    'is_featured' => $art['is_featured'],
                    'published_at' => $art['published_at'],
                ]
            );
        }

        // 5. Gallery Categories & Galleries
        $galCategories = [
            'Praktikum APE' => 'praktikum-ape',
            'Microteaching' => 'microteaching',
            'Pentas Seni' => 'pentas-seni',
            'Observasi RA' => 'observasi-ra',
        ];

        $galCatModels = [];
        foreach ($galCategories as $name => $slug) {
            $galCatModels[$name] = GalleryCategory::updateOrCreate(['slug' => $slug], ['name' => $name]);
        }

        $galleries = [
            [
                'cat' => 'Praktikum APE',
                'title' => 'Praktikum Pembuatan Alat Permainan Edukatif (APE)',
                'photo_url' => '/images/piaud/Foto-Kegiatan-1.jpg',
                'date' => 'Oktober 2026',
            ],
            [
                'cat' => 'Microteaching',
                'title' => 'Simulasi Mengajar di Laboratorium Microteaching',
                'photo_url' => '/images/piaud/Foto-Kegiatan-2.jpg',
                'date' => 'September 2026',
            ],
            [
                'cat' => 'Pentas Seni',
                'title' => 'Pentas Kreasi Seni Tari & Musik Anak Usia Dini',
                'photo_url' => '/images/piaud/Foto-Kegiatan-3.jpg',
                'date' => 'Agustus 2026',
            ],
            [
                'cat' => 'Observasi RA',
                'title' => 'Kunjungan Observasi Perkembangan Anak di RA Persis',
                'photo_url' => '/images/piaud/Foto-Kegiatan-4.jpg',
                'date' => 'Juli 2026',
            ],
        ];

        foreach ($galleries as $idx => $gal) {
            $cat = $galCatModels[$gal['cat']] ?? null;
            Gallery::updateOrCreate(
                ['title' => $gal['title']],
                [
                    'gallery_category_id' => $cat ? $cat->id : null,
                    'photo_url' => $gal['photo_url'],
                    'date' => $gal['date'],
                    'order' => $idx + 1,
                ]
            );
        }

        // 6. Sample Contacts
        $sampleContacts = [
            [
                'name' => 'Siti Khadijah',
                'phone' => '081234567890',
                'interest' => 'Pendaftaran Mahasiswa Baru (PMB)',
                'message' => 'Assalamu\'alaikum, mohon informasi persyaratan pendaftaran mahasiswa baru jalur beasiswa tahfidz dan konversi guru RA untuk semester depan.',
                'status' => 'unread',
            ],
            [
                'name' => 'Rahmat Hidayat',
                'phone' => '085798765432',
                'interest' => 'Konversi Ijazah Guru',
                'message' => 'Halo admin, apakah ada program RPL atau perkuliahan kelas karyawan untuk guru PAUD/TK yang sudah mengajar lebih dari 5 tahun?',
                'status' => 'read',
            ],
        ];

        foreach ($sampleContacts as $sc) {
            \App\Models\Contact::firstOrCreate(['phone' => $sc['phone']], $sc);
        }
    }
}
