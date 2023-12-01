<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

use App\Models\Post;
use App\Models\Painting;
use App\Models\Bid;
use Illuminate\Support\Facades\Redirect;

class MarketPlaceController extends Controller
{   
    public function showMarket(Request $request){

        $posts = Post::join('paintings', 'posts.painting_id', '=', 'paintings.id')
                        ->where("post_status" , "active")
                        ->where("seller_id", "!=", $request->user()->id)
                        ->get(['posts.*', 'paintings.title', 'paintings.description', 
                        'paintings.author_id', 'paintings.paintingimg_link', 'paintings.tag']);

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

        foreach ($tags as $tag) {
            $results = array_merge($results, Post::with('painting')->whereHas('painting', function($query) use($tag, $id) {
                $query->where('tag', 'like', '%' . $tag . '%')->where('author_id', '!=', $id);
            })->get()->toArray());
        }

        return Inertia::render("Dashboard", [
            "posts" => array_unique($results, SORT_REGULAR),
            "tags" => $id
        ]);
    }

    public function removePost($id){
        $painting = Painting::where('id', $id)->first();
        $post = Post::where('painting_id', $id)->get();

        $post = Post::where('painting_id', $id)->first();
        if ($post->post_status == "active"){
            $post["post_status"] = "inactive";
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

    public function searchMarket(){
        return -1;
    }

    public function sortMarket(){
        return -1;
    }

    public function filterMarket(){
        return -1;
    }

}
