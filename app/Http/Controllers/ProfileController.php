<?php

namespace App\Http\Controllers;

use App\Models\OrganizationMember;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    /**
     * Display the OSIS profile page.
     */
    public function index()
    {
        $currentMembers = OrganizationMember::active()
            ->byPeriod('2024/2025')
            ->ordered()
            ->get()
            ->groupBy('position');

        $leaders = $currentMembers->filter(function ($members, $position) {
            return in_array($position, ['Ketua OSIS', 'Wakil Ketua OSIS', 'Sekretaris', 'Bendahara']);
        });

        $coordinators = $currentMembers->filter(function ($members, $position) {
            return str_contains($position, 'Koordinator');
        });

        $regularMembers = $currentMembers->get('Anggota', collect());

        return Inertia::render('profile/index', [
            'leaders' => $leaders,
            'coordinators' => $coordinators,
            'regularMembers' => $regularMembers,
        ]);
    }
}