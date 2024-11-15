<?php

namespace App\Http\Controllers;

use App\Http\Requests\DevoirRequest;
use App\Http\Resources\DevoirResource;
use App\Models\devoir;
use Illuminate\Http\Request;
use Storage;

class DevoirController extends Controller
{
    public function index(Request $request)
    {
        return DevoirResource::collection(devoir::all());
        
        // $devoirs = Devoir::where('teacher_id', auth()->user()->teacher->id)
        //     ->where('class_id', $request->class_id)
        //     ->where('module_id', $request->module_id)
        //     ->with(['teacher', 'class', 'module'])
        //     ->get();

        // return response()->json($devoirs);
    }
    public function store (DevoirRequest $request){

        $formfields = $request->validated();
        $path = $request->file('file_path')->store('devoirs', 'public');
        $formfields['file_path'] = $path;

        $devoir = devoir::create($formfields);
        $response = new DevoirResource($devoir);
        return response()->json([
            'parent' => $response,
            'message' => __('Devoir Added successfully')
        ]);
    }
    public function destroy(Devoir $devoir)
    {
        // Check if the authenticated teacher owns this devoir
        if ($devoir->teacher_id !== auth()->user()->teacher->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Delete the file
        Storage::disk('public')->delete($devoir->file_path);

        // Delete the record
        $devoir->delete();

        return response()->json(['message' => 'Devoir deleted successfully']);
        return new DevoirResource(resource: $devoir);

    }
}
