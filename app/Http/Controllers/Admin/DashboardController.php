<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Contact;
use App\Models\Gallery;
use App\Models\Lecturer;

class DashboardController extends Controller
{
    public function index()
    {
        $totalLecturers = Lecturer::count();
        $totalArticles = Article::count();
        $totalGalleries = Gallery::count();
        $totalContacts = Contact::count();

        $recentArticles = Article::with('category')->latest()->take(5)->get();
        $recentLecturers = Lecturer::take(4)->get();

        return view('admin.dashboard', compact(
            'totalLecturers',
            'totalArticles',
            'totalGalleries',
            'totalContacts',
            'recentArticles',
            'recentLecturers'
        ));
    }
}
