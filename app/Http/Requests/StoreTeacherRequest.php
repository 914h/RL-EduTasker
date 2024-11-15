<?php

namespace App\Http\Requests;

use App\Models\Teacher;
use Illuminate\Foundation\Http\FormRequest;

class StoreTeacherRequest extends FormRequest
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
        'email' => 'required|email|unique:student_parents',
        'phone' => 'required|max:10|unique:student_parents',
        ];
    }
}
