# Spesifikasi Kebutuhan Proyek (SRS)
## Website & Sistem Informasi Program Studi S1 PIAUD
### Institut Agama Islam Persatuan Islam (IAI Persis) Bandung

---

## 1. Pendahuluan & Ringkasan Proyek

### 1.1 Latar Belakang
Program Studi S1 **Pendidikan Islam Anak Usia Dini (PIAUD)** merupakan salah satu program studi unggulan di bawah naungan Institut Agama Islam Persatuan Islam (IAI Persis) Bandung. Website resmi prodi (`piaud.iaipibandung.ac.id`) berfungsi sebagai etalase digital, media informasi akademik, publikasi riset/parenting Islami, serta sarana promosi penerimaan mahasiswa baru.

### 1.2 Kondisi Sistem Saat Ini (Legacy System)
- **Teknologi**: PHP Native CMS generasi lama (arsitektur PHP 5.6 era cPanel).
- **Struktur Database**: MySQL procedural flat-table (`tb_setting`, `mod_data_guru`, `mod_data_foto`, `artikel`, `halaman`, dll).
- **Kendala**:
  - Belum mengadopsi standar framework modern.
  - Tampilan belum Single Page Application (SPA), masih reload penuh setiap pergantian halaman.
  - Panel admin dan pengelolaan konten masih kaku dan rentan isu kompatibilitas PHP modern.

### 1.3 Target Transformasi Sistem
Modernisasi total dan konversi arsitektur ke stack modern:
- **Backend Framework**: **Laravel 11.x / 12.x** (PHP 8.2+)
- **Frontend Framework**: **React + TypeScript + Inertia.js**
- **Styling UI/UX**: **Tailwind CSS** (Clean, Flat, Modern, Ramah Anak & Bernuansa Islami)
- **Database ORM**: **MySQL via Laravel Eloquent**
- **Bundler & Build Tool**: **Vite**

---

## 2. Struktur Kebutuhan Fitur (Functional Requirements)

### 2.1 Portal Publik (Frontend Mahasiswa & Umum)
1. **Beranda (Landing Page)**:
   - Hero Section / Carousel Banner dinamis.
   - Sambutan Ketua Program Studi PIAUD.
   - Poin Keunggulan Prodi (Nilai Islam, Kurikulum Ramah Anak, Lab Microteaching).
   - Highlight Dosen & Pengajar Unggulan.
   - Artikel Terkini (Kategori Parenting Islam & Edukasi Anak).
   - Galeri Dokumentasi Kegiatan Praktik & Lab PAUD.
   - Footer informatif dengan kontak, lokasi Google Maps, dan tautan sosial media.
2. **Profil Program Studi**:
   - Visi, Misi, dan Tujuan.
   - Sejarah & Legalitas Akreditasi Prodi.
   - Profil Lulusan & Peluang Karir (Pendidik RA/TK/PAUD, Konsultan Tumbuh Kembang, Pengelola Lembaga PAUD).
3. **Akademik & Pembelajaran**:
   - Struktur Kurikulum & Sebaran SKS.
   - Informasi Praktik Pengalaman Lapangan (PPL) & Microteaching.
   - Fasilitas Laboratorium Pembelajaran Anak & APE (Alat Permainan Edukatif).
4. **Dosen & Tenaga Kependidikan**:
   - Direktori Dosen lengkap dengan gelar, NIDN/NIP, kepakaran, dan riwayat riset.
   - Filter pencarian dosen berdasarkan nama atau bidang keahlian.
5. **Artikel & Parenting Islami**:
   - Portal artikel edukatif dengan pencarian dan filter kategori (Parenting Islam, Tumbuh Kembang, Kreasi APE, Info Kampus).
   - Halaman baca artikel dengan tipografi editorial yang nyaman, sharing social media (WA, FB, Telegram), dan artikel terkait.
6. **Galeri Media**:
   - Dokumentasi foto kegiatan perkuliahan, workshop, dan observasi lapangan.
   - Embed video edukasi dan demonstrasi alat ajar anak.
7. **Kontak & Pengaduan (Helpdesk)**:
   - Formulir pesan dan saran untuk pengelola program studi.
   - Direct button WhatsApp CS Prodi.

---

### 2.2 Panel Admin (Content Management System)
1. **Autentikasi & Hak Akses**:
   - Login aman dengan session guard Laravel Breeze / Fortify.
   - Pengelolaan profil akun admin dan reset password.
2. **Dashboard Overview**:
   - Statistik jumlah artikel, pengunjung, media galeri, dan total dosen.
   - Log pesan masuk dari formulir kontak.
3. **Manajemen Konten Publikasi**:
   - **Artikel / Berita**: CRUD lengkap, Rich Text Editor (WYSIWYG), upload cover gambar, auto-slug SEO-friendly, draft vs publish status.
   - **Kategori / Topik**: Pengelompokan artikel (Parenting, Akademik, APE).
4. **Manajemen Data Dosen**:
   - CRUD data dosen: Nama, NIP/NIDN, jabatan akademik, foto formal, bio singkat, dan kontak.
5. **Manajemen Galeri & Slider**:
   - Upload foto kegiatan multi-kategori.
   - Manajemen banner slider beranda (urutan tampil & deskripsi).
6. **Manajemen Halaman Statis**:
   - Editor konten Visi Misi, Sambutan Kaprodi, dan Kurikulum tanpa harus mengubah kode.
7. **Pengaturan Identitas Situs**:
   - Pengaturan judul web, meta description, email admin, nomor WhatsApp, alamat, dan link medsos.

---

## 3. Rencana Arsitektur & Struktur Folder (Laravel + React)

```
piaud-laravel-react/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/
│   │   │   │   ├── DashboardController.php
│   │   │   │   ├── ArticleController.php
│   │   │   │   ├── LecturerController.php
│   │   │   │   ├── GalleryController.php
│   │   │   │   └── SettingController.php
│   │   │   └── Public/
│   │   │       ├── HomeController.php
│   │   │       ├── ProfileController.php
│   │   │       ├── ArticleController.php
│   │   │       ├── LecturerController.php
│   │   │       └── ContactController.php
│   │   └── Requests/
│   └── Models/
│       ├── Article.php
│       ├── Category.php
│       ├── Lecturer.php
│       ├── Gallery.php
│       ├── Page.php
│       └── SiteSetting.php
├── database/
│   ├── migrations/
│   └── seeders/
├── resources/
│   ├── css/
│   │   └── app.css             # Tailwind CSS tokens & layout
│   └── js/
│       ├── Components/         # Komponen Reusable (Navbar, Footer, Card, Button, Modal)
│       ├── Layouts/
│       │   ├── AppLayout.tsx   # Layout Publik (Header, Navbar, Footer)
│       │   └── AdminLayout.tsx # Layout Dashboard Admin
│       ├── Pages/
│       │   ├── Public/
│       │   │   ├── Home.tsx
│       │   │   ├── Profile/
│       │   │   ├── Articles/
│       │   │   ├── Lecturers/
│       │   │   └── Contact.tsx
│       │   └── Admin/
│       │       ├── Dashboard.tsx
│       │       ├── Articles/
│       │       └── Lecturers/
│       └── app.tsx             # Inertia App Entry Point
└── routes/
    ├── web.php                 # Routing Inertia & Admin Guard
    └── auth.php
```

---

## 4. Desain Skema Database (Database Schema Plan)

| Tabel Baru (Laravel) | Tabel Legacy Asal | Keterangan & Relasi |
| :--- | :--- | :--- |
| `site_settings` | `tb_setting`, `mod_data_profil` | Metadata website, alamat kampus, kontak WhatsApp, email |
| `pages` | `halaman` | Halaman statis: Sambutan Kaprodi, Visi Misi, Kurikulum |
| `lecturers` | `mod_data_dosen`, `mod_data_guru` | Data dosen & tenaga pendidik PIAUD |
| `categories` | `topik` | Kategori artikel & berita |
| `articles` | `artikel` | Konten berita, tips parenting, publikasi kegiatan |
| `gallery_categories`| `mod_data_fotokat` | Kategori foto/video dokumentasi |
| `galleries` | `mod_data_foto`, `mod_data_video` | Foto & video kegiatan lab/microteaching |
| `banners` | `slider` | Slider gambar interaktif di landing page |
| `contacts` | `mod_data_pengaduan`, `bukutamu` | Pesan & saran masuk dari publik |
| `users` | `pengguna` | Akun administrator panel CMS |

---

## 5. Rencana Tahapan Eksekusi (Roadmap & Sprints)

### Sprint 1: Setup Foundation & Migrasi Basis Data
- [x] Analisis skema database lama (`iais9713_piaud`).
- [ ] Inisialisasi boilerplate Laravel + Inertia.js (React + TypeScript).
- [ ] Pembuatan file migrasi database baru berbasis skema modern.
- [ ] Script data seeder untuk mengimpor data dummy/existing ke skema baru.

### Sprint 2: Pengembangan Frontend Publik (UI/UX)
- [ ] Penyusunan Layout Utama publik (Header, Navigasi Mega-menu, Footer).
- [ ] Pembangunan Landing Page Beranda dengan Tailwind CSS (flat, elegan, ramah anak).
- [ ] Halaman Profil Prodi (Visi Misi, Sambutan Kaprodi, Kurikulum).
- [ ] Halaman Direktori Dosen & Detail Profil.
- [ ] Halaman Arsip & Baca Artikel Parenting/Berita.
- [ ] Halaman Galeri Foto & Form Kontak.

### Sprint 3: Panel Admin CMS (Inertia Dashboard)
- [ ] Setup sistem otentikasi login admin yang aman.
- [ ] Dashboard ringkasan metrik konten.
- [ ] Modul CRUD Artikel dengan visual editor & file uploader.
- [ ] Modul CRUD Dosen, Slider Banner, dan Galeri Foto.
- [ ] Modul pengaturan identitas & kontak prodi.

### Sprint 4: Testing, Build & Deployment Production
- [ ] Pengujian respon mobile di semua ukuran layar (responsive test).
- [ ] Optimasi build bundle Vite (`npm run build`).
- [ ] Konfigurasi hosting cPanel server `piaud.iaipibandung.ac.id`.
- [ ] Setup SSL, environment `.env`, dan integrasi database production.

---

## 6. Estimasi Anggaran & Ketentuan Proyek

Sesuai dokumen [Invoice_PIAUD_IAIPersis.html](file:///d:/Gawe/IAIPersis/piaud/piaud.iaipibandung.ac.id/Invoice_PIAUD_IAIPersis.html):
- **Subtotal Pekerjaan**: **Rp 3.500.000**
- **Potongan Khusus Kemitraan**: **- Rp 500.000**
- **Total Biaya Bersih (Nett)**: **Rp 3.000.000**
- **Garansi Pemeliharaan**: 30 hari kalender setelah serah terima sistem.
