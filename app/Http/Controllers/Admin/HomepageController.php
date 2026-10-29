<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SiteSetting;

class HomepageController extends Controller
{
    public function index()
    {
        $settings = SiteSetting::where('group', 'homepage')
            ->orWhere('group', 'general')
            ->pluck('value', 'key')
            ->toArray();

        return view('admin.homepage.index', compact('settings'));
    }

    public function update(Request $request)
    {
        $data = $request->except(['_token', '_method']);

        foreach ($data as $key => $value) {
            SiteSetting::updateOrCreate(
                ['key' => $key],
                [
                    'value' => $value ?? '',
                    'group' => 'homepage'
                ]
            );
        }

        return redirect()->route('admin.homepage.index')
            ->with('success', 'Konten halaman beranda berhasil diperbarui!');
    }
}
