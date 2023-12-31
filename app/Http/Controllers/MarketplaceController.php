<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

use App\Models\Post;
use App\Models\Painting;
use App\Models\Bid;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Support\Facades\Redirect;

class MarketPlaceController extends Controller
{   
    public function showMarket(Request $request){

        $posts = Post::join('paintings', 'posts.painting_id', '=', 'paintings.id')
                        ->join('users as sellers', 'posts.seller_id', '=', 'sellers.id')
                        ->join('users as authors', 'paintings.author_id', '=', 'authors.id')
                        ->where("post_status" , "active")
                        ->where("seller_id", "!=", $request->user()->id)
                        ->get(['posts.*', 'paintings.title', 'paintings.description', 
                        'paintings.author_id', 'paintings.paintingimg_link', 'paintings.tag', 'sellers.name as seller_name',  'authors.name as author_name']);

        if (sizeof($posts) == 0){
            return Inertia::render('Marketplace/Market', [ 'status' => False]);
        }else{
            return Inertia::render('Marketplace/Market', [ 'status' => True, 'posts' => $posts]);
        }

    }

    public function getPaintingsByTags(Request $request): Response 
    {
        $tags = $request->user()->preferences;
        $tags = explode(',', $tags);
        $results = array();
        $id = $request->user()->id;
        $userpcoin =  $request->user()->pcoins;

        foreach ($tags as $tag) {
            $results = array_merge($results, Post::with('painting')->whereHas('painting', function($query) use($tag, $id) {
                $query->where('tag', 'like', '%' . $tag . '%')->where('owner_id', '!=', $id);
            })->where("post_status" , "active")->get()->toArray());
        }

        return Inertia::render("Dashboard", [
            "posts" => array_unique($results, SORT_REGULAR),
            "tags" => $id,
            'userpcoin' => $userpcoin
        ]);
    }

    public function removePost($id){
        $painting = Painting::where('id', $id)->first();
        $post = Post::where('painting_id', $id)->get();
        
        $post = Post::where('painting_id', $id)->first();
        if ($post->post_status == "active"){
            $post["post_status"] = "inactive";
        }

        $bid = Bid::where('post_id', $post->id)->where('bid_status', '<>', 'Accepted')->where('bid_status', '<>', 'Rejected')->first();
    
        if (!$bid) {
            $post->save();
            return response()->json(['Message' => $post->id], 404);
        }else{
            $bid['bid_status'] = 'Rejected';
            $bid->save();
            Notification::create(array('user_id'=>$bid->buyer_id, 'message'=>"Your bid on ".  $post->painting->title ." has been rejected."));
            $refundedBuyer = User::find($bid["buyer_id"]);
            $refundedBuyer->pcoins = $refundedBuyer->pcoins + $bid["buyer_bid"];    
            $refundedBuyer->save();
        }    
           
        $post["highest_bid"] = null;

        $post->save();
        return response()->json(["success" => "Post updated successfully!"]);
       
    }
    public function postPainting(Request $request, $id){
        // return response()->json($request);
        $painting = Painting::where('id', $id)->first();
        $post = Post::where('painting_id', $id)->get();

        if (sizeof($post) == 0){ // create post
            $post_create["painting_id"] = $painting->id;
            $post_create["seller_id"] = $painting->owner_id;
            $post_create["post_status"] = "active";
            $post_create["initial_bid"] = $request[0];
            $post_create["updated_at"] = $request[1];
            $post = Post::create($post_create);
            return response()->json(["success" => "Post created successfully!"]);
        }else{  // togglePostStatus

            $post = Post::where('painting_id', $id)->first();
            if ($post->post_status == "active"){
                $post["post_status"] = "inactive";
            }else{
                $post["initial_bid"] = $request[0];
                // $post["updated_at"] = $request[1];
                $post["post_status"] = "active";
            }
            $post->save();
            return response()->json(["success" => "Post updated successfully!"]);
        }
    }

    public function editPost(Request $request){
        $post = $request->validate([
            'initial_bid' => 'required',
            'post_status' => 'required',
        ]);

    }


}
