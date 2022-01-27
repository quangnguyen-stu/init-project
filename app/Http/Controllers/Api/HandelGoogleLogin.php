<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class HandelGoogleLogin extends Controller
{
    public function authenticate($token)
    {
        dd($token);
    }
}
