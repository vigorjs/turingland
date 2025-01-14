<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Property extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'developer_id',
        'area_id',
        'user_id',
        'bathroom_count',
        'bedroom_count',
        'carport_count',
        'land_area',
        'building_area',
        'price',
        'type',
        'status',
        'address',
        'certificate_type',
        'year_built',
        'is_featured'
    ];

    protected $casts = [
        'land_area' => 'decimal:2',
        'building_area' => 'decimal:2',
        'price' => 'decimal:2',
        'year_built' => 'integer',
        'is_featured' => 'boolean',
        'bathroom_count' => 'integer',
        'bedroom_count' => 'integer',
        'carport_count' => 'integer'
    ];

    public function developer(): BelongsTo
    {
        return $this->belongsTo(Developer::class);
    }

    public function area(): BelongsTo
    {
        return $this->belongsTo(Area::class);
    }

    public function agent(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function images(): HasMany
    {
        return $this->hasMany(PropertyImage::class, 'property_id', 'id');
    }

    public function categories()
    {
    return $this->belongsToMany(Category::class, 'property_category');
    }
}
