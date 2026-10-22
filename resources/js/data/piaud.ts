/**
 * Master Data & Konten Landing Page PIAUD IAI Persis Bandung
 * Diperbarui sesuai database resmi (iais9713_piaud)
 */

export interface SubMenu {
    label: string;
    href: string;
}

export interface NavItem {
    label: string;
    href: string;
    submenu?: SubMenu[];
}

export interface AccreditationInfo {
    status: string;
    institution: string;
    certificateNumber: string;
    validUntil: string;
}

export interface HeroData {
    tagline: string;
    heading: string;
    description: string;
    ctaPrimaryText: string;
    ctaSecondaryText: string;
    photoUrl: string;
    photoAlt: string;
}

export interface KaprodiSpeech {
    name: string;
    title: string;
    photoUrl: string;
    pullQuote: string;
    content: string[];
}

export interface PillarItem {
    number: string;
    title: string;
    description: string;
    deliverables: string[];
}

export interface Lecturer {
    name: string;
    nip: string;
    role: string;
    expertise: string;
    photoUrl: string;
}

export interface GalleryItem {
    title: string;
    photoUrl: string;
    category: string;
}

export interface Article {
    id: string;
    title: string;
    slug: string;
    category: string;
    publishedAt: string;
    readTime: string;
    excerpt: string;
    photoUrl: string;
}

export interface FooterLink {
    label: string;
    href: string;
}

export interface SiteConfig {
    institutionName: string;
    facultyName: string;
    programName: string;
    programDegree: string;
    phone: string;
    whatsappNumber: string;
    whatsappDefaultMessage: string;
    email: string;
    campusAddress: string;
    officeHours: string;
    accreditation: AccreditationInfo;
    navigation: NavItem[];
    hero: HeroData;
    kaprodi: KaprodiSpeech;
    pillars: PillarItem[];
    lecturers: Lecturer[];
    gallery: GalleryItem[];
    articles: {
        featured: Article;
        list: Article[];
    };
    footerLinks: {
        academic: FooterLink[];
        institutional: FooterLink[];
        portal: FooterLink[];
    };
}

// Nomor WhatsApp resmi dari profil database
export const WHATSAPP_NUMBER = "6281220005678";

export function createWhatsAppLink(message: string): string {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const siteConfig: SiteConfig = {
    institutionName: "IAI Persis Bandung",
    facultyName: "Fakultas Tarbiyah",
    programName: "Pendidikan Islam Anak Usia Dini (PIAUD)",
    programDegree: "Jenjang Sarjana (S1)",

    // Nomor telepon kantor dari database profil
    phone: "(022) 8752-1234",
    whatsappNumber: WHATSAPP_NUMBER,
    whatsappDefaultMessage: "Halo Admin PMB PIAUD IAI Persis Bandung, saya ingin konsultasi pendaftaran mahasiswa baru.",

    email: "piaud@iaipibandung.ac.id",
    campusAddress: "Jl. Ciganitri No. 2, Cipagalo, Kec. Bojongsoang, Kabupaten Bandung, Jawa Barat 40287",
    officeHours: "Senin – Jumat, 08.00 – 16.00 WIB",

    accreditation: {
        status: "Terakreditasi Baik",
        institution: "LAMDIK",
        certificateNumber: "SK LAMDIK Resmi",
        validUntil: "2027",
    },

    // Struktur Menu disesuaikan dengan routing aplikasi multi-halaman
    navigation: [
        { label: "Beranda", href: "/" },
        {
            label: "Profil",
            href: "/profil",
            submenu: [
                { label: "Visi & Misi", href: "/profil#visi-misi" },
                { label: "Sambutan Kaprodi", href: "/profil#sambutan" },
            ],
        },
        {
            label: "Akademik",
            href: "/akademik",
            submenu: [
                { label: "Kurikulum & SKS", href: "/akademik#kurikulum" },
                { label: "Profil Lulusan", href: "/akademik#profil-lulusan" },
                { label: "Laboratorium APE", href: "/akademik#lab" },
            ],
        },
        { label: "Dosen", href: "/dosen" },
        { label: "Artikel & Parenting", href: "/artikel" },
        { label: "Galeri", href: "/galeri" },
        { label: "Hubungi Kami", href: "/kontak" },
    ],

    hero: {
        tagline: "Program Studi S1 Pendidikan Islam Anak Usia Dini",
        heading: "Mencetak Pendidik Anak Usia Dini Berkarakter Islami & Berdaya Saing",
        description:
            "Program sarjana yang memadukan pedagogi PAUD berbasis sains tumbuh kembang dengan penguatan aqidah dan akhlak Islami khas Jam'iyyah Persatuan Islam. Berpusat pada praktik lab microteaching dan media ajar ramah anak.",
        ctaPrimaryText: "Konsultasi Pendaftaran",
        ctaSecondaryText: "Lihat Kurikulum & Lab",
        photoUrl: "/images/piaud/Foto-Kegiatan-1.jpg",
        photoAlt: "Praktikum Alat Permainan Edukatif (APE) Mahasiswa PIAUD IAI Persis Bandung",
    },

    kaprodi: {
        name: "Dr. Hj. Nur Aini, M.Pd.",
        title: "Ketua Program Studi S1 PIAUD IAI Persis Bandung",
        photoUrl: "/images/piaud/team-1.jpg",
        pullQuote:
            "Pendidikan anak usia emas bukan sekadar transfer pengetahuan, melainkan penanaman fitrah tauhid, adab luhur, dan kecerdasan motorik sejak langkah pertama anak.",
        content: [
            "Program Studi S1 PIAUD IAI Persis Bandung didirikan untuk menjawab kebutuhan mendesak akan guru dan pengelola RA/TK yang tidak hanya paham psikologi tumbuh kembang anak modern, tetapi juga memiliki keteladanan ruhiyah yang kuat.",
            "Di sini, mahasiswa kami dibimbing untuk menguasai pembuatan Alat Permainan Edukatif (APE), manajemen kelembagaan PAUD inklusif, hingga riset aplikatif parenting berbasis sunnah dan kaidah ilmiah.",
        ],
    },

    pillars: [
        {
            number: "01",
            title: "Kurikulum Keislaman & Perkembangan Anak Holistik",
            description:
                "Mengintegrasikan kurikulum nasional Pendidikan Guru PAUD dengan kurikulum nilai-nilai Islam Jam'iyyah Persatuan Islam. Memastikan calon pendidik memiliki landasan syar'i sekaligus kompetensi pedagogik mutakhir.",
            deliverables: [
                "Psikologi Perkembangan Anak Usia Dini",
                "Metodologi Penanaman Aqidah & Adab Usia Emas",
                "Deteksi Dini Tumbuh Kembang & Kebutuhan Khusus",
            ],
        },
        {
            number: "02",
            title: "Laboratorium Terpadu Microteaching & APE",
            description:
                "Fasilitas laboratorium mandiri yang dirancang menyerupai ruang kelas PAUD berstandar tinggi. Tempat mahasiswa merancang dan menguji coba media belajar anak.",
            deliverables: [
                "Praktik mengajar skala mikro berkamera observasi",
                "Workshop rancang bangun Alat Permainan Edukatif (APE)",
                "Studio dongeng dan literasi audio-visual anak",
            ],
        },
        {
            number: "03",
            title: "Magang & Kemitraan Jaringan RA/TK",
            description:
                "Jaringan kemitraan erat dengan puluhan Raudhatul Athfal (RA) dan TK Islam di Jawa Barat. Mahasiswa menjalani program praktik lapangan nyata secara terstruktur dan terukur.",
            deliverables: [
                "Praktik Pengalaman Lapangan (PPL) terpadu 1 semester",
                "Riset aksi kolaboratif bersama guru pamong",
                "Peluang rekrutmen kerja langsung sebelum wisuda",
            ],
        },
    ],

    // Data Dosen Riil dari Database mod_data_guru
    lecturers: [
        {
            name: "Dr. Hj. Nur Aini, M.Pd.",
            nip: "197508122001122001",
            role: "Ketua Prodi & Dosen",
            expertise: "Pendidikan Karakter & Kurikulum RA",
            photoUrl: "/images/piaud/team-1.jpg",
        },
        {
            name: "Ahmad Fauzi, M.Pd.I.",
            nip: "198103152006041002",
            role: "Dosen Keahlian",
            expertise: "Pendidikan Al-Qur'an & Hadits Tematik AUD",
            photoUrl: "/images/piaud/team-2.jpg",
        },
        {
            name: "Siti Rahmawati, M.Pd.",
            nip: "198807202012012003",
            role: "Dosen Keahlian",
            expertise: "Pengembangan Media APE & Seni Kreativitas",
            photoUrl: "/images/piaud/team-3.jpg",
        },
        {
            name: "Nida Ul Hasanah, M.Psi.",
            nip: "199011052015032004",
            role: "Dosen Keahlian",
            expertise: "Psikologi Perkembangan & Anak Usia Dini",
            photoUrl: "/images/piaud/team-4.jpg",
        },
    ],

    // Galeri Foto Dokumentasi Riil dari Database
    gallery: [
        {
            title: "Praktikum Alat Permainan Edukatif (APE)",
            photoUrl: "/images/piaud/Foto-Kegiatan-1.jpg",
            category: "Laboratorium APE",
        },
        {
            title: "Pentas Seni & Kreativitas Anak Usia Dini",
            photoUrl: "/images/piaud/Foto-Kegiatan-2.jpg",
            category: "Kreativitas Seni",
        },
        {
            title: "Simulasi Story Telling Menggunakan Boneka Tangan",
            photoUrl: "/images/piaud/Foto-Kegiatan-3.jpg",
            category: "Microteaching",
        },
        {
            title: "Kunjungan Edukatif & PPL ke Raudhatul Athfal",
            photoUrl: "/images/piaud/Foto-Kegiatan-4.jpg",
            category: "Praktik Lapangan",
        },
    ],

    // Data Artikel Riil dari Database
    articles: {
        featured: {
            id: "art-4",
            title: "Pentingnya Stimulasi Sensori Motorik pada Perkembangan Balita",
            slug: "pentingnya-stimulasi-sensori-motorik-balita",
            category: "Tumbuh Kembang",
            publishedAt: "21 Oktober 2026",
            readTime: "4 menit baca",
            excerpt:
                "Kajian laboratorium PIAUD mengenai tahapan stimulasi sensori motorik anak usia emas untuk membangun koordinasi gerak, konsentrasi, dan kesiapan kognitif sejak dini.",
            photoUrl: "/images/piaud/Content-Management-System-(CMS)-Untuk-Website.jpg",
        },
        list: [
            {
                id: "art-3",
                title: "Praktik Lapangan Microteaching: Menumbuhkan Minat Literasi Sejak Dini",
                slug: "praktik-lapangan-microteaching-literasi-anak",
                category: "Akademik & Lab",
                publishedAt: "21 Oktober 2026",
                readTime: "3 menit baca",
                excerpt:
                    "Metode bercerita interaktif dengan media boneka tangan hasil riset mahasiswa PIAUD yang terbukti efektif meningkatkan fokus anak.",
                photoUrl: "/images/piaud/Pedoman-Kegiatan-Ekstrakurikuler-di-Sekolah.jpg",
            },
            {
                id: "art-2",
                title: "Workshop Pembuatan Alat Permainan Edukatif (APE) dari Bahan Daur Ulang",
                slug: "workshop-ape-bahan-daur-ulang",
                category: "Kreativitas APE",
                publishedAt: "21 Oktober 2026",
                readTime: "5 menit baca",
                excerpt:
                    "Panduan praktis merancang loose parts ramah lingkungan yang aman dan menstimulasi imajinasi anak tanpa biaya mahal.",
                photoUrl: "/images/piaud/Manfaat-Kegiatan-Ekstrakurikuler-untuk-Siswa-SMA.jpg",
            },
            {
                id: "art-1",
                title: "Mengoptimalkan Masa Golden Age Anak dengan Pendekatan Qur'ani",
                slug: "golden-age-anak-pendekatan-qurani",
                category: "Parenting Islami",
                publishedAt: "21 Oktober 2026",
                readTime: "4 menit baca",
                excerpt:
                    "Integrasi keteladanan Rasulullah SAW dalam penanaman aqidah dan adab anak sebelum usia 7 tahun.",
                photoUrl: "/images/piaud/Lorem-ipsum-dolor-adipiscing-elit.jpg",
            },
        ],
    },

    footerLinks: {
        academic: [
            { label: "Kurikulum & SKS", href: "/akademik#kurikulum" },
            { label: "Laboratorium APE & Microteaching", href: "/akademik#lab" },
            { label: "Profil Lulusan & Karir", href: "/akademik#profil-lulusan" },
            { label: "Direktori Dosen", href: "/dosen" },
        ],
        institutional: [
            { label: "Institut Agama Islam Persatuan Islam", href: "https://iaipibandung.ac.id" },
            { label: "Fakultas Tarbiyah", href: "https://iaipibandung.ac.id" },
            { label: "Status Akreditasi LAMDIK", href: "/profil" },
            { label: "Visi & Misi Prodi", href: "/profil#visi-misi" },
        ],
        portal: [
            { label: "Penerimaan Mahasiswa Baru (PMB)", href: createWhatsAppLink("Halo Admin, saya ingin info pendaftaran PMB PIAUD") },
            { label: "Sistem Informasi Akademik", href: "/login" },
            { label: "Kontak & Lokasi Kampus", href: "/kontak" },
        ],
    },
};
