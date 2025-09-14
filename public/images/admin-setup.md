# OSIS Admin Panel - File Upload Setup Guide

## 📋 Overview
This Laravel application includes a comprehensive admin panel with robust file upload functionality for managing:
- Activities with gallery images
- Announcements with featured images  
- Organization member photos
- Testimonials with user photos
- Document downloads
- Member registrations and feedback management

## 🔧 Required Setup

### 1. Storage Link Creation
Run this command to create the storage symbolic link:
```bash
php artisan storage:link
```

### 2. Directory Permissions (Linux/Unix)
Ensure proper permissions for storage directories:
```bash
chmod -R 775 storage/
chmod -R 775 public/storage/
chown -R www-data:www-data storage/
chown -R www-data:www-data public/storage/
```

### 3. Required Storage Directories
The application will automatically create these directories when files are uploaded:
- `storage/app/public/activities/gallery/` - Activity gallery images
- `storage/app/public/announcements/` - Announcement images
- `storage/app/public/organization-members/` - Member photos
- `storage/app/public/testimonials/` - Testimonial photos
- `storage/app/public/downloads/` - Downloadable files

## 🛡️ Security Features

### File Upload Validation
- **Image files**: JPEG, PNG, JPG, WebP formats only
- **File size limits**: 5MB for images, 50MB for documents
- **MIME type validation**: Server-side verification
- **File extension validation**: Double-checked on backend

### Form Security
- **CSRF Protection**: All forms include CSRF tokens
- **XSS Protection**: Input sanitization and validation
- **Authorization**: Admin middleware protection
- **Validation**: Custom Form Request classes

### Upload Features
- **Multiple file upload**: Gallery support for activities
- **File preview**: Image preview before upload
- **File management**: Edit and delete uploaded files
- **Drag & drop**: Modern upload interface

## 🎛️ Admin Panel Features

### Activities Management (`/admin/activities`)
- ✅ Create/Edit/Delete activities
- ✅ Upload multiple gallery images (max 10)
- ✅ Category filtering and search
- ✅ Featured activities toggle
- ✅ Date-based organization

### Announcements Management (`/admin/announcements`)
- ✅ Rich text announcements
- ✅ Featured image upload
- ✅ Publication scheduling
- ✅ Type categorization
- ✅ Active/inactive status

### Organization Members (`/admin/organization-members`)
- ✅ Member profile management
- ✅ Photo upload for each member
- ✅ Position ordering
- ✅ Period-based organization

### Downloads Management (`/admin/downloads`)
- ✅ File upload with type detection
- ✅ Automatic file size calculation
- ✅ Category-based organization
- ✅ Download tracking

### Data Management
- ✅ Member registrations review
- ✅ Feedback management and responses
- ✅ Testimonials with ratings
- ✅ Bulk operations support

## 🚀 Quick Start

### 1. Access Admin Panel
Visit `/admin` after logging in to access the dashboard.

### 2. Upload Your First Activity
1. Go to `/admin/activities/create`
2. Fill in the form details
3. Upload gallery images (drag & drop supported)
4. Set as featured if desired
5. Save the activity

### 3. Manage File Permissions
The application handles file permissions automatically, but ensure:
- Web server has write access to `storage/app/public/`
- Symbolic link exists from `public/storage` to `storage/app/public`

## 📊 File Upload Limits

| Content Type | Max File Size | Allowed Formats | Max Files |
|-------------|---------------|-----------------|-----------|
| Activity Gallery | 5MB per image | JPEG, PNG, JPG, WebP | 10 images |
| Announcements | 5MB | JPEG, PNG, JPG, WebP | 1 image |
| Member Photos | 5MB | JPEG, PNG, JPG, WebP | 1 image |
| Downloads | 50MB | All file types | 1 file |

## 🔍 Troubleshooting

### Storage Link Issues
If images don't display, recreate the storage link:
```bash
rm public/storage
php artisan storage:link
```

### Permission Issues
Reset storage permissions:
```bash
sudo chown -R www-data:www-data storage/
sudo chmod -R 755 storage/
```

### Upload Failures
Check PHP configuration:
```ini
upload_max_filesize = 50M
post_max_size = 50M
max_execution_time = 300
memory_limit = 256M
```

## 🎯 Demo Features

The welcome page (`/`) showcases:
- 🎛️ Admin Panel access button
- 📱 Responsive design
- 🔍 Search and filtering
- 📊 Statistics dashboard
- 🖼️ Image gallery previews

## 🛠️ Technical Stack

- **Backend**: Laravel 11 with Form Requests
- **Frontend**: React + TypeScript + Inertia.js
- **UI**: Tailwind CSS + shadcn/ui components
- **File Storage**: Laravel Filesystem (Local/S3 compatible)
- **Validation**: Custom validation rules with error messages
- **Security**: CSRF, XSS protection, file type validation

This admin panel demonstrates enterprise-level file upload handling with comprehensive validation, security measures, and user-friendly interfaces.