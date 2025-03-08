<?php

namespace App\Http\Requests;

use App\Enums\BloodEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class UpdateStudentParentRequest extends FormRequest
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


    public function rules()
    {
        return [
            'firstname' => 'required|string|min:3|max:50',
            'lastname' => 'required|string|min:3|max:50',
            'email' => 'required|email',
            'password' => 'nullable|string|between:8,50',
            'gendre' => ['required', Rule::in(['M', 'F'])],
            'blood_type' => ['required', Rule::enum(BloodEnum::class)],
            'address' => 'required|string|between:3,255',
            'phone' => 'required|max:15',
            'date_of_birth' => 'required|date',
        ];
    }
}
