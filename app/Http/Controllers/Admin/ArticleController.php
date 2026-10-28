<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::with('category')->latest()->paginate(15);
        return view('admin.articles.index', compact('articles'));
    }

    public function create()
    {
        $categories = Category::orderBy('name')->get();
        return view('admin.articles.form', [
            'article' => new Article(),
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'nullable|exists:categories,id',
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'read_time' => 'nullable|string|max:50',
            'is_featured' => 'nullable|boolean',
            'photo' => 'nullable|image|max:2048',
        ]);

        $validated['slug'] = Str::slug($validated['title']) . '-' . Str::random(5);
        $validated['is_featured'] = $request->has('is_featured');
        $validated['published_at'] = now();

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('articles', 'public');
            $validated['photo_url'] = '/storage/' . $path;
        }

        Article::create($validated);

        return redirect()->route('admin.articles.index')->with('success', 'Artikel berhasil diterbitkan.');
    }

    public function edit(Article $article)
    {
        $categories = Category::orderBy('name')->get();
        return view('admin.articles.form', compact('article', 'categories'));
    }

    public function update(Request $request, Article $article)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'nullable|exists:categories,id',
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'read_time' => 'nullable|string|max:50',
            'is_featured' => 'nullable|boolean',
            'photo' => 'nullable|image|max:2048',
        ]);

        $validated['is_featured'] = $request->has('is_featured');

        if ($request->hasFile('photo')) {
            if ($article->photo_url && str_starts_with($article->photo_url, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $article->photo_url));
            }
            $path = $request->file('photo')->store('articles', 'public');
            $validated['photo_url'] = '/storage/' . $path;
        }

        $article->update($validated);

        return redirect()->route('admin.articles.index')->with('success', 'Artikel berhasil diperbarui.');
    }

    public function destroy(Article $article)
    {
        if ($article->photo_url && str_starts_with($article->photo_url, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $article->photo_url));
        }
        $article->delete();

        return redirect()->route('admin.articles.index')->with('success', 'Artikel berhasil dihapus.');
    }
}
