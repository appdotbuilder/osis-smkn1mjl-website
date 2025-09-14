<?php

use App\Http\Controllers\Admin\ActivityController;
use App\Http\Controllers\Admin\AnnouncementController;
use App\Http\Controllers\Admin\WorkProgramController;
use App\Http\Controllers\Admin\OrganizationMemberController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\Admin\DownloadController;
use App\Http\Controllers\Admin\MemberRegistrationController;
use App\Http\Controllers\Admin\FeedbackController;
use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Support\Facades\Route;

// Admin dashboard
Route::get('/', [DashboardController::class, 'index'])->name('admin.dashboard');

// Admin resource routes
Route::resource('activities', ActivityController::class)->names([
    'index' => 'admin.activities.index',
    'create' => 'admin.activities.create',
    'store' => 'admin.activities.store',
    'show' => 'admin.activities.show',
    'edit' => 'admin.activities.edit',
    'update' => 'admin.activities.update',
    'destroy' => 'admin.activities.destroy',
]);

Route::resource('announcements', AnnouncementController::class)->names([
    'index' => 'admin.announcements.index',
    'create' => 'admin.announcements.create',
    'store' => 'admin.announcements.store',
    'show' => 'admin.announcements.show',
    'edit' => 'admin.announcements.edit',
    'update' => 'admin.announcements.update',
    'destroy' => 'admin.announcements.destroy',
]);

Route::resource('work-programs', WorkProgramController::class)->names([
    'index' => 'admin.work-programs.index',
    'create' => 'admin.work-programs.create',
    'store' => 'admin.work-programs.store',
    'show' => 'admin.work-programs.show',
    'edit' => 'admin.work-programs.edit',
    'update' => 'admin.work-programs.update',
    'destroy' => 'admin.work-programs.destroy',
]);

Route::resource('organization-members', OrganizationMemberController::class)->names([
    'index' => 'admin.organization-members.index',
    'create' => 'admin.organization-members.create',
    'store' => 'admin.organization-members.store',
    'show' => 'admin.organization-members.show',
    'edit' => 'admin.organization-members.edit',
    'update' => 'admin.organization-members.update',
    'destroy' => 'admin.organization-members.destroy',
]);

Route::resource('testimonials', TestimonialController::class)->names([
    'index' => 'admin.testimonials.index',
    'create' => 'admin.testimonials.create',
    'store' => 'admin.testimonials.store',
    'show' => 'admin.testimonials.show',
    'edit' => 'admin.testimonials.edit',
    'update' => 'admin.testimonials.update',
    'destroy' => 'admin.testimonials.destroy',
]);

Route::resource('downloads', DownloadController::class)->names([
    'index' => 'admin.downloads.index',
    'create' => 'admin.downloads.create',
    'store' => 'admin.downloads.store',
    'show' => 'admin.downloads.show',
    'edit' => 'admin.downloads.edit',
    'update' => 'admin.downloads.update',
    'destroy' => 'admin.downloads.destroy',
]);

Route::resource('member-registrations', MemberRegistrationController::class)->except(['create', 'store'])->names([
    'index' => 'admin.member-registrations.index',
    'show' => 'admin.member-registrations.show',
    'edit' => 'admin.member-registrations.edit',
    'update' => 'admin.member-registrations.update',
    'destroy' => 'admin.member-registrations.destroy',
]);

Route::resource('feedback', FeedbackController::class)->except(['create', 'store'])->names([
    'index' => 'admin.feedback.index',
    'show' => 'admin.feedback.show',
    'edit' => 'admin.feedback.edit',
    'update' => 'admin.feedback.update',
    'destroy' => 'admin.feedback.destroy',
]);