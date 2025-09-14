<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    /**
     * Display the contact page.
     */
    public function index()
    {
        $contactInfo = [
            'school_name' => 'SMK Negeri 1 Majalengka',
            'address' => 'Jl. Tonjong Pinangrejo No. 30, Majalengka, Jawa Barat 45418',
            'phone' => '(0233) 281234',
            'email' => 'info@smkn1majalengka.sch.id',
            'website' => 'https://smkn1majalengka.sch.id',
            'osis_email' => 'osis@smkn1majalengka.sch.id',
            'social_media' => [
                'instagram' => 'https://instagram.com/osis_smkn1majalengka',
                'youtube' => 'https://youtube.com/@osissmkn1majalengka',
                'facebook' => 'https://facebook.com/osis.smkn1majalengka',
                'tiktok' => 'https://tiktok.com/@osis_smkn1mjlk',
            ],
            'coordinates' => [
                'lat' => -6.8368,
                'lng' => 108.2277,
            ],
        ];

        return Inertia::render('contact/index', [
            'contactInfo' => $contactInfo,
        ]);
    }
}