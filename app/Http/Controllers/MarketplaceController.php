<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Inertia\Response;


use Illuminate\Http\Request;

class MarketPlaceController extends Controller
{
    public function showMarket(){
        return Inertia::render('Marketplace/Market');
    }

    public function searchMarket(){
        return 1;
    }

    public function sortMarket(){
        return 1;
    }

    public function filterMarket(){
        return 1;
    }

}
