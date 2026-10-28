# PIAUD V2 - UI & DESIGN SYSTEM GUIDELINES

Dokumen ini adalah acuan baku styling, animasi, dan komponen UI untuk seluruh halaman publik PIAUD IAI Persis Bandung. Setiap agen atau developer WAJIB mematuhi panduan ini.

---

## 1. Aturan Warna & Bayangan (Zero Neon Aura)
- **Background Utama:** Solid Warm Ivory (`#FAF6EC`) dan Warm Cream (`#F2ECE0`).
- **Warna Aksen:**
  - Deep Forest Emerald: `#0F4C3A` (Dark: `#0A3427`)
  - Warm Terracotta: `#C2613A` (Dark: `#A64F2D`)
  - Slate Text: `#1F2933` (Muted: `#52606D`)
  - Border: `#E3DAC7`
- **DILARANG Bayangan Negatif Putih:** Jangan pernah memakai shadow offset putih (seperti `-6px -6px ... #ffffff`). Efek ini menghasilkan aura putih/neon halo yang kaku.
- **Gunakan Bayangan Terarah Alami:** Gunakan bayangan directional yang lembut:
  `box-shadow: 0 4px 16px -2px rgba(31, 41, 51, 0.08), 0 2px 6px -1px rgba(31, 41, 51, 0.04);`

---

## 2. Aturan Animasi (Strict No-Fade, Fisik Murni)
- **DILARANG Efek Opacity Fade:** Transisi `opacity: 0 -> 1` dilarang keras.
- **Gerakan Fisik Murni:** Semua animasi masuk wajib menggunakan pergeseran posisi fisik:
  - `translateY` (slide up dari bawah)
  - `translateX` (slide dari kiri/kanan)
  - `scale`
- **Durasi & Stagger:**
  - Entrance keyframes: `0.85s cubic-bezier(0.16, 1, 0.3, 1)`
  - Stagger delay terukur: 100ms interval (`delay-1` 100ms s/d `delay-6` 600ms).

---

## 3. Pemisahan Wrapper Animasi vs Kartu (Decoupled Wrappers)
- **HUKUM UTAMA:** JANGAN PERNAH menaruh class animasi scroll (`animate-slide-up`, `animate-slide-left`, `animate-slide-right`) di elemen yang sama dengan `.card-interactive` atau elemen ber-`:hover`!
- **Penyebab Masalah:** CSS keyframe dengan `animation-fill-mode: both` mengunci layer `transform` di cascade CSS. Jika digabung dengan hover, kartu akan menyentak (*snap*) tanpa transisi saat cursor keluar (*mouseleave*).
- **Struktur Wajib:**
  ```tsx
  {/* Wrapper menangani scroll entrance */}
  <div className={`h-full ${inView.sectionId ? 'animate-slide-up delay-1' : ''}`}>
      {/* Kartu di dalam murni menangani hover */}
      <div className="neu-card card-interactive rounded-2xl p-6 h-full">
          ...
      </div>
  </div>
  ```

---

## 4. Hover Physics (Buttery Smooth 0.3s Easing)
- **Timing & Easing Dua Arah:**
  `transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease;`
- **Jarak Angkat Proporsional:**
  - Card Besar: `transform: translateY(-5px);` dengan border `#0F4C3A` dan soft shadow.
  - Badge / Card Kecil (Tinggi < 60px): Gunakan `.card-interactive-sm` dengan `transform: translateY(-3px);` agar tidak terjadi *cursor boundary jitter*.
- **DILARANG `!important`:** Jangan gunakan `!important` pada transform hover.

---

## 5. Bidirectional Scroll Observer
- Semua halaman publik dengan animasi scroll wajib menggunakan `IntersectionObserver` dua arah:
  ```ts
  setInView((prev) => ({
      ...prev,
      [sectionId]: entry.isIntersecting,
  }));
  ```
- Ini memastikan section otomatis re-animasi secara konsisten saat di-scroll ke bawah maupun ke atas (tidak cuma muncul sekali pas refresh).

---

## 6. DILARANG Label Kapsul / Pill Bulat (Anti-AI-Slop)
- DILARANG menggunakan capsule badge bulat (`rounded-full px-3 py-1 bg-white/10 border border-white/20`).
- Gunakan tipografi flat murni ber-radius minimalis:
  - Overline teks tegas: `<span className="text-xs font-bold tracking-widest text-[#C2613A] uppercase block">`
  - Tag kategori flat: `rounded-md px-2.5 py-0.5 bg-[#FAF6EC] border border-[#E3DAC7]`

---

## 7. Token Khusus Kartu Gelap (.neu-card-emerald)
- Karena `.neu-card` memiliki `background-color: #FAF6EC` (krem), kartu yang berlatar belakang hijau tua wajib menggunakan `.neu-card-emerald`.
- Ini menjamin teks putih selalu kontras tinggi dan tidak pernah tenggelam di atas latar krem.

---

## 8. Standar Navigasi Navbar
- Menu aktif menggunakan indikator **underline bar (`h-[2px] bg-[#0F4C3A]`)** halus di bawahnya, bukan kotak tebal terisolasi.
- Dropdown indicator wajib menggunakan **SVG Chevron**, bukan karakter teks unicode `▾`.
- Ujung kanan navbar wajib memiliki tombol CTA solid: **"Daftar PMB →"** (`bg-[#0F4C3A]`).
