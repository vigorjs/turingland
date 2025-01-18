<?php

namespace App\Exports;

use App\Models\Property;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class PropertyExport implements FromCollection, WithHeadings, WithMapping
{
    protected $filters;

    public function __construct($filters = [])
    {
        $this->filters = $filters;
    }

    public function collection()
    {
        return Property::filter($this->filters)->get();
    }

    public function headings(): array
    {
        return [
            'ID',
            'Judul',
            'Area',
            'Harga',
            'Developer',
            'Tipe',
            'Status',
            'Jumlah Kamar Mandi',
            'Jumlah Kamar Tidur',
            'Jumlah Carport',
            'Luas Tanah',
            'Luas Bangunan',
            'Tahun Dibangun',
            'Featured'
        ];
    }

    public function map($property): array
    {
        return [
            $property->id,
            $property->title,
            $property->area->name ?? '',
            $property->price,
            $property->developer->name ?? '',
            $property->type,
            $property->status,
            $property->bathroom_count,
            $property->bedroom_count,
            $property->carport_count,
            $property->land_area,
            $property->building_area,
            $property->year_built,
            $property->is_featured ? 'Ya' : 'Tidak'
        ];
    }
}