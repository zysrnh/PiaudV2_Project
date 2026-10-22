/**
 * Master Data & Konten Landing Page PIAUD IAI Persis Bandung
 * Aturan anti-slop:
 * - DILARANG mengarang fakta (NIDN, nama pejabat, nomor SK, dsb).
 * - Data yang belum terkonfirmasi ditandai dengan komentar // TODO: ganti
 */

export interface NavLink {
    label: string;
    href: string;
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
    nidn: string;
    role: string;
    expertise: string;
    photoUrl: string;
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
    whatsappNumber: string;
    whatsappDefaultMessage: string;
    email: string;
    campusAddress: string;
    officeHours: string;
    accreditation: AccreditationInfo;
    hero: HeroData;
    kaprodi: KaprodiSpeech;
    pillars: PillarItem[];
    lecturers: Lecturer[];
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

// TODO: ganti nomor WhatsApp resmi sekretariat/PMB PIAUD
export const WHATSAPP_NUMBER = "6281234567890";

// Helper generator link WA resmi terproteksi URL encoding
export function createWhatsAppLink(message: string): string {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const siteConfig: SiteConfig = {
    institutionName: "IAI Persis Bandung",
    facultyName: "Fakultas Tarbiyah",
    programName: "Pendidikan Islam Anak Usia Dini (PIAUD)",
    programDegree: "Jenjang Sarjana (S1)",

    // TODO: ganti nomor WhatsApp resmi sekretariat prodi
    whatsappNumber: WHATSAPP_NUMBER,
    whatsappDefaultMessage: "Halo Admin PMB PIAUD IAI Persis Bandung, saya ingin konsultasi pendaftaran mahasiswa baru.",

    // TODO: ganti email resmi jika ada subdomain khusus @iaipibandung.ac.id
    email: "piaud@iaipibandung.ac.id",

    // Alamat Kampus IAI Persis Bandung
    // TODO: ganti detail gedung/ruangan jika ada spesifikasi ruangan prodi
    campusAddress: "Jl. Perintis Kemerdekaan No. 2, Babakan Ciamis, Kec. Sumur Bandung, Kota Bandung, Jawa Barat 40117",

    officeHours: "Senin – Jumat, 08.00 – 16.00 WIB",

    accreditation: {
        status: "Terakreditasi Baik",
        institution: "LAMDIK",
        // TODO: ganti nomor SK akreditasi resmi
        certificateNumber: "SK LAMDIK No. [Nomor SK Resmi]",
        // TODO: ganti tahun masa berlaku akreditasi
        validUntil: "2027",
    },

    hero: {
        tagline: "Program Studi S1 Pendidikan Islam Anak Usia Dini",
        heading: "Mencetak Pendidik Anak Usia Dini Berkarakter Islami & Berdaya Saing Sains",
        description:
            "Program sarjana yang memadukan pedagogi PAUD berbasis bukti empiris dengan penguatan aqidah dan akhlak Islami khas Jam'iyyah Persatuan Islam. Berpusat pada praktik lab microteaching dan media ajar ramah anak.",
        ctaPrimaryText: "Konsultasi Pendaftaran",
        ctaSecondaryText: "Lihat Kurikulum & Lab",
        photoUrl: "/images/piaud/hero-lab-microteaching.jpg",
        photoAlt: "Mahasiswa PIAUD IAI Persis Bandung mempraktikkan stimulasi literasi anak usia dini di laboratorium",
    },

    kaprodi: {
        // TODO: ganti nama Kaprodi dan gelar lengkap resmi
        name: "[Nama Ketua Program Studi, M.Pd.]",
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

    lecturers: [
        {
            // TODO: ganti dengan nama dosen dan gelar resmi
            name: "[Nama Dosen 1, M.Pd.I.]",
            // TODO: ganti NIDN resmi
            nidn: "NIDN: [0000000000]",
            role: "Dosen Keahlian",
            expertise: "Pendidikan Karakter & Kurikulum RA",
            photoUrl: "/images/piaud/dosen-1.jpg",
        },
        {
            // TODO: ganti dengan nama dosen dan gelar resmi
            name: "[Nama Dosen 2, M.Psi.]",
            // TODO: ganti NIDN resmi
            nidn: "NIDN: [0000000000]",
            role: "Dosen Keahlian",
            expertise: "Psikologi Perkembangan & Anak Berkebutuhan Khusus",
            photoUrl: "/images/piaud/dosen-2.jpg",
        },
        {
            // TODO: ganti dengan nama dosen dan gelar resmi
            name: "[Nama Dosen 3, M.Pd.]",
            // TODO: ganti NIDN resmi
            nidn: "NIDN: [0000000000]",
            role: "Dosen Keahlian",
            expertise: "Pengembangan Media APE & Seni Kreativitas Anak",
            photoUrl: "/images/piaud/dosen-3.jpg",
        },
        {
            // TODO: ganti dengan nama dosen dan gelar resmi
            name: "[Nama Dosen 4, M.Ag.]",
            // TODO: ganti NIDN resmi
            nidn: "NIDN: [0000000000]",
            role: "Dosen Keahlian",
            expertise: "Pendidikan Al-Qur'an & Hadits Tematik AUD",
            photoUrl: "/images/piaud/dosen-4.jpg",
        },
    ],

    articles: {
        featured: {
            id: "art-1",
            title: "Stimulasi Sensorik Alami: Memanfaatkan Bahan Ramah Lingkungan untuk Motorik Halus Balita",
            slug: "stimulasi-sensorik-alami-bahan-lingkungan",
            category: "Edukasi & APE",
            publishedAt: "18 Oktober 2026",
            readTime: "4 menit baca",
            excerpt:
                "Mengapa sensory play tidak harus mahal? Kajian laboratorium PIAUD tentang pembuatan loose parts edukatif dari biji-bijian, kayu serut, dan adonan tepung alami yang aman bagi anak.",
            photoUrl: "/images/piaud/artikel-sensory-play.jpg",
        },
        list: [
            {
                id: "art-2",
                title: "Menanamkan Kebiasaan Shalat Tanpa Paksaan pada Rentang Usia 4–6 Tahun",
                slug: "menanamkan-kebiasaan-shalat-usia-dini",
                category: "Parenting Islami",
                publishedAt: "12 Oktober 2026",
                readTime: "3 menit baca",
                excerpt:
                    "Pendekatan keteladanan visual dan afirmasi positif menurut pedoman Rasulullah SAW dan tinjauan neurosains perkembangan anak.",
                photoUrl: "/images/piaud/artikel-shalat.jpg",
            },
            {
                id: "art-3",
                title: "Daftar Kurikulum Merdeka di Raudhatul Athfal: Apa Saja yang Berubah?",
                slug: "kurikulum-merdeka-raudhatul-athfal",
                category: "Akademik RA",
                publishedAt: "05 Oktober 2026",
                readTime: "5 menit baca",
                excerpt:
                    "Panduan ringkas bagi pengelola lembaga PAUD dan calon pendidik dalam menyusun modul ajar intrakurikuler berbasis P5-PPRA.",
                photoUrl: "/images/piaud/artikel-kurikulum-ra.jpg",
            },
            {
                id: "art-4",
                title: "Mengenal 'Screen Time Fatigue' pada Anak Balita dan Alternatif Kegiatan Fisik",
                slug: "screen-time-fatigue-anak-balita",
                category: "Tumbuh Kembang",
                publishedAt: "28 September 2026",
                readTime: "4 menit baca",
                excerpt:
                    "Solusi praktis dari dosen psikologi PIAUD untuk mengatasi ketergantungan gawai melalui variasi permainan tradisional interaktif.",
                photoUrl: "/images/piaud/artikel-screen-time.jpg",
            },
        ],
    },

    footerLinks: {
        academic: [
            { label: "Struktur Kurikulum", href: "#kurikulum" },
            { label: "Laboratorium APE & Microteaching", href: "#kurikulum" },
            { label: "Profil Lulusan & Karir", href: "#profil" },
            { label: "Direktori Dosen", href: "#dosen" },
        ],
        institutional: [
            { label: "Institut Agama Islam Persatuan Islam", href: "https://iaipibandung.ac.id" },
            { label: "Fakultas Tarbiyah", href: "https://iaipibandung.ac.id" },
            { label: "Status Akreditasi LAMDIK", href: "#" },
            { label: "Jurnal Ilmiah PIAUD", href: "#" },
        ],
        portal: [
            { label: "Penerimaan Mahasiswa Baru (PMB)", href: createWhatsAppLink("Halo Admin, saya ingin info pendaftaran PMB PIAUD") },
            { label: "Sistem Informasi Akademik", href: "/login" },
            { label: "Kontak & Layanan Mahasiswa", href: "#kontak" },
        ],
    },
};
