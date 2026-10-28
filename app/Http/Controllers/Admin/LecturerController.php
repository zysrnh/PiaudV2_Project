<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lecturer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class LecturerController extends Controller
{
    public function index()
    {
        $lecturers = Lecturer::orderBy('order')->orderBy('name')->paginate(15);
        return view('admin.lecturers.index', compact('lecturers'));
    }

    public function create()
    {
        return view('admin.lecturers.form', ['lecturer' => new Lecturer()]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'nip' => 'nullable|string|max:100',
            'nidn' => 'nullable|string|max:100',
            'role' => 'required|string|max:150',
            'expertise' => 'nullable|string|max:255',
            'order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
            'photo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('lecturers', 'public');
            $validated['photo_url'] = '/storage/' . $path;
        }

        $validated['is_active'] = $request->has('is_active');
        $validated['order'] = $validated['order'] ?? 0;

        Lecturer::create($validated);

        return redirect()->route('admin.lecturers.index')->with('success', 'Data dosen berhasil ditambahkan.');
    }

    public function edit(Lecturer $lecturer)
    {
        return view('admin.lecturers.form', compact('lecturer'));
    }

    public function update(Request $request, Lecturer $lecturer)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'nip' => 'nullable|string|max:100',
            'nidn' => 'nullable|string|max:100',
            'role' => 'required|string|max:150',
            'expertise' => 'nullable|string|max:255',
            'order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
            'photo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            if ($lecturer->photo_url && str_starts_with($lecturer->photo_url, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $lecturer->photo_url));
            }
            $path = $request->file('photo')->store('lecturers', 'public');
            $validated['photo_url'] = '/storage/' . $path;
        }

        $validated['is_active'] = $request->has('is_active');
        $validated['order'] = $validated['order'] ?? 0;

        $lecturer->update($validated);

        return redirect()->route('admin.lecturers.index')->with('success', 'Data dosen berhasil diperbarui.');
    }

    public function destroy(Lecturer $lecturer)
    {
        if ($lecturer->photo_url && str_starts_with($lecturer->photo_url, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $lecturer->photo_url));
        }
        $lecturer->delete();

        return redirect()->route('admin.lecturers.index')->with('success', 'Data dosen berhasil dihapus.');
    }
}
