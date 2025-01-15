<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [ 'string', 'max:255'],
            'email' => [
                // 'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
            'wa_number' => [
                $this->user()->hasRole('agent') ? 'required' : 'nullable',
                'string',
                'max:15'
            ],
            'photo' => $this->hasFile('photo') ? 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048' : 'nullable',
        ];
    }
}
