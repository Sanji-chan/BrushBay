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
use App\Models\Painting;
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
            'seller_haggle_bid' => 'numeric',
        ]);


        $post = Post::find($formfields["post_id"]);
        $buyer = User::find($formfields["buyer_id"]);

        if($buyer->pcoins >= $formfields["buyer_bid"]) {
            $buyer->pcoins = $buyer->pcoins - $formfields["buyer_bid"];
            $buyer->save(); 
            if(Bid::where('post_id', '=', $formfields["post_id"])->exists()) {
                
                if(Bid::where('post_id', '=', $formfields["post_id"])->where('buyer_id', '=', $formfields["buyer_id"])->exists() ) {
                    $bids = Bid::where('post_id', '=', $formfields["post_id"])->orderBy('buyer_bid', "DESC")->get();
                    
                    if($formfields["buyer_bid"] >= $bids[0]["seller_haggle_bid"]) {
                        $painting = Painting::find($post["painting_id"]);
                        $seller = User::find($formfields["seller_id"]);
                        $refundedBuyer = User::find($bids[0]["buyer_id"]);
                        $refundedBuyer->pcoins = $refundedBuyer->pcoins + $bids[0]["buyer_bid"];    
                        $refundedBuyer->save();
                        $amount = $seller['pcoins'] + $formfields['buyer_bid'];
                        // $seller->update(array('pcoins'=> $amount));                        
                        $seller->pcoins = $amount;
                        $seller->save();
                        $painting->update(array('owner_id'=>$formfields['buyer_id']));
                        $post->delete();
                        Notification::create(array('user_id'=>$formfields["seller_id"], 'message'=>"Your painting ". $post->painting->title ." has been sold."));
                        Notification::create(array('user_id'=>$formfields['buyer_id'], 'message'=>"You have won ". $post->painting->title));
                        return ["results" => "You win"];

                    } else if($formfields["buyer_bid"] <= $bids[0]["buyer_bid"]) {
                        
                        return ["results" => "Your bid is too low"];

                    } else {
                        $bid = Bid::where('post_id', '=', $formfields["post_id"])->where('buyer_id', '=', $formfields["buyer_id"])->get();
                        $bid[0]->update($formfields);
                        $refundedBuyer = User::find($bids[0]["buyer_id"]);
                        $refundedBuyer->pcoins = $refundedBuyer->pcoins + $bids[0]["buyer_bid"];  
                        $refundedBuyer->save();
                        $post->update(array('highest_bid' => $formfields['buyer_bid']));
                        Notification::create(array('user_id'=>$formfields["seller_id"], 'message'=>"You have received a new bid of ". $formfields["buyer_bid"] ." pcoins on ". $post->painting->title));
                        if($bids[0]['buyer_id'] != $formfields["buyer_id"] ) {
                            Notification::create(array('user_id'=>$bids[0]['buyer_id'], 'message'=>"You have been outbid on ". $post->painting->title));
                        }
                        return $bid;
                    }
                } else {
                    $bids = Bid::where('post_id', '=', $formfields["post_id"])->orderBy('buyer_bid', "DESC")->get();
                    if($formfields["buyer_bid"] >= $bids[0]["seller_haggle_bid"]) {
                        $painting = Painting::find($post["painting_id"]);
                        $seller = User::find($formfields["seller_id"]);
                        $refundedBuyer = User::find($bids[0]["buyer_id"]);
                        $refundedBuyer->pcoins = $refundedBuyer->pcoins + $bids[0]["buyer_bid"];    
                        $refundedBuyer->save();
                        $amount = $seller['pcoins'] + $formfields['buyer_bid'];
                        // $seller->update(array('pcoins'=> $amount));                        
                        $seller->pcoins = $amount;
                        $seller->save();
                        $painting->update(array('owner_id'=>$formfields['buyer_id']));
                        $post->delete();
                        Notification::create(array('user_id'=>$formfields["seller_id"], 'message'=>"Your painting ". $post->painting->title ." has been sold."));
                        Notification::create(array('user_id'=>$formfields['buyer_id'], 'message'=>"You have won ". $post->painting->title));
                        return ["results" => "You win"];

                    } else if($formfields["buyer_bid"] <= $bids[0]["buyer_bid"]) {
                        return ["results" => "Your bid is too low"];
                    } else {
                        if(!$request->has('seller_haggle_bid')) {
                            $formfields['seller_haggle_bid'] = $bids[0]["seller_haggle_bid"];
                        }
                        $refundedBuyer = User::find($bids[0]["buyer_id"]);
                        $refundedBuyer->pcoins = $refundedBuyer->pcoins + $bids[0]["buyer_bid"];
                        $refundedBuyer->save();
                        $post->update(array('highest_bid' => $formfields['buyer_bid']));
                        $bid = Bid::create($formfields);
                        Notification::create(array('user_id'=>$formfields["seller_id"], 'message'=>"You have received a new bid of ". $formfields["buyer_bid"] ." pcoins on ". $post->painting->title));
                        Notification::create(array('user_id'=>$bids[0]['buyer_id'], 'message'=>"You have been outbid on ". $post->painting->title));
                        return $bid;
                    }
                }
            } else {
                if($formfields["buyer_bid"] >= $post["initial_bid"]) {
                    $painting = Painting::find($post["painting_id"]);
                    $seller = User::find($formfields["seller_id"]);
                    $amount = $seller['pcoins'] + $formfields['buyer_bid'];
                    // $seller->update(array('pcoins'=> $amount));                        
                    $seller->pcoins = $amount;
                    $seller->save();
                    $painting->update(array('owner_id'=>$formfields['buyer_id']));
                    $post->delete();
                    Notification::create(array('user_id'=>$formfields["seller_id"], 'message'=>"Your painting ". $post->painting->title ." has been sold."));
                    Notification::create(array('user_id'=>$formfields['buyer_id'], 'message'=>"You have won ". $post->painting->title));
                    return ["results" => "You win"];
                }
                $formfields["seller_haggle_bid"] = $post['initial_bid'];
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