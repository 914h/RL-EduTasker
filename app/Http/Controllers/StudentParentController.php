<?php

namespace App\Http\Controllers;

use App\Http\Resources\StudentParentResource;
use App\Models\StudentParent;
use App\Http\Requests\StoreStudentParentRequest;
use App\Http\Requests\UpdateStudentParentRequest;
use Hash;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Request;
class StudentParentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $columns = $request->get('columns');
        $parents = !empty($columns) ? StudentParent::all($columns) : StudentParent::all();
        return StudentParentResource::collection($parents);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreStudentParentRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreStudentParentRequest $request)
    {
        $formfields = $request->validated();
        $formfields['password'] = Hash::make($formfields['password']);
        $StudentParent = StudentParent::create($formfields);
        $response = new StudentParentResource($StudentParent);
        return response()->json([
            'parent' => $response,
            'message' => __('Parent created successfully')
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\StudentParent  $studentParent
     * @return \Illuminate\Http\Response
     */
    public function show(StudentParent $studentParent)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateStudentParentRequest  $request
     * @param  \App\Models\StudentParent  $studentParent
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateStudentParentRequest $request, StudentParent $parent)
    {
        $formfields = $request->validated();
        $formfields['password'] = Hash::make($formfields['password']);
        $parent->update($formfields);
        return response()->json([
            'parent' => $parent,
            'message' => __('Parent updated successfully')
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\StudentParent  $studentParent
     * @return \Illuminate\Http\Response
     */
    public function destroy(StudentParent $parent)
    {
        $parent->delete();
        return new StudentParentResource($parent);

    }
}
