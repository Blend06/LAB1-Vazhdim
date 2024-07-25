<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(LoginRequest $request){
        $data = $request->validated();
            User::create([
                'email' =>$data['email'],
                'password' => bcrypt($data['password'])
            ]);
    }

    public function register(RegisterRequest $request){

    }

    public function logout(Request $request){

    }

}
