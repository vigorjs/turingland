<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Area extends Model
{
    protected $fillable = [
        'name',
        'location_id',
        'description',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean'
    ];

    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class);
    }

    public function properties(): HasMany
    {
        return $this->hasMany(Property::class);
    }

    // public function locations(): HasMany
    // {
    //     return $this->hasMany(Location::class);
    // }
}
