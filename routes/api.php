<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


//Profile image routes
Route::post('upload-profileimage', [ProfileController::class, 'updateprofilepic'])->name('profile.updateprofilepic');
Route::get('get-profileimage/{id}', [ProfileController::class, 'showprofilepic'])->name('profile.showprofilepic');

//Profile information routes
Route::get('getProfileInfo/{id}', [ProfileController::class, 'getProfileInfo'])->name('profile.getProfileInfo');



// Route::middleware('auth')->group(function () {
//     Route::post('upload-profileimage', [ProfileController::class, 'updateprofilepic'])->name('profile.updateprofilepic');
//     Route::get('get-profileimage/{id}', [ProfileController::class, 'showprofilepic'])->name('profile.showprofilepic');
// });
