<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuickLink extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'url',
        'logo_url',
        'show_title',
        'order',
        'is_active',
    ];

    protected $casts = [
        'show_title' => 'boolean',
        'is_active' => 'boolean',
        'order' => 'integer',
    ];
}
