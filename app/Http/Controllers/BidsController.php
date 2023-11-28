<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;

use App\Models\Users;
use App\Models\Post;
use App\Bid;

class BidsController extends Controller
{
    public function showBids()
    {
        // ddd();
        return Inertia::render('Bids/ViewBids');
    }

    public function createBid(Request $request)
    {
        // Validate the request data
        $request->validate([
            'seller_id' => 'required',
            'buyer_id' => 'required',
            'buyer_bid' => 'required|numeric',
            'post_id' =>'required',
        ]);

        // Create a new bid
        Bid::create($request->all());

       
    }

}