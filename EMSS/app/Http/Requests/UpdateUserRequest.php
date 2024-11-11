<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password; 


class UpdateUserRequest extends FormRequest
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
        'Emri' => 'required|string|max:255',
        'Mbiemri' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email,' . $this->route('user')->id,
        'password' => [
            'nullable',
            Password::min(8)
                ->letters()
                ->symbols()
        ],
        'Roli' => 'required|string|max:255',
        'Specializimi' => 'nullable|string|max:255',
        'Viti' => 'nullable|integer|min:1|max:3',
        'Mesatarja' => 'nullable|numeric|min:1|max:5.0'
    ];
}

}
