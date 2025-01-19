<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Location extends Model
{
    protected $fillable = [
        'name',
        'description',
        'is_active',
        'area_id'
    ];

    protected $casts = [
        'is_active' => 'boolean'
    ];

    public function areas(): HasMany
    {
        return $this->hasMany(Area::class);
    }

    // public function properties(): HasMany
    // {
    //     return $this->hasMany(Property::class);
    // }
}
