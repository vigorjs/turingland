<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
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
        return $this->belongsToMany(Category::class, 'property_categories');
    }

    public function scopeFilter(Builder $query, $filters)
    {
        if(!empty($filters['orderAdsFilter'])) {
            if($filters['orderAdsFilter'] == "Terbaru") $query->orderBy('created_at', 'desc');
            else if($filters['orderAdsFilter'] == "Harga Termurah") $query->orderBy('price', 'asc');
            else if($filters['orderAdsFilter'] == "Luas Bangunan Terluas") $query->orderBy('building_area', 'desc');
            else if($filters['orderAdsFilter'] == "Luas Tanah Terluas") $query->orderBy('land_area', 'desc');
        }

        if (!empty($filters['title'])) {
            $query->where('title', 'like', '%' . $filters['title'] . '%');
        }

        // Untuk category_id
        if (!empty($filters['category_id'])) {
            $query->whereHas('categories', function ($query) use ($filters) {
                $query->where('categories.id', $filters['category_id']);
            });
        }

        // Filter berdasarkan lokasi
        if (!empty($filters['location_id'])) {
            $query->whereHas('area', function ($query) use ($filters) {
                $query->where('location_id', $filters['location_id']);
            });
        }

        // Filter berdasarkan area (jika dipilih)
        if (!empty($filters['area_id'])) {
            $query->where('area_id', (int) $filters['area_id']);
        }

        if (!empty($filters['price_min']) && !empty($filters['price_max'])) {
            $query->whereBetween('price', [$filters['price_min'], $filters['price_max']]);
        } elseif (!empty($filters['price_min'])) {
            $query->where('price', '>=', $filters['price_min']);
        } elseif (!empty($filters['price_max'])) {
            $query->where('price', '<=', $filters['price_max']);
        }

        if (!empty($filters['developer_id'])) {
            $query->where('developer_id', $filters['developer_id']);
        }

        if (!empty($filters['type'])) {
            // $query->where('type', $filters['type']);
            $query->where('type', $filters['type']);
        }

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['bathroom_count'])) {
            $query->where('bathroom_count', '>=', $filters['bathroom_count']);
        }

        if (!empty($filters['bedroom_count'])) {
            $query->where('bedroom_count', '>=', $filters['bedroom_count']);
        }

        if (!empty($filters['carport_count'])) {
            $query->where('carport_count', '>=', $filters['carport_count']);
        }

        // Filter untuk land_area
        if (!empty($filters['land_area_min']) && !empty($filters['land_area_max'])) {
            $query->whereBetween('land_area', [$filters['land_area_min'], $filters['land_area_max']]);
        } elseif (!empty($filters['land_area_min'])) {
            $query->where('land_area', '>=', $filters['land_area_min']);
        } elseif (!empty($filters['land_area_max'])) {
            $query->where('land_area', '<=', $filters['land_area_max']);
        }

        // Filter untuk building_area
        if (!empty($filters['building_area_min']) && !empty($filters['building_area_max'])) {
            $query->whereBetween('building_area', [$filters['building_area_min'], $filters['building_area_max']]);
        } elseif (!empty($filters['building_area_min'])) {
            $query->where('building_area', '>=', $filters['building_area_min']);
        } elseif (!empty($filters['building_area_max'])) {
            $query->where('building_area', '<=', $filters['building_area_max']);
        }


        if (!empty($filters['year_built'])) {
            $query->where('year_built', $filters['year_built']);
        }

        if (!empty($filters['is_featured'])) {
            $query->where('is_featured', filter_var($filters['is_featured'], FILTER_VALIDATE_BOOLEAN));
        }
    }
}
