<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\MemberRegistration
 *
 * @property int $id
 * @property string $full_name
 * @property string $email
 * @property string $phone
 * @property string $class
 * @property string $student_id
 * @property string $motivation
 * @property string|null $preferred_division
 * @property array|null $skills
 * @property string $status
 * @property string|null $notes

 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|MemberRegistration newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MemberRegistration newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MemberRegistration query()
 * @method static \Illuminate\Database\Eloquent\Builder|MemberRegistration byStatus(string $status)
 * @method static \Database\Factories\MemberRegistrationFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class MemberRegistration extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'full_name',
        'email',
        'phone',
        'class',
        'student_id',
        'motivation',
        'preferred_division',
        'skills',
        'status',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'skills' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Scope a query to filter registrations by status.
     */
    public function scopeByStatus($query, string $status)
    {
        return $query->where('status', $status);
    }
}