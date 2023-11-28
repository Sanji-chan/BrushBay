<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;


class TradesController extends Controller
{
    public function showTrades()
    {
        // ddd();
        return Inertia::render('History/TradeHistory');
    }
}
