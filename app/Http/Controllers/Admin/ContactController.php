<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index(Request $request)
    {
        $status = $request->get('status', 'all');

        $query = Contact::latest();

        if ($status === 'unread') {
            $query->where('status', 'unread');
        } elseif ($status === 'read') {
            $query->where('status', 'read');
        }

        $contacts = $query->paginate(15)->withQueryString();
        $unreadCount = Contact::where('status', 'unread')->count();
        $totalCount = Contact::count();

        return view('admin.contacts.index', compact('contacts', 'status', 'unreadCount', 'totalCount'));
    }

    public function markAsRead(Contact $contact)
    {
        $contact->update(['status' => 'read']);
        return back()->with('success', 'Status pesan berhasil ditandai sebagai sudah dibaca.');
    }

    public function destroy(Contact $contact)
    {
        $contact->delete();
        return back()->with('success', 'Pesan konsultasi berhasil dihapus.');
    }
}
