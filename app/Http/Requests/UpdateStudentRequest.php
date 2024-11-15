<?php

namespace App\Http\Requests;

use App\Models\StudentParent;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateStudentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'prenom' => 'required|max:50',
            'nom' => 'required|max:50',
            'birthdate' => 'required|date',
            'gender' => ['required', Rule::in(['m','f'])],
            'address' => 'required',
            'email' => Rule::unique('users')->ignore($this->id),
            'phone' => Rule::unique('users')->ignore($this->id),
            'student_parent_id' => Rule::exists(StudentParent::class, 'id'),
            'password' => 'required'
        ];
    }
}
