<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(RegisterRequest $request){
        $data = $request->validated();
        /** @var \App\Models\User $user */
           $user = User::create([
                'Emri' => $data['Emri'],
                'Mbiemri' => $data['Mbiemri'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'Roli' => $data['Roli']
           ]);
           $token = $user->createToken('main')->plainTextToken;

           return response(compact('user', 'token'));
    }

    public function login(LoginRequest $request)
{
    $credentials = $request->validated();

    if (!Auth::attempt($credentials)) {
        return response([
            'message' => 'Provided email address or password is incorrect']);
    }

        /** @var \App\Models\User $user */

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }

    public function logout(Request $request)
{
    /** @var User $user */
    $user = $request->user();
    $user->currentAccessToken()->delete();
    return response('',204);
    
}
}
