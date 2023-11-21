<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

use App\Models\Post;
use App\Models\Painting;
use Illuminate\Support\Facades\Redirect;

class MarketPlaceController extends Controller
{   
    public function showMarket(){

        $posts = Post::join('paintings', 'posts.painting_id', '=', 'paintings.id')
                        ->where("post_status" , "active")
                        ->get(['posts.*', 'paintings.title', 'paintings.description', 'paintings.author_id', 'paintings.paintingimg_link', 'paintings.tag']);
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

        foreach ($tags as $tag) {
            $results = array_merge($results, Post::with('painting')->whereHas('painting', function($query) use($tag) {
                $query->where('tag', 'like', '%' . $tag . '%');
            })->get()->toArray());
        }

        // $results = Post::with('painting')->whereHas('painting', function($query) use($tag) {
        //     $query->where('tag', 'like', '%' . $tag . '%');
        // })->get()->toArray();

        return Inertia::render("Dashboard", [
            "posts" => array_unique($results, SORT_REGULAR),
            "tags" => $tags
        ]);
    }


    public function postPainting($id){
        
        $painting = Painting::where('id', $id)->first();
        $post = Post::where('painting_id', $id)->get();

        if (sizeof($post) == 0){ // create post
            $post_create["painting_id"] = $painting->id;
            $post_create["seller_id"] = $painting->owner_id;
            $post_create["post_status"] = "active";
            $post = Post::create($post_create);
            return response()->json(["success" => "Post created successfully!"]);
        }else{  // togglePostStatus

            $post = Post::where('painting_id', $id)->first();
            if ($post->post_status == "active"){
                $post["post_status"] = "inactive";
            }else{
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
