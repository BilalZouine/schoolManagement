<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
    public function rules(): array
    {
        return [
            'firstname' => 'required|string|max:50',
            'lastname' => 'required|string|max:50',
            'email' => 'required|email|max:50',
            'password' => 'required|string|between:8,50',
            'gender' => 'required|string|in:f,m', 
            'blood_type' => 'required|in:a+,a-,b+,b-,ab+,ab-,o+,o-',
            'address' => 'required|string|between:3,255',
            'phone' => 'required|string|between:10,10',
            'date_of_birth' => 'required|date',
        ];
    }
}
