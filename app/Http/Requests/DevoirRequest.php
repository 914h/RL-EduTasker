<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DevoirRequest extends FormRequest
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
            'title' => 'required|max:50',
            'description' => 'required|max:255',
            'file_path' => 'required|file|mimes:pdf|max:10240',
            'teacher_id' => 'required|exists:teachers,id',
            'class_id' => 'required|exists:classes,id',
            'module_id' => 'required|exists:modules,id',
        ];
    }
}
