<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Pastikan hanya developer/superadmin yang dapat mengakses.
     */
    protected function checkDevAccess(): void
    {
        if (!auth()->check() || !auth()->user()->isDev()) {
            abort(403, 'Akses Ditolak: Fitur Kelola Akun Pengguna hanya diperuntukkan bagi Administrator Developer / Superadmin.');
        }
    }

    /**
     * Tampilkan daftar seluruh pengguna admin.
     */
    public function index(Request $request)
    {
        $this->checkDevAccess();

        $roleFilter = $request->get('role', 'all');
        $search = $request->get('search', '');

        $query = User::latest();

        if ($roleFilter === 'dev') {
            $query->whereIn('role', ['dev', 'superadmin']);
        } elseif ($roleFilter === 'admin') {
            $query->where('role', 'admin');
        }

        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $users = $query->paginate(10)->withQueryString();
        $totalCount = User::count();
        $devCount = User::whereIn('role', ['dev', 'superadmin'])->count();
        $adminCount = User::where('role', 'admin')->count();

        return view('admin.users.index', compact('users', 'totalCount', 'devCount', 'adminCount', 'roleFilter', 'search'));
    }

    /**
     * Simpan akun admin baru.
     */
    public function store(Request $request)
    {
        $this->checkDevAccess();

        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'role' => ['required', 'string', 'in:dev,admin'],
            'password' => ['required', 'string', 'min:6'],
        ], [
            'name.required' => 'Nama pengguna wajib diisi.',
            'email.required' => 'Email wajib diisi.',
            'email.unique' => 'Email ini sudah terdaftar di sistem.',
            'role.required' => 'Peran pengguna wajib dipilih.',
            'password.required' => 'Password wajib diisi.',
            'password.min' => 'Password minimal terdiri dari 6 karakter.',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'password' => Hash::make($request->password),
        ]);

        return redirect()->route('admin.users.index')->with('success', "Akun '{$request->name}' berhasil dibuat!");
    }

    /**
     * Perbarui data akun admin.
     */
    public function update(Request $request, User $user)
    {
        $this->checkDevAccess();

        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'role' => ['required', 'string', 'in:dev,admin'],
            'password' => ['nullable', 'string', 'min:6'],
        ], [
            'name.required' => 'Nama pengguna wajib diisi.',
            'email.required' => 'Email wajib diisi.',
            'email.unique' => 'Email ini sudah digunakan oleh akun lain.',
            'role.required' => 'Peran pengguna wajib dipilih.',
            'password.min' => 'Password minimal 6 karakter jika ingin diubah.',
        ]);

        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
        ];

        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        return redirect()->route('admin.users.index')->with('success', "Data akun '{$user->name}' berhasil diperbarui!");
    }

    /**
     * Hapus akun admin.
     */
    public function destroy(User $user)
    {
        $this->checkDevAccess();

        if ($user->id === auth()->id()) {
            return back()->with('error', 'Tindakan Ditolak: Anda tidak dapat menghapus akun Anda sendiri yang sedang aktif login.');
        }

        $name = $user->name;
        $user->delete();

        return redirect()->route('admin.users.index')->with('success', "Akun '{$name}' berhasil dihapus.");
    }
}
