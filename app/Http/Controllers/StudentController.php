<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Http\Resources\StudentResource;
use App\Models\User;
use Hash;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): AnonymousResourceCollection
    {
        return StudentResource::collection(User::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreStudentRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreStudentRequest $request)
    {
        $formfields = $request->validated();
        $formfields['password'] = Hash::make($formfields['password']);
        $Student = User::create($formfields);
        $response = new StudentResource($Student);
        return response()->json([
            'student' => $response,
            'message' => __('student created successfully')
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $studentParent
     * @return \Illuminate\Http\Response
     */
    public function show(User $studentParent)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateStudentRequest  $request
     * @param  \App\Models\User  $studentParent
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateStudentRequest $request, User $student)
    {
        $formfields = $request->validated();
        $formfields['password'] = Hash::make($formfields['password']);
        $student->update($formfields);
        return response()->json([
            'student' => new StudentResource($student),
            'message' => __('student updated successfully')
        ]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $studentParent
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $student)
    {
        $student->delete();
        return new StudentResource($student);

    }
}
