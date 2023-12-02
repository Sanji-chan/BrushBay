<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Post;
use App\Models\Painting;
use App\Models\TradeHistory;
use App\Models\Bid;
use App\Models\Notification;
use Validator;

class BidsController extends Controller
{
    public function showBids()
    {   $user = Auth::user();
        // $bids = Bid::where('seller_id', '=', $user->id)->get();
        $bids = Bid::select('bids.*', 'paintings.title as title', 'buyers.name as buyer_name')
                    ->join('posts', 'bids.post_id', '=', 'posts.id')
                    ->join('paintings', 'paintings.id', '=', 'posts.painting_id')
                    ->join('users as buyers', 'bids.buyer_id', '=', 'buyers.id')
                    ->where('bids.seller_id', '=', $user->id)
                    ->get();

        // $posts = $bids->post;
        // return response()->json(["Bids found:" => $bids]);
 
        return Inertia::render('Bids/ViewBids', ['bids'=>$bids]);
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
            $buyer->pcoins = $buyer->pcoins - $formfields["buyer_bid"];
            $buyer->save();
            
            if(Bid::where('post_id', '=', $formfields["post_id"])->where('bid_status', '<>', 'Accepted')->exists()) {
                $bids = Bid::where('post_id', '=', $formfields["post_id"])->where('bid_status', '<>', 'Accepted')->get();
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
                    $formfields["bid_status"] = "Accepted";
                    $formfields["seller_haggle_bid"] = $bids[0]["seller_haggle_bid"];
                    Bid::find($bids[0]['id'])->delete();
                    Bid::create($formfields);
                    $post['seller_id'] = $buyer->id;
                    $post['post_status'] = 'inactive';
                    $post['initial_bid'] = null;
                    $post['highest_bid'] = null;
                    $post->save();
                    Notification::create(array('user_id'=>$formfields["seller_id"], 'message'=>"Your painting ". $post->painting->title ." has been sold."));
                    Notification::create(array('user_id'=>$formfields['buyer_id'], 'message'=>"You have won ". $post->painting->title));
                    $trade_create['painting_id'] = $painting->id;
                    $trade_create['buyer_id'] = $buyer->id;
                    $trade_create['seller_id'] =  $seller->id;
                    $trade_create['trade_amount'] = $formfields["buyer_bid"];
                    $trade = TradeHistory::create($trade_create);
                    return ["success" => "You win"];

                } else if($formfields["buyer_bid"] <= $bids[0]["buyer_bid"]) {
                    $buyer->pcoins = $buyer->pcoins + $formfields["buyer_bid"];
                    $buyer->save();
                    return ["results" => "Your bid is too low"];
                } else {
                    Bid::find($bids[0]['id'])->delete();
                    $refundedBuyer = User::find($bids[0]["buyer_id"]);
                    $refundedBuyer->pcoins = $refundedBuyer->pcoins + $bids[0]["buyer_bid"];
                    $refundedBuyer->save();
                    $post->update(array('highest_bid' => $formfields['buyer_bid']));
                    $formfields["seller_haggle_bid"] = $bids[0]["seller_haggle_bid"];
                    $bid = Bid::create($formfields);
                    Notification::create(array('user_id'=>$formfields["seller_id"], 'message'=>"You have received a new bid of ". $formfields["buyer_bid"] ." pcoins on ". $post->painting->title));
                    Notification::create(array('user_id'=>$bids[0]['buyer_id'], 'message'=>"You have been outbid on ". $post->painting->title));
                    return $bid;
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
                    
                    $formfields["bid_status"] = "Accepted";
                    
                    Bid::create($formfields);
                    $post['seller_id'] = $buyer->id;
                    $post['post_status'] = 'inactive';
                    $post['initial_bid'] = null;
                    $post['highest_bid'] = null;
                    $post->save();
                    
                    Notification::create(array('user_id'=>$formfields["seller_id"], 'message'=>"Your painting ". $post->painting->title ." has been sold."));
                    Notification::create(array('user_id'=>$formfields['buyer_id'], 'message'=>"You have won ". $post->painting->title));
                    $trade_create['painting_id'] = $painting->id;
                    $trade_create['buyer_id'] = $buyer->id;
                    $trade_create['seller_id'] =  $seller->id;
                    $trade_create['trade_amount'] = $formfields["buyer_bid"];
                    $trade = TradeHistory::create($trade_create);
                    return ["success" => "You win"];
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


        // if($buyer->pcoins >= $formfields["buyer_bid"]) {
        //     $buyer->pcoins = $buyer->pcoins - $formfields["buyer_bid"];
        //     $buyer->save(); 
        //     if(Bid::where('post_id', '=', $formfields["post_id"])->exists()) {
                
        //         if(Bid::where('post_id', '=', $formfields["post_id"])->where('buyer_id', '=', $formfields["buyer_id"])->exists() ) {
        //             $bids = Bid::where('post_id', '=', $formfields["post_id"])->orderBy('buyer_bid', "DESC")->get();
                    
        //             if($formfields["buyer_bid"] >= $bids[0]["seller_haggle_bid"]) {
        //                 $painting = Painting::find($post["painting_id"]);
        //                 $seller = User::find($formfields["seller_id"]);
        //                 $refundedBuyer = User::find($bids[0]["buyer_id"]);
        //                 $refundedBuyer->pcoins = $refundedBuyer->pcoins + $bids[0]["buyer_bid"];    
        //                 $refundedBuyer->save();
        //                 $amount = $seller['pcoins'] + $formfields['buyer_bid'];
        //                 // $seller->update(array('pcoins'=> $amount));                        
        //                 $seller->pcoins = $amount;
        //                 $seller->save();
        //                 $painting->update(array('owner_id'=>$formfields['buyer_id']));
        //                 $post->delete();
        //                 Notification::create(array('user_id'=>$formfields["seller_id"], 'message'=>"Your painting ". $post->painting->title ." has been sold."));
        //                 Notification::create(array('user_id'=>$formfields['buyer_id'], 'message'=>"You have won ". $post->painting->title));
        //                 $trade_create['painting_id'] = $painting->id;
        //                 $trade_create['buyer_id'] = $buyer->id;
        //                 $trade_create['seller_id'] =  $seller->id;
        //                 $trade_create['trade_amount'] = $formfields["buyer_bid"];
        //                 $trade = TradeHistory::create($trade_create);
        //                 return ["success" => "You win"];

        //             } else if($formfields["buyer_bid"] <= $bids[0]["buyer_bid"]) {
        //                 $buyer->pcoins = $buyer->pcoins + $formfields["buyer_bid"];
        //                 $buyer->save(); 
        //                 return ["results" => "Your bid is too low"];

        //             } else {
        //                 $bid = Bid::where('post_id', '=', $formfields["post_id"])->where('buyer_id', '=', $formfields["buyer_id"])->get();
        //                 $bid[0]->update($formfields);
        //                 $refundedBuyer = User::find($bids[0]["buyer_id"]);
        //                 $refundedBuyer->pcoins = $refundedBuyer->pcoins + $bids[0]["buyer_bid"];  
        //                 $refundedBuyer->save();
        //                 $post->update(array('highest_bid' => $formfields['buyer_bid']));
        //                 Notification::create(array('user_id'=>$formfields["seller_id"], 'message'=>"You have received a new bid of ". $formfields["buyer_bid"] ." pcoins on ". $post->painting->title));
        //                 if($bids[0]['buyer_id'] != $formfields["buyer_id"] ) {
        //                     Notification::create(array('user_id'=>$bids[0]['buyer_id'], 'message'=>"You have been outbid on ". $post->painting->title));
        //                 }
        //                 return $bid;
        //             }
        //         } else {
        //             $bids = Bid::where('post_id', '=', $formfields["post_id"])->orderBy('buyer_bid', "DESC")->get();
        //             if($formfields["buyer_bid"] >= $bids[0]["seller_haggle_bid"]) {
        //                 $painting = Painting::find($post["painting_id"]);
        //                 $seller = User::find($formfields["seller_id"]);
        //                 $refundedBuyer = User::find($bids[0]["buyer_id"]);
        //                 $refundedBuyer->pcoins = $refundedBuyer->pcoins + $bids[0]["buyer_bid"];    
        //                 $refundedBuyer->save();
        //                 $amount = $seller['pcoins'] + $formfields['buyer_bid'];
        //                 // $seller->update(array('pcoins'=> $amount));                        
        //                 $seller->pcoins = $amount;
        //                 $seller->save();
        //                 $painting->update(array('owner_id'=>$formfields['buyer_id']));
        //                 $post->delete();
        //                 Notification::create(array('user_id'=>$formfields["seller_id"], 'message'=>"Your painting ". $post->painting->title ." has been sold."));
        //                 Notification::create(array('user_id'=>$formfields['buyer_id'], 'message'=>"You have won ". $post->painting->title));
        //                 $trade_create['painting_id'] = $painting->id;
        //                 $trade_create['buyer_id'] = $buyer->id;
        //                 $trade_create['seller_id'] =  $seller->id;
        //                 $trade_create['trade_amount'] = $formfields["buyer_bid"];
        //                 $trade = TradeHistory::create($trade_create);
        //                 return ["success" => "You win"];

        //             } else if($formfields["buyer_bid"] <= $bids[0]["buyer_bid"]) {
        //                 $buyer->pcoins = $buyer->pcoins + $formfields["buyer_bid"];
        //                 $buyer->save();
        //                 return ["results" => "Your bid is too low"];
        //             } else {
        //                 if(!$request->has('seller_haggle_bid')) {
        //                     $formfields['seller_haggle_bid'] = $bids[0]["seller_haggle_bid"];
        //                 }
        //                 $refundedBuyer = User::find($bids[0]["buyer_id"]);
        //                 $refundedBuyer->pcoins = $refundedBuyer->pcoins + $bids[0]["buyer_bid"];
        //                 $refundedBuyer->save();
        //                 $post->update(array('highest_bid' => $formfields['buyer_bid']));
        //                 $bid = Bid::create($formfields);
        //                 Notification::create(array('user_id'=>$formfields["seller_id"], 'message'=>"You have received a new bid of ". $formfields["buyer_bid"] ." pcoins on ". $post->painting->title));
        //                 Notification::create(array('user_id'=>$bids[0]['buyer_id'], 'message'=>"You have been outbid on ". $post->painting->title));
        //                 return $bid;
        //             }
        //         }
        //     } else {
        //         if($formfields["buyer_bid"] >= $post["initial_bid"]) {
        //             $painting = Painting::find($post["painting_id"]);
        //             $seller = User::find($formfields["seller_id"]);
        //             $amount = $seller['pcoins'] + $formfields['buyer_bid'];
        //             // $seller->update(array('pcoins'=> $amount));                        
        //             $seller->pcoins = $amount;
        //             $seller->save();
        //             $painting->update(array('owner_id'=>$formfields['buyer_id']));
        //             $post->delete();
        //             Notification::create(array('user_id'=>$formfields["seller_id"], 'message'=>"Your painting ". $post->painting->title ." has been sold."));
        //             Notification::create(array('user_id'=>$formfields['buyer_id'], 'message'=>"You have won ". $post->painting->title));
        //             $trade_create['painting_id'] = $painting->id;
        //             $trade_create['buyer_id'] = $buyer->id;
        //             $trade_create['seller_id'] =  $seller->id;
        //             $trade_create['trade_amount'] = $formfields["buyer_bid"];
        //             $trade = TradeHistory::create($trade_create);
        //             return ["success" => "You win"];
        //         }
        //         $formfields["seller_haggle_bid"] = $post['initial_bid'];
        //         $bid = Bid::create($formfields);
        //         $post->update(array('highest_bid' => $formfields['buyer_bid']));
        //         // Remove this line if you do not want notifications here 
        //         Notification::create(array('user_id'=>$formfields["seller_id"], 'message'=>"You have received a new bid of ". $formfields["buyer_bid"] ." pcoins on ". $post->painting->title));
        //         return $bid;
        //     }
    
        // } else {
        //     return ["results" => "You do not have sufficient pcoins"];
        // }
        
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

    public function rejectBid($id){
        $bid = Bid::where('id', $id)->where('bid_status', '<>', 'Accepted')->first();
        // Check if the bid exists
        if (!$bid) {
            return response()->json(['error' => 'Bid not found'], 404);
        }else{
            $bid['bid_status'] = 'Rejected';
        }
      
        $bid->save();
        return response()->json(["success" => "Post updated successfully!"]);
    }

    public function haggleBid(Request $request, $id){
    
        $formfields = $request->validate([
                'seller_haggle_bid' => 'required|numeric',
            ]);
            
        $bid = Bid::where('id', $id)->where('bid_status', '<>', 'Accepted')->first();
        // Extra line added below: get post to update initial bid
        $post = Post::where('id', $bid['post_id'])->first();
        // return response()->json([ $request]);
        // Check if the bid exists
        if (!$bid) {
            return response()->json(['error' => 'Seller haggle Bid not found'], 404);
        }else{
            $bid['seller_haggle_bid'] = $formfields['seller_haggle_bid'];  //update haggle bid
            // extra line added below: update post's initial bid with seller_haggle_bid
            $post['initial_bid'] = $formfields['seller_haggle_bid']; 
            $post->save();
        }
      
        $bid->save();
        return response()->json(["success" => "Seller Haggle Bid updated successfully!"]);
    }

    public function acceptBid($id){
        // Get the accepted bid      
        $bid = Bid::where('id', $id)->where('bid_status', '<>', 'Accepted')->first();
        // Get the buyer
        $buyer = User::where('id', $bid->buyer_id)->first();
        // Get the seller based on the painting relationship
        $seller = User::where('id',$bid->seller_id)->first();
        // Get post
        $post = Post::where('id', $bid->post_id)->first();
        // Get painting
        $painting = Painting::where('id', $post->painting_id)->first();
        
        
        try {
            DB::beginTransaction();

            // Change bid status to accept
            if (!$bid) {
                return response()->json(['error' => 'Bid not found'], 404);
            }else{
                $bid['bid_status'] = 'Accepted';
            }
            
            // Change painting owner_id to buyer_id 
            $painting['owner_id'] = $buyer->id;
            $post['seller_id'] = $buyer->id;
            // Subtract the accepted bid from buyer's pcoin
            // $buyer['pcoins'] = $buyer['pcoins'] - $bid->buyer_bid;
            // Add the accepted bid to seller's pcoin
            $seller['pcoins'] = $seller['pcoins'] + $bid->buyer_bid;
                

            // Add transaction details to the transaction table
            $trade_create['painting_id'] = $painting->id;
            $trade_create['buyer_id'] = $buyer->id;
            $trade_create['seller_id'] =  $seller->id;
            $trade_create['trade_amount'] = $bid->buyer_bid;
            $trade = TradeHistory::create($trade_create);
            
            //send sold notification
            Notification::create(array('user_id'=>$seller->id, 'message'=>"Your painting ". $post->painting->title ." has been sold."));
            Notification::create(array('user_id'=>$buyer->id, 'message'=>"You have won ". $post->painting->title));
            
            $bid->save();
            $buyer->save();
            $seller->save();
            $painting->save();
            $post['post_status'] = 'inactive';      // Inactivate the current post
            $post['initial_bid'] = null;
            $post['highest_bid'] = null;
            $post->save();

            DB::commit();
            return response()->json(['message' => 'Bid accepted successfully']);

        } catch (\Exception $e) {
            // If an error occurred, rollback the transaction
            TradeHistory::rollBack();
            ddd($e->getMessage());

            return response()->json(['error' => 'Error accepting bid. Please try again.']);
        }
    }

}

