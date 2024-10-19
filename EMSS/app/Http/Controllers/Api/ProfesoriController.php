<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProfesoriResource;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;

class ProfesoriController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ProfesoriResource::collection(
        User::query()->where('Roli', 'Profesor')->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $user = User::create($data);
        return response(new ProfesoriResource($user), 201);    
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new ProfesoriResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
    
        if (empty($data['password'])) {
            unset($data['password']);
        } else {
            $data['password'] = bcrypt($data['password']);  
        }
    
        $user->update($data);
    
        return new ProfesoriResource($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response("", 204);
    }
}
