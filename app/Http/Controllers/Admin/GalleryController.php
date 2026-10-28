<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use App\Models\Gallery;
use App\Models\GalleryCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    public function index()
    {
        $galleries = Gallery::with('category')->orderBy('order')->latest()->paginate(12);
        $categories = GalleryCategory::orderBy('name')->get();
        $banners = Banner::orderBy('order')->get();

        return view('admin.gallery.index', compact('galleries', 'categories', 'banners'));
    }

    public function storeGallery(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'gallery_category_id' => 'nullable|exists:gallery_categories,id',
            'photo' => 'required|image|max:3072',
            'date' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'order' => 'nullable|integer',
        ]);

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('galleries', 'public');
            $validated['photo_url'] = '/storage/' . $path;
        }

        $validated['order'] = $validated['order'] ?? 0;
        unset($validated['photo']);

        Gallery::create($validated);

        return redirect()->route('admin.gallery.index')->with('success', 'Foto galeri berhasil diunggah.');
    }

    public function destroyGallery(Gallery $gallery)
    {
        if ($gallery->photo_url && str_starts_with($gallery->photo_url, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $gallery->photo_url));
        }

        $gallery->delete();

        return redirect()->route('admin.gallery.index')->with('success', 'Foto galeri berhasil dihapus.');
    }

    public function storeBanner(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'link_url' => 'nullable|string|max:255',
            'button_text' => 'nullable|string|max:50',
            'photo' => 'required|image|max:4096',
            'order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('banners', 'public');
            $validated['photo_url'] = '/storage/' . $path;
        }

        $validated['is_active'] = $request->has('is_active');
        $validated['order'] = $validated['order'] ?? 0;
        unset($validated['photo']);

        Banner::create($validated);

        return redirect()->route('admin.gallery.index', ['tab' => 'banners'])->with('success', 'Banner slider berhasil ditambahkan.');
    }

    public function destroyBanner(Banner $banner)
    {
        if ($banner->photo_url && str_starts_with($banner->photo_url, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $banner->photo_url));
        }

        $banner->delete();

        return redirect()->route('admin.gallery.index', ['tab' => 'banners'])->with('success', 'Banner slider berhasil dihapus.');
    }
}
