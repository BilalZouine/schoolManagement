<?php

namespace App\Http\Requests;

use App\Enums\BloodEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreStudentParentRequest extends FormRequest
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
             'firstname' => 'required|string|min:3|max:50',
            'lastname' => 'required|string|min:3|max:50',
            'email' => Rule::unique("student_parents")->ignore($this->id),
            'password' => 'required|string|between:8,50',
            'gendreapia' => ['required',Rule::in(['M','F'])], 
            'blood_type' => ['required',Rule::enum(BloodEnum::class)],
            'address' => 'required|string|between:3,255',
            'phone' => Rule::unique("student_parents")->ignore($this->id),
            'date_of_birth' => 'required|date',
        ];
    }
}
