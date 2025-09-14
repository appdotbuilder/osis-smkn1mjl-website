<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\OrganizationMember
 *
 * @property int $id
 * @property string $name
 * @property string $position
 * @property string $class
 * @property string|null $photo_path
 * @property string|null $bio
 * @property int $order_position
 * @property bool $is_active
 * @property string $period
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|OrganizationMember newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OrganizationMember newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OrganizationMember query()
 * @method static \Illuminate\Database\Eloquent\Builder|OrganizationMember active()
 * @method static \Illuminate\Database\Eloquent\Builder|OrganizationMember byPeriod(string $period)
 * @method static \Illuminate\Database\Eloquent\Builder|OrganizationMember ordered()
 * @method static \Database\Factories\OrganizationMemberFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class OrganizationMember extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'position',
        'class',
        'photo_path',
        'bio',
        'order_position',
        'is_active',
        'period',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
        'order_position' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Scope a query to only include active members.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to filter members by period.
     */
    public function scopeByPeriod($query, string $period)
    {
        return $query->where('period', $period);
    }

    /**
     * Scope a query to order members by position.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order_position');
    }
}