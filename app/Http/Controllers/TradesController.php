<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use App\Models\User;
use App\Models\TradeHistory;
use App\Models\Painting;

class TradesController extends Controller
{
    public function showTrades()
    {
        $user = Auth::user();
        $trades = Painting::join('trade_history', 'paintings.id', '=', 'trade_history.painting_id')
                        ->where(function ($query) use ($user) {
                            $query->where('seller_id', $user->id)
                                ->orWhere('buyer_id', $user->id);})
                        ->get(['paintings.*', 'trade_history.*']);

        return Inertia::render('History/TradeHistory', ['tradeData'=>$trades]);
    }
}
