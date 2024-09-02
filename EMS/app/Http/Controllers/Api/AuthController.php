<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Models\Student;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(RegisterRequest $request){
        $data = $request->validated();
        /** @var \App\Models\Student $user */
           $user = Student::create([
                'Emri' => $data['name'],
                'Mbiemri' => $data['mbiemri'],
                'Email' => $data['email'],
                'password' => Hash::make($data['password']),
                'Roli' => $data['roli']
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

        /** @var \App\Models\Student $user */

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }

    public function logout(Request $request)
{
    /** @var Student $user */
    $user = $request->user();

    if ($user && $user->currentAccessToken()) {
        // Log the current access token for debugging purposes
        Log::info('Logging out user', [
            'user_id' => $user->id,
            'token' => $user->currentAccessToken(),
        ]);

        $user->currentAccessToken()->delete();

        return response()->json(['message' => 'Successfully logged out'], 200);
    }

    return response()->json(['message' => 'No active token found'], 404);
}
}
