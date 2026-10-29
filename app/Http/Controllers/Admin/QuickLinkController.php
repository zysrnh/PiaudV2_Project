<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\QuickLink;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class QuickLinkController extends Controller
{
    public function index()
    {
        $links = QuickLink::orderBy('order')->latest()->paginate(15);
        $totalLinks = QuickLink::count();
        $activeLinks = QuickLink::where('is_active', true)->count();

        return view('admin.quick_links.index', compact('links', 'totalLinks', 'activeLinks'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'url' => 'required|url|max:500',
            'logo' => 'nullable|image|max:2048',
            'logo_url' => 'nullable|string|max:500',
            'order' => 'nullable|integer',
            'show_title' => 'nullable|boolean',
            'is_active' => 'nullable|boolean',
        ], [
            'title.required' => 'Nama website wajib diisi.',
            'url.required' => 'Alamat URL wajib diisi.',
            'url.url' => 'Format URL tidak valid (harus diawali http:// atau https://).',
            'logo.image' => 'Berkas logo harus berupa gambar (PNG, JPG, SVG, WebP).',
            'logo.max' => 'Ukuran berkas logo maksimal 2 MB.',
        ]);

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('quick_links', 'public');
            $validated['logo_url'] = '/storage/' . $path;
        }

        $validated['show_title'] = $request->boolean('show_title');
        $validated['is_active'] = $request->has('is_active') ? $request->boolean('is_active') : true;
        $validated['order'] = $validated['order'] ?? 0;
        unset($validated['logo']);

        QuickLink::create($validated);

        return redirect()->route('admin.quick-links.index')->with('success', "Tautan cepat '{$request->title}' berhasil ditambahkan.");
    }

    public function update(Request $request, QuickLink $quickLink)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'url' => 'required|url|max:500',
            'logo' => 'nullable|image|max:2048',
            'logo_url' => 'nullable|string|max:500',
            'order' => 'nullable|integer',
            'show_title' => 'nullable|boolean',
            'is_active' => 'nullable|boolean',
        ], [
            'title.required' => 'Nama website wajib diisi.',
            'url.required' => 'Alamat URL wajib diisi.',
            'url.url' => 'Format URL tidak valid (harus diawali http:// atau https://).',
            'logo.image' => 'Berkas logo harus berupa gambar (PNG, JPG, SVG, WebP).',
            'logo.max' => 'Ukuran berkas logo maksimal 2 MB.',
        ]);

        if ($request->hasFile('logo')) {
            if ($quickLink->logo_url && str_starts_with($quickLink->logo_url, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $quickLink->logo_url));
            }
            $path = $request->file('logo')->store('quick_links', 'public');
            $validated['logo_url'] = '/storage/' . $path;
        }

        $validated['show_title'] = $request->boolean('show_title');
        $validated['is_active'] = $request->boolean('is_active');
        $validated['order'] = $validated['order'] ?? 0;
        unset($validated['logo']);

        $quickLink->update($validated);

        return redirect()->route('admin.quick-links.index')->with('success', "Tautan cepat '{$quickLink->title}' berhasil diperbarui.");
    }

    public function destroy(QuickLink $quickLink)
    {
        if ($quickLink->logo_url && str_starts_with($quickLink->logo_url, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $quickLink->logo_url));
        }

        $title = $quickLink->title;
        $quickLink->delete();

        return redirect()->route('admin.quick-links.index')->with('success', "Tautan cepat '{$title}' berhasil dihapus.");
    }
}
