<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\PaintingController;
use App\Http\Controllers\MarketplaceController;

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
Route::get('tag/', [TagController::class, 'getAllTags']);
Route::post('userPrefs/', [ProfileController::class, 'updatePreferences']);
//Profile information routes
Route::get('getProfileInfo/{id}', [ProfileController::class, 'getProfileInfo'])->name('profile.getProfileInfo');


//Painting routes
Route::post('paintings/', [PaintingController::class, 'addPainting']);
Route::get('paintings/', [PaintingController::class, 'getPaintings']);


//Market
Route::post('paintings/addPost/{id}', [MarketplaceController::class, 'postPainting'])->name('marketplace.postPainting');

