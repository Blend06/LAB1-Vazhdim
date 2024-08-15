<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Sanctum Guards
    |--------------------------------------------------------------------------
    |
    | Sanctum provides authentication features for APIs. This section
    | defines the guards that Sanctum will use to authenticate requests.
    |
    */

    'guards' => [
        'web' => [
            'driver' => 'session',
        ],

        'api' => [
            'driver' => 'sanctum',
            'provider' => 'students', // Use the students provider
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Sanctum Expiration
    |--------------------------------------------------------------------------
    |
    | Here you can specify the expiration time for Sanctum tokens. This
    | value is in minutes. You can change this value to adjust the
    | expiration time of your tokens.
    |
    */

    'expiration' => [
        'api' => env('SANCTUM_EXPIRATION_TIME', 525600), // 1 year
    ],

    /*
    |--------------------------------------------------------------------------
    | Sanctum Middleware
    |--------------------------------------------------------------------------
    |
    | This middleware is assigned to the "sanctum" middleware group.
    | Feel free to add this middleware to any route or controller
    | that you want to protect with Sanctum.
    |
    */

    'middleware' => [
        'encrypt_cookies' => \Illuminate\Cookie\Middleware\EncryptCookies::class,
    ],
];