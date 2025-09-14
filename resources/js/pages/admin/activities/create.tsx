import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

interface ActivityFormData {
    title: string;
    description: string;
    category: string;
    gallery_images: File[];
    video_url: string;
    activity_date: string;
    is_featured: boolean;
    [key: string]: string | File[] | boolean;
}

export default function CreateActivity() {
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const { data, setData, post, processing, errors } = useForm<ActivityFormData>({
        title: '',
        description: '',
        category: '',
        gallery_images: [],
        video_url: '',
        activity_date: '',
        is_featured: false,
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 10) {
            alert('Maksimal 10 gambar yang dapat diunggah');
            return;
        }

        setSelectedImages(files);
        setData('gallery_images', files);

        // Create previews
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const removeImage = (index: number) => {
        const newImages = selectedImages.filter((_, i) => i !== index);
        const newPreviews = imagePreviews.filter((_, i) => i !== index);
        
        setSelectedImages(newImages);
        setImagePreviews(newPreviews);
        setData('gallery_images', newImages);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Update data with selected images
        setData('gallery_images', selectedImages);
        
        // Submit with files
        post(route('admin.activities.store'), {
            forceFormData: true,
        });
    };

    const categoryOptions = [
        { value: 'academic', label: '📚 Akademik' },
        { value: 'social', label: '🤝 Sosial' },
        { value: 'sports', label: '⚽ Olahraga' },
        { value: 'arts', label: '🎨 Seni' },
        { value: 'volunteer', label: '🙋 Volunteer' },
        { value: 'competition', label: '🏆 Kompetisi' },
    ];

    return (
        <AppLayout>
            <div className="p-6">
                <div className="mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">📅 Tambah Kegiatan Baru</h1>
                            <p className="text-gray-600 mt-1">Buat kegiatan baru dengan dukungan upload gambar</p>
                        </div>
                        <Link href={route('admin.activities.index')}>
                            <Button variant="outline">
                                ← Kembali
                            </Button>
                        </Link>
                    </div>
                </div>

                <Card className="max-w-4xl">
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Title */}
                        <div>
                            <Label htmlFor="title">Judul Kegiatan *</Label>
                            <Input
                                id="title"
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Masukkan judul kegiatan..."
                                className="mt-1"
                            />
                            {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
                        </div>

                        {/* Description */}
                        <div>
                            <Label htmlFor="description">Deskripsi Kegiatan *</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Jelaskan detail kegiatan..."
                                rows={5}
                                className="mt-1"
                            />
                            {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Category */}
                            <div>
                                <Label htmlFor="category">Kategori *</Label>
                                <select
                                    id="category"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Pilih kategori...</option>
                                    {categoryOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category}</p>}
                            </div>

                            {/* Activity Date */}
                            <div>
                                <Label htmlFor="activity_date">Tanggal Kegiatan *</Label>
                                <Input
                                    id="activity_date"
                                    type="date"
                                    value={data.activity_date}
                                    onChange={(e) => setData('activity_date', e.target.value)}
                                    className="mt-1"
                                />
                                {errors.activity_date && <p className="text-red-600 text-sm mt-1">{errors.activity_date}</p>}
                            </div>
                        </div>

                        {/* Video URL */}
                        <div>
                            <Label htmlFor="video_url">URL Video (Opsional)</Label>
                            <Input
                                id="video_url"
                                type="url"
                                value={data.video_url}
                                onChange={(e) => setData('video_url', e.target.value)}
                                placeholder="https://youtube.com/watch?v=..."
                                className="mt-1"
                            />
                            {errors.video_url && <p className="text-red-600 text-sm mt-1">{errors.video_url}</p>}
                            <p className="text-gray-500 text-sm mt-1">Link video YouTube atau platform lain</p>
                        </div>

                        {/* Gallery Images */}
                        <div>
                            <Label htmlFor="gallery_images">Galeri Foto (Maksimal 10 gambar)</Label>
                            <div className="mt-2">
                                <input
                                    id="gallery_images"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                {errors.gallery_images && <p className="text-red-600 text-sm mt-1">{errors.gallery_images}</p>}
                                <p className="text-gray-500 text-sm mt-1">
                                    Format: JPEG, PNG, JPG, WebP. Ukuran maksimal: 5MB per gambar.
                                </p>
                            </div>

                            {/* Image Previews */}
                            {imagePreviews.length > 0 && (
                                <div className="mt-4">
                                    <p className="text-sm font-medium text-gray-700 mb-2">Preview Gambar:</p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {imagePreviews.map((preview, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={preview}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-24 object-cover rounded-lg border"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Is Featured */}
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="is_featured"
                                checked={data.is_featured}
                                onCheckedChange={(checked) => setData('is_featured', checked as boolean)}
                            />
                            <Label htmlFor="is_featured" className="text-sm">
                                ⭐ Jadikan kegiatan unggulan
                            </Label>
                        </div>

                        {/* Submit Button */}
                        <div className="flex items-center justify-between pt-6 border-t">
                            <Link href={route('admin.activities.index')}>
                                <Button type="button" variant="outline">
                                    Batal
                                </Button>
                            </Link>
                            <Button type="submit" disabled={processing} className="bg-blue-600 hover:bg-blue-700">
                                {processing ? '⏳ Menyimpan...' : '💾 Simpan Kegiatan'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}