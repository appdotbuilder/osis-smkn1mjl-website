<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileUploadService
{
    /**
     * Upload a single file to the specified disk and directory.
     *
     * @param UploadedFile $file
     * @param string $directory
     * @param string $disk
     * @return string The file path
     */
    public function uploadFile(UploadedFile $file, string $directory, string $disk = 'public'): string
    {
        // Generate a unique filename
        $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
        
        // Store the file
        $path = $file->storeAs($directory, $filename, $disk);
        
        return $path;
    }

    /**
     * Upload multiple files to the specified disk and directory.
     *
     * @param array $files
     * @param string $directory
     * @param string $disk
     * @return array Array of file paths
     */
    public function uploadMultipleFiles(array $files, string $directory, string $disk = 'public'): array
    {
        $paths = [];
        
        foreach ($files as $file) {
            if ($file instanceof UploadedFile) {
                $paths[] = $this->uploadFile($file, $directory, $disk);
            }
        }
        
        return $paths;
    }

    /**
     * Delete a file from storage.
     *
     * @param string $path
     * @param string $disk
     * @return bool
     */
    public function deleteFile(string $path, string $disk = 'public'): bool
    {
        if (Storage::disk($disk)->exists($path)) {
            return Storage::disk($disk)->delete($path);
        }
        
        return true;
    }

    /**
     * Delete multiple files from storage.
     *
     * @param array $paths
     * @param string $disk
     * @return bool
     */
    public function deleteMultipleFiles(array $paths, string $disk = 'public'): bool
    {
        $success = true;
        
        foreach ($paths as $path) {
            if (!$this->deleteFile($path, $disk)) {
                $success = false;
            }
        }
        
        return $success;
    }

    /**
     * Get the file size in human readable format.
     *
     * @param UploadedFile $file
     * @return string
     */
    public function getFileSize(UploadedFile $file): string
    {
        $size = $file->getSize();
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        
        for ($i = 0; $size > 1024 && $i < count($units) - 1; $i++) {
            $size /= 1024;
        }
        
        return round($size, 2) . ' ' . $units[$i];
    }

    /**
     * Validate file upload requirements.
     *
     * @param UploadedFile $file
     * @param array $allowedMimes
     * @param int $maxSize Maximum size in bytes
     * @return array
     */
    public function validateFile(UploadedFile $file, array $allowedMimes = [], int $maxSize = 5242880): array
    {
        $errors = [];
        
        // Check file size (default 5MB)
        if ($file->getSize() > $maxSize) {
            $errors[] = 'File size exceeds maximum allowed size of ' . $this->getFileSize($file);
        }
        
        // Check MIME type
        if (!empty($allowedMimes) && !in_array($file->getMimeType(), $allowedMimes)) {
            $errors[] = 'File type not allowed. Allowed types: ' . implode(', ', $allowedMimes);
        }
        
        // Check if file is valid
        if (!$file->isValid()) {
            $errors[] = 'Invalid file upload';
        }
        
        return $errors;
    }


}