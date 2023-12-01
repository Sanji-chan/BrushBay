<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;

use App\Models\User;
use App\Models\Post;
use App\Models\Bid;
use App\Models\Notification;
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
        ]);

        $post = Post::find($formfields["post_id"]);
        $buyer = User::find($formfields["buyer_id"]);
        if($buyer->pcoins >= $formfields["buyer_bid"]) {
            if(Bid::where('post_id', '=', $formfields["post_id"])->exists()) {
                if(Bid::where('post_id', '=', $formfields["post_id"])->where('buyer_id', '=', $formfields["buyer_id"])->exists() ) {
                    $bids = Bid::where('post_id', '=', $formfields["post_id"])->orderBy('buyer_bid', "DESC")->first()->get();
                    if($formfields["buyer_bid"] <= $bids[0]["buyer_bid"]) {
                        return ["results" => "Your bid is too low"];
                    } else {
                        $bid = Bid::where('post_id', '=', $formfields["post_id"])->where('buyer_id', '=', $formfields["buyer_id"])->get();
                        $bid[0]->update($formfields);
                        $post->update(array('highest_bid' => $formfields['buyer_bid']));
                        Notification::create(array('user_id'=>$formfields["seller_id"], 'message'=>"You have received a new bid of ". $formfields["buyer_bid"] ." pcoins on ". $post->painting->title));
                        if($bids[0]['buyer_id'] != $formfields["buyer_id"] ) {
                            Notification::create(array('user_id'=>$bids[0]['buyer_id'], 'message'=>"You have been outbid on ". $post->painting->title));
                        }
                        return $bid;
                    }
                } else {
                    $bids = Bid::where('post_id', '=', $formfields["post_id"])->orderBy('buyer_bid', "DESC")->first()->get();
                    if($formfields["buyer_bid"] <= $bids[0]["buyer_bid"]) {
                        return ["results" => "Your bid is too low"];
                    } else {
                        $formfields["seller_haggle_bid"] = 0;
                        $post->update(array('highest_bid' => $formfields['buyer_bid']));
                        $bid = Bid::create($formfields);
                        Notification::create(array('user_id'=>$formfields["seller_id"], 'message'=>"You have received a new bid of ". $formfields["buyer_bid"] ." pcoins on ". $post->painting->title));
                        Notification::create(array('user_id'=>$bids[0]['buyer_id'], 'message'=>"You have been outbid on ". $post->painting->title));
                        return $bid;
                    }
                }
            } else {
                $formfields["seller_haggle_bid"] = 0;
                $bid = Bid::create($formfields);
                $post->update(array('highest_bid' => $formfields['buyer_bid']));
                // Remove this line if you do not want notifications here 
                Notification::create(array('user_id'=>$formfields["seller_id"], 'message'=>"You have received a new bid of ". $formfields["buyer_bid"] ." pcoins on ". $post->painting->title));
                return $bid;
            }
    
        } else {
            return ["results" => "You do not have sufficient pcoins"];
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