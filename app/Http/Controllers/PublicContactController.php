<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class PublicContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:50',
            'interest' => 'nullable|string|max:255',
            'message' => 'required|string',
        ]);

        $validated['status'] = 'unread';

        Contact::create($validated);

        return back()->with('success', 'Pesan konsultasi Anda berhasil dikirimkan ke sekretariat prodi.');
    }
}
