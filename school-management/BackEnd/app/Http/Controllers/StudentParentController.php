<?php

namespace App\Http\Controllers;

use App\Models\StudentParent;
use App\Http\Requests\StoreStudentParentRequest;
use App\Http\Requests\UpdateStudentParentRequest;
use App\Http\Resources\StudentParentResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class StudentParentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(StudentParent::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentParentRequest $request): JsonResponse
    {
        $formFieldes =  $request->validated();
        $formFieldes['last_login_date'] = new \DateTime();
        $formFieldes['password'] = Hash::make($formFieldes['password']);
        $studentParent = StudentParent::create($formFieldes);
        return response()->json([
            "data" => new StudentParentResource($studentParent),
            "message" => __("Parent created successfully!")
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(StudentParent $studentParent)
    {
        return new StudentParentResource($studentParent);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentParentRequest $request, StudentParent $studentParent)
    {
        $validatedData = $request->validated();
        $validatedData['last_login_date'] = now();

        if (isset($validatedData['password']) && !empty($validatedData['password'])) {
            $validatedData['password'] = Hash::make($validatedData['password']);
        } else {
            unset($validatedData['password']);
        }

        $studentParent->update($validatedData);
        unset($validatedData);

        return response()->json([
            "data" => new StudentParentResource($studentParent),
            "message" => __("Parent updated successfully!")
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StudentParent $studentParent)
    {
        try {
            $studentParent->delete();
            return response()->json([
                "data" => new StudentParentResource($studentParent),
                "message" => __("Parent updated successfully!")
            ]);
        } catch (\Exception $e) {
            Log::error('error delete student parent: ' . $e);
            return response()->json([
                "data" => new StudentParentResource($studentParent),
                "message" => __("has error when deleting parent.")
            ], 503);
        }
    }
}
