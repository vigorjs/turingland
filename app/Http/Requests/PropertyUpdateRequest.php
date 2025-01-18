<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PropertyUpdateRequest extends FormRequest
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
            'status' => 'required|in:active,sold,rented,inactive',
            'address' => 'required|string',
            'is_featured' => 'nullable',
            'new_images.*.file' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'existing_images.*.id' => 'nullable|exists:property_images,id',
        ];
    }
}
