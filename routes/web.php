<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('about', [HomeController::class,'about'])->name('home.about');
Route::get('/login', [AuthController::class, 'login'])->name('login');

Route::post('/login', [AuthController::class, 'authenticate'])->name('authenticate');
Route::get('/logout', [AuthController::class, 'userLogOut'])->middleware('auth')->name('logout');
Route::resource('home', HomeController::class);

Route::get('redirect/{driver}', [AuthController::class,'redirectToProvider'])
        ->name('login.provider')
        ->where('driver', implode('|', config('auth.socialite.drivers')));

Route::get('auth/{driver}/callback', [AuthController::class, 'handleProviderCallback']);

Route::middleware('auth')->group(function () {
//    Route::get('/', function () {
//        return redirect('/home');
//    });
});
