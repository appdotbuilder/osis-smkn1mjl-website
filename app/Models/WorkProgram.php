<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\WorkProgram
 *
 * @property int $id
 * @property string $title
 * @property string $description
 * @property string $academic_year
 * @property string $category
 * @property string $status
 * @property \Illuminate\Support\Carbon $start_date
 * @property \Illuminate\Support\Carbon|null $end_date
 * @property array|null $objectives
 * @property string|null $outcome
 * @property bool $is_featured
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|WorkProgram newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkProgram newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkProgram query()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkProgram featured()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkProgram byYear(string $year)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkProgram byStatus(string $status)
 * @method static \Database\Factories\WorkProgramFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class WorkProgram extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'description',
        'academic_year',
        'category',
        'status',
        'start_date',
        'end_date',
        'objectives',
        'outcome',
        'is_featured',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'objectives' => 'array',
        'is_featured' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Scope a query to only include featured programs.
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Scope a query to filter programs by academic year.
     */
    public function scopeByYear($query, string $year)
    {
        return $query->where('academic_year', $year);
    }

    /**
     * Scope a query to filter programs by status.
     */
    public function scopeByStatus($query, string $status)
    {
        return $query->where('status', $status);
    }
}