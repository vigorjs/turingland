<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PropertyCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'developer_id' => 'required|exists:developers,id',
            'area_id' => 'required|exists:areas,id',
            'bathroom_count' => 'required|integer|min:0',
            'bedroom_count' => 'required|integer|min:0',
            'carport_count' => 'required|integer|min:0',
            'land_area' => 'required|numeric|min:0',
            'building_area' => 'required|numeric|min:0',
            'price' => 'required|numeric|min:0',
            'type' => 'required|in:sale,rent',
            'status' => 'nullable|in:active,sold,rented,inactive',
            'address' => 'required|string',
            'certificate_type' => 'nullable|string|max:255',
            'year_built' => 'nullable|integer|digits:4|min:1800|max:' . date('Y'),
            'is_featured' => 'nullable',
            'property_images.*' => 'sometimes|nullable|image|mimes:jpg,jpeg,png|max:2048',
        ];
    }
}
