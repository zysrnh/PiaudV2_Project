<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index()
    {
        $settingsRaw = SiteSetting::all();
        $settings = [];
        foreach ($settingsRaw as $s) {
            $settings[$s->key] = $s->value;
        }

        return view('admin.settings.index', compact('settings'));
    }

    public function update(Request $request)
    {
        $data = $request->except(['_token', '_method']);

        foreach ($data as $key => $value) {
            $group = 'general';
            if (in_array($key, ['phone', 'whatsapp_number', 'email', 'campus_address', 'office_hours'])) {
                $group = 'contact';
            } elseif (in_array($key, ['accreditation_status', 'accreditation_institution', 'accreditation_valid_until'])) {
                $group = 'accreditation';
            } elseif (in_array($key, ['instagram_url', 'youtube_url', 'facebook_url'])) {
                $group = 'social';
            }

            SiteSetting::updateOrCreate(
                ['key' => $key],
                ['value' => $value ?? '', 'group' => $group]
            );
        }

        return redirect()->route('admin.settings.index')->with('success', 'Pengaturan website berhasil disimpan.');
    }
}
