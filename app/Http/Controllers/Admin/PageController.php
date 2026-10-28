<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PageController extends Controller
{
    protected array $defaultPages = [
        [
            'title' => 'Sambutan Ketua Program Studi',
            'slug' => 'sambutan-kaprodi',
            'content' => '<p>Assalamu’alaikum Warahmatullahi Wabarakatuh.</p><p>Selamat datang di Program Studi Pendidikan Islam Anak Usia Dini (PIAUD) Fakultas Tarbiyah IAI Persis Bandung. Kami berkomitmen mendidik calon pendidik anak usia dini yang berkarakter islami, berwawasan luas, dan kompeten dalam stimulasi perkembangan anak.</p>',
            'meta_description' => 'Sambutan resmi Ketua Program Studi S1 PIAUD IAI Persis Bandung.',
            'is_published' => true,
        ],
        [
            'title' => 'Visi, Misi & Tujuan',
            'slug' => 'visi-misi',
            'content' => '<h3>Visi</h3><p>Menjadi Program Studi PIAUD yang unggul, berkarakter Qur\'ani, dan inovatif dalam pengembangan pendidikan anak usia dini berbasis nilai-nilai Islam di tingkat nasional pada tahun 2030.</p><h3>Misi</h3><ol><li>Menyelenggarakan pendidikan sarjana yang berkualitas berlandaskan Al-Qur\'an dan As-Sunnah.</li><li>Mengembangkan penelitian inovatif di bidang stimulasi anak usia dini.</li><li>Melaksanakan pengabdian masyarakat guna mendukung kemandirian RA/PAUD Islam.</li></ol>',
            'meta_description' => 'Visi, misi, dan tujuan strategis Prodi S1 PIAUD IAI Persis Bandung.',
            'is_published' => true,
        ],
        [
            'title' => 'Struktur Kurikulum & Mata Kuliah',
            'slug' => 'kurikulum',
            'content' => '<p>Kurikulum S1 PIAUD memadukan kompetensi pedagogik modern dengan nilai-nilai kepersisan dan pendidikan akhlak anak usia dini. Total beban studi 144 SKS terdistribusi dalam 8 semester dengan penekanan pada praktik lapangan dan laboratorium APE.</p>',
            'meta_description' => 'Kurikulum dan sebaran mata kuliah Program Studi S1 PIAUD.',
            'is_published' => true,
        ],
        [
            'title' => 'Profil & Prospek Karir Lulusan',
            'slug' => 'profil-lulusan',
            'content' => '<p>Lulusan S1 PIAUD IAI Persis Bandung dipersiapkan menjadi:</p><ul><li><strong>Pendidik PAUD/RA Profesional:</strong> Guru inspiratif berkarakter Qur\'ani.</li><li><strong>Pengelola/Kepala Satuan PAUD:</strong> Manajer lembaga pendidikan anak usia dini yang mandiri.</li><li><strong>Pengembang APE & Media Pembelajaran:</strong> Kreator media sensorial dan edukatif.</li><li><strong>Konsultan Tumbuh Kembang AUD:</strong> Pendamping parenting keluarga islami.</li></ul>',
            'meta_description' => 'Profil lulusan dan peluang karir sarjana S1 PIAUD.',
            'is_published' => true,
        ],
    ];

    public function index()
    {
        // Auto initialize default pages if table is empty
        if (Page::count() === 0) {
            foreach ($this->defaultPages as $pageData) {
                Page::create($pageData);
            }
        }

        $pages = Page::orderBy('id')->get();
        return view('admin.pages.index', compact('pages'));
    }

    public function edit(Page $page)
    {
        return view('admin.pages.form', compact('page'));
    }

    public function update(Request $request, Page $page)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:pages,slug,' . $page->id,
            'content' => 'required|string',
            'meta_description' => 'nullable|string|max:255',
            'is_published' => 'nullable|boolean',
        ]);

        $validated['is_published'] = $request->has('is_published');
        $validated['slug'] = Str::slug($validated['slug']);

        $page->update($validated);

        return redirect()->route('admin.pages.index')->with('success', 'Halaman ' . $page->title . ' berhasil diperbarui.');
    }
}
