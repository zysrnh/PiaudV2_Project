/**
 * Master Data & Konten Landing Page PIAUD IAI Persis Bandung
 * Diselaraskan dengan rancangan resmi prodi (website_piaud_iai_persis_bandung_dengan_logo_dan_jurnal.html)
 */

export interface SubMenu {
    label: string;
    href: string;
    isExternal?: boolean;
}

export interface NavItem {
    label: string;
    href: string;
    isExternal?: boolean;
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
    ctaPrimaryHref: string;
    ctaSecondaryText: string;
    ctaSecondaryHref: string;
    heroNote: string;
    photoUrl: string;
    photoAlt: string;
}

export interface FocusStripItem {
    icon: string;
    title: string;
    description: string;
}

export interface AboutSectionData {
    eyebrow: string;
    title: string;
    description: string[];
    checklist: string[];
    ctaText: string;
    ctaHref: string;
    artCaption: string;
}

export interface AcademicFeatureItem {
    id?: string;
    icon: string;
    title: string;
    description: string;
    href: string;
}

export interface JournalSectionData {
    eyebrow: string;
    title: string;
    description: string;
    notice: string;
    ctaText: string;
    url: string;
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
    focusStrip: FocusStripItem[];
    about: AboutSectionData;
    academicServices: AcademicFeatureItem[];
    journal: JournalSectionData;
    noticeBanner: {
        title: string;
        description: string;
        ctaText: string;
        ctaHref: string;
    };
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

    // Struktur Menu disesuaikan dengan navigasi situs resmi
    navigation: [
        { label: "Beranda", href: "/" },
        {
            label: "Profil Prodi",
            href: "/profil",
            submenu: [
                { label: "Mengenal PIAUD", href: "/profil" },
                { label: "Visi & Misi", href: "/profil#visi-misi" },
                { label: "Sambutan Kaprodi", href: "/sambutan-kaprodi" },
            ],
        },
        {
            label: "Akademik",
            href: "/akademik",
            submenu: [
                { label: "Kurikulum", href: "/akademik#kurikulum" },
                { label: "Profil Lulusan & Karir", href: "/profil-lulusan" },
                { label: "Laboratorium & Studio APE", href: "/laboratorium-ape" },
            ],
        },
        { label: "Dosen", href: "/dosen" },
        { label: "Berita", href: "/artikel" },
        { label: "Jurnal PIAUD", href: "https://journal.iaipibandung.ac.id/index.php/piaudku/index", isExternal: true },
        { label: "Kontak", href: "/kontak" },
    ],

    // 1. Hero Data sesuai website_piaud_iai_persis_bandung_dengan_logo_dan_jurnal.html
    hero: {
        tagline: "Pendidikan Islam Anak Usia Dini",
        heading: "Mendidik Generasi, Menumbuhkan Peradaban.",
        description:
            "Mempersiapkan pendidik anak usia dini yang profesional, kreatif, berakhlak mulia, dan berlandaskan nilai-nilai Islam.",
        ctaPrimaryText: "Jelajahi Program Studi",
        ctaPrimaryHref: "/profil",
        ctaSecondaryText: "Informasi Akademik",
        ctaSecondaryHref: "/akademik",
        heroNote: "Berilmu · Berakhlak · Berdaya untuk Umat",
        photoUrl: "/images/piaud/Foto-Kegiatan-1.jpg",
        photoAlt: "Kegiatan Pembelajaran & Praktikum PIAUD IAI Persis Bandung",
    },

    // 2. Quick Strip / Fokus Program Studi
    focusStrip: [
        {
            icon: "📖",
            title: "Pendidikan Berkualitas",
            description: "Pembelajaran kontekstual dan berlandaskan nilai Islam",
        },
        {
            icon: "👩‍🏫",
            title: "Dosen Profesional",
            description: "Pendampingan akademik dan pengembangan kompetensi",
        },
        {
            icon: "🔎",
            title: "Riset dan Inovasi",
            description: "Pengembangan pendidikan anak usia dini",
        },
        {
            icon: "🎓",
            title: "Pengembangan Karier",
            description: "Menyiapkan calon pendidik dan praktisi PAUD",
        },
    ],

    // 3. Profil / Tentang Kami
    about: {
        eyebrow: "Tentang Kami",
        title: "Mengenal Program Studi PIAUD",
        description: [
            "Program Studi Pendidikan Islam Anak Usia Dini IAI Persis Bandung berfokus pada pendidikan dan pengembangan anak usia dini melalui pembelajaran yang sesuai tahap perkembangan, kreatif, dan berlandaskan nilai-nilai Islam.",
            "Bagian ini dilengkapi dengan kurikulum integratif, pembinaan akhlak karimah, profil lulusan unggul, serta fasilitas laboratorium pembelajaran yang representatif.",
        ],
        checklist: [
            "Penguatan kompetensi pedagogis dan profesional calon pendidik.",
            "Pengembangan pembelajaran kreatif, inklusif, dan sesuai perkembangan anak.",
            "Integrasi nilai-nilai Islam dalam praktik pendidikan anak usia dini.",
        ],
        ctaText: "Lihat Informasi Prodi →",
        ctaHref: "/profil",
        artCaption: "Mendampingi anak tumbuh dengan ilmu dan akhlak",
    },

    // 4. Layanan Program Studi / Informasi Akademik
    academicServices: [
        {
            icon: "📚",
            title: "Kurikulum",
            description: "Struktur mata kuliah, capaian pembelajaran, dan dokumen akademik yang telah disahkan.",
            href: "/akademik#kurikulum",
        },
        {
            id: "dosen",
            icon: "👩‍🏫",
            title: "Dosen dan Tenaga Pengajar",
            description: "Profil, bidang keahlian, publikasi, dan informasi akademik dosen.",
            href: "/dosen",
        },
        {
            icon: "🧪",
            title: "Penelitian dan Pengabdian",
            description: "Informasi riset, publikasi ilmiah, dan kegiatan pengabdian kepada masyarakat.",
            href: "https://journal.iaipibandung.ac.id/index.php/piaudku/index",
        },
        {
            icon: "🗂️",
            title: "Dokumen dan Mutu",
            description: "Pedoman, dokumen mutu, laporan, serta informasi akreditasi yang tersedia untuk publik.",
            href: "/profil",
        },
    ],

    // 5. Jurnal PIAUD: PIAUDKU
    journal: {
        eyebrow: "Publikasi Ilmiah",
        title: "Jurnal PIAUD: PIAUDKU",
        description:
            "Jelajahi publikasi ilmiah, artikel penelitian, dan kajian seputar pendidikan Islam anak usia dini melalui portal jurnal resmi PIAUD IAI Persis Bandung.",
        notice: "Portal jurnal dikelola pada situs jurnal terpisah dan akan terbuka di tab baru.",
        ctaText: "Kunjungi Jurnal PIAUDKU ↗",
        url: "https://journal.iaipibandung.ac.id/index.php/piaudku/index",
    },

    // 6. Notice Banner Resmi
    noticeBanner: {
        title: "Informasi Resmi Program Studi",
        description: "Hubungi pengelola prodi untuk mendapatkan informasi akademik, dokumen, dan layanan yang telah diverifikasi.",
        ctaText: "Lihat Kontak ↗",
        ctaHref: "/kontak",
    },

    kaprodi: {
        name: "Dra. Hj. Siti Komariah, M.Pd.",
        title: "Ketua Program Studi S1 PIAUD IAI Persis Bandung",
        photoUrl: "/images/piaud/kaprodi.jpg",
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

    // Data Dosen Riil dari Database
    lecturers: [
        {
            name: "Dra. Hj. Siti Komariah, M.Pd.",
            nip: "196805121994032001",
            role: "Ketua Program Studi",
            expertise: "Manajemen PAUD & Pengembangan Kurikulum RA Berbasis Fitrah",
            photoUrl: "/images/piaud/kaprodi.jpg",
        },
        {
            name: "Dr. H. Wildan Hasan, M.Pd.I.",
            nip: "197608142006041003",
            role: "Dosen Senior / Pakar Tarbiyah",
            expertise: "Filsafat Pendidikan Islam & Kebijakan Kurikulum",
            photoUrl: "/images/piaud/team-1.jpg",
        },
        {
            name: "Ahmad Fauzi, M.Pd.",
            nip: "197203152002121002",
            role: "Dosen Senior",
            expertise: "Pendidikan Karakter & Pemikiran Jam'iyyah Persis",
            photoUrl: "/images/piaud/team-2.jpg",
        },
        {
            name: "Dian Permana, M.Pd.",
            nip: "198807212019031008",
            role: "Dosen Keahlian Khusus",
            expertise: "Media Pembelajaran Digital & Storytelling AUD",
            photoUrl: "/images/piaud/team-3.jpg",
        },
    ],

    // Galeri Foto Dokumentasi Riil dari Database
    gallery: [
        {
            title: "Praktikum Pembuatan Alat Permainan Edukatif (APE)",
            photoUrl: "/images/piaud/Foto-Kegiatan-1.jpg",
            category: "Laboratorium APE",
        },
        {
            title: "Simulasi Mengajar di Laboratorium Microteaching",
            photoUrl: "/images/piaud/Foto-Kegiatan-2.jpg",
            category: "Microteaching",
        },
        {
            title: "Pentas Kreasi Seni Tari & Musik Anak Usia Dini",
            photoUrl: "/images/piaud/Foto-Kegiatan-3.jpg",
            category: "Kreativitas Seni",
        },
        {
            title: "Kunjungan Observasi Perkembangan Anak di RA Persis",
            photoUrl: "/images/piaud/Foto-Kegiatan-4.jpg",
            category: "Praktik Lapangan",
        },
    ],

    // Data Berita & Kegiatan sesuai website_piaud_iai_persis_bandung_dengan_logo_dan_jurnal.html
    articles: {
        featured: {
            id: "art-1",
            title: "Informasi dan Agenda Akademik",
            slug: "informasi-dan-agenda-akademik",
            category: "Akademik",
            publishedAt: "28 Oktober 2026",
            readTime: "4 menit baca",
            excerpt:
                "Tempatkan berita kalender akademik, seminar, kuliah umum, atau agenda prodi terbaru untuk sivitas akademika.",
            photoUrl: "/images/piaud/Foto-Kegiatan-1.jpg",
        },
        list: [
            {
                id: "art-2",
                title: "Praktik dan Inovasi Pembelajaran PAUD",
                slug: "praktik-dan-inovasi-pembelajaran-paud",
                category: "Kegiatan",
                publishedAt: "26 Oktober 2026",
                readTime: "3 menit baca",
                excerpt:
                    "Dokumentasikan kegiatan mahasiswa, praktik lapangan, dan inovasi media pembelajaran ramah anak.",
                photoUrl: "/images/piaud/Foto-Kegiatan-2.jpg",
            },
            {
                id: "art-3",
                title: "Prestasi dan Karya Sivitas Akademika",
                slug: "prestasi-dan-karya-sivitas-akademika",
                category: "Prestasi",
                publishedAt: "24 Oktober 2026",
                readTime: "5 menit baca",
                excerpt:
                    "Publikasikan capaian mahasiswa dan dosen setelah informasi diverifikasi oleh program studi.",
                photoUrl: "/images/piaud/Foto-Kegiatan-3.jpg",
            },
        ],
    },

    footerLinks: {
        academic: [
            { label: "Profil Prodi", href: "/profil" },
            { label: "Kurikulum & SKS", href: "/akademik#kurikulum" },
            { label: "Dosen dan Pengajar", href: "/dosen" },
            { label: "Jurnal PIAUDKU", href: "https://journal.iaipibandung.ac.id/index.php/piaudku/index" },
            { label: "Berita dan Kegiatan", href: "/artikel" },
        ],
        institutional: [
            { label: "Dokumen Akademik", href: "/profil" },
            { label: "Pengumuman Resmi", href: "/artikel" },
            { label: "Penelitian dan Pengabdian", href: "https://journal.iaipibandung.ac.id/index.php/piaudku/index" },
            { label: "Status Akreditasi LAMDIK", href: "/profil" },
        ],
        portal: [
            { label: "Jurnal PIAUDKU", href: "https://journal.iaipibandung.ac.id/index.php/piaudku/index" },
            { label: "PMB Online IAI Persis", href: createWhatsAppLink("Halo Admin, saya ingin info pendaftaran PMB PIAUD") },
            { label: "Sistem Informasi Akademik", href: "https://siakad.iaipibandung.ac.id" },
            { label: "Kontak & Layanan Prodi", href: "/kontak" },
        ],
    },
};
