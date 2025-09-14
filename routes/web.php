<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\WorkProgramController;
use App\Http\Controllers\ProfileController as OsisProfileController;
use App\Http\Controllers\MemberRegistrationController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\DownloadController;
use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Home page with OSIS content
Route::get('/', [HomeController::class, 'index'])->name('home');

// Public OSIS pages
Route::get('/announcements', [AnnouncementController::class, 'index'])->name('announcements.index');
Route::get('/announcements/{announcement}', [AnnouncementController::class, 'show'])->name('announcements.show');

Route::get('/activities', [ActivityController::class, 'index'])->name('activities.index');
Route::get('/activities/{activity}', [ActivityController::class, 'show'])->name('activities.show');

Route::get('/work-programs', [WorkProgramController::class, 'index'])->name('work-programs.index');
Route::get('/work-programs/{workProgram}', [WorkProgramController::class, 'show'])->name('work-programs.show');

Route::get('/profile', [OsisProfileController::class, 'index'])->name('osis.profile');

Route::get('/contact', [ContactController::class, 'index'])->name('contact');

Route::get('/downloads', [DownloadController::class, 'index'])->name('downloads.index');
Route::get('/downloads/{download}', [DownloadController::class, 'show'])->name('downloads.show');

// Forms
Route::get('/join', [MemberRegistrationController::class, 'create'])->name('member-registration.create');
Route::post('/join', [MemberRegistrationController::class, 'store'])->name('member-registration.store');

Route::get('/feedback', [FeedbackController::class, 'create'])->name('feedback.create');
Route::post('/feedback', [FeedbackController::class, 'store'])->name('feedback.store');

// FAQ page
Route::get('/faq', function () {
    return Inertia::render('faq/index');
})->name('faq');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Admin routes - protected by auth and admin middleware
Route::middleware(['auth', 'verified', App\Http\Middleware\AdminMiddleware::class])
    ->prefix('admin')
    ->group(base_path('routes/admin.php'));

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
