<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;

use App\Models\Users;
use App\Models\Post;
use App\Models\Bid;
use Validator;

class BidsController extends Controller
{
    public function showBids()
    {
        // ddd();
        return Inertia::render('Bids/ViewBids');
    }

    public function createBid(Request $request)
    {
        $formfields = $request->validate([
            'seller_id' => 'required',
            'buyer_id' => 'required',
            'buyer_bid' => 'required|numeric',
            'post_id' =>'required',
            'End_date' => 'required',
        ]);

        $formfields["End date"] = $formfields["End_date"];
        if(Bid::where('post_id', '=', $formfields["post_id"])->exists()) {
            if(Bid::where('post_id', '=', $formfields["post_id"])->where('buyer_id', '=', $formfields["buyer_id"])->exists() ) {
                $bids = Bid::where('post_id', '=', $formfields["post_id"])->orderBy('buyer_bid', "DESC")->first()->get();
                if($formfields["buyer_bid"] <= $bids[0]["buyer_bid"]) {
                    return ["results" => "Your bid is too low"];
                } else {
                    $bid = Bid::where('post_id', '=', $formfields["post_id"])->where('buyer_id', '=', $formfields["buyer_id"])->get();
                    $bid[0]->update($formfields);
                    return $bid;
                }
            } else {
                $bids = Bid::where('post_id', '=', $formfields["post_id"])->orderBy('buyer_bid', "DESC")->first()->get();
                if($formfields["buyer_bid"] <= $bids[0]["buyer_bid"]) {
                    return ["results" => "Your bid is too low"];
                } else {
                    $formfields["seller_haggle_bid"] = 0;
                    $bid = Bid::create($formfields);
                    return $bid;
                }
            }
        } else {
            $formfields["seller_haggle_bid"] = 0;
            $bid = Bid::create($formfields);
            return $bid;
        }
        
        // Create a new bid

        // $formfields = $request->validate([
        //     'seller_id' => 'required',
        //     'buyer_id' => 'required',
        //     'buyer_bid' => 'required|numeric',
        //     'post_id' =>'required',
        // ]);


        // // Create a new bid
        // $bid = Bid::create($request->all());

        // return $bid;
    }

}