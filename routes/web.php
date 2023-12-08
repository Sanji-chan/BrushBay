<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PaintingController;
use App\Http\Controllers\MarketplaceController;
use App\Http\Controllers\BidsController;
use App\Http\Controllers\TradesController;
use App\Http\Controllers\NotificationsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

// Home route
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/dashboard', [MarketplaceController::class, 'getPaintingsByTags'])->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    // Profile routes
    Route::get('/profile/{slug}', [ProfileController::class, 'showProfile'])->name('profile.showProfile');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Painting or Portfolio routes
    Route::get('/paintings', [PaintingController::class, 'show'])->name('paintings.show');
    Route::get('/portfolio', function() {
        return Inertia::render('Portfolio');
    });

    // Marketplace routes
    Route::get('/marketplace', [MarketplaceController::class, 'showMarket'])->name('marketplace.showMarket');

    // Bids
    Route::get('/bids', [BidsController::class, 'showBids'])->name('bids.showBids');


    // Trade
    Route::get('/tradehistory', [TradesController::class, 'showTrades'])->name('trades.showTrades');

    // Notif
    Route::get('/notifications', [NotificationsController::class, 'showNotifications'])->name('notifications.showNotifications');


});



require __DIR__.'/auth.php';
