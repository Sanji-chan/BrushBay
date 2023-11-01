<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TagController;

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

Route::post('upload-profileimage', [ProfileController::class, 'updateprofilepic'])->name('profile.updateprofilepic');
Route::get('get-profileimage/{id}', [ProfileController::class, 'showprofilepic'])->name('profile.showprofilepic');
Route::get('tag/', [TagController::class, 'getAllTags']);
Route::post('userPrefs/', [ProfileController::class, 'updatePreferences']);

// Route::middleware('auth')->group(function () {
//     Route::get('upload-profileimage', [ProfileController::class, 'updateprofilepic'])->name('profile.updateprofilepic');
// });