<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;
use App\Models\Painting;
use App\Models\Post;

use Illuminate\Support\Facades\Route;

class PaintingController extends Controller
{
    //
    public function show(Request $request): Response 
    {    $paintings = Painting::leftJoin('posts', 'paintings.id', '=', 'posts.painting_id')
           ->where("author_id" , $request->user()->id)
           ->get(['paintings.*', 'posts.post_status', 'posts.highest_bid', 'posts.initial_bid']);

        return Inertia::render("Portfolio/Portfolio", [
            // "paintings" => Painting::with('author')->where('author_id', $request->user()->id)->get()
            "paintings" => $paintings
        ]);
    }

    public function getPaintings() {
        $paintings = Painting::with('author')->where('author_id', 1)->get();
        return $paintings;
    }

    public function addPainting(Request $request) {
        $formfields = $request->validate([
            "title" => "required",
            "description" => "required",
            "tag" => "required",
            "paintingimg_link" => "image|required",
            "owner_id" => "required",
            "author_id" => "required",
        ]);


        $formfields["paintingimg_link"] = $request->file("paintingimg_link")->store('paintings', 'public');
        $painting = Painting::create($formfields);

        return Redirect::route('dashboard');
    }

    public function deletePainting($id) {
        $result =  Painting::where('id', $id)->delete();
        // The line below doesn't work
        return Redirect::route('paintings.show');
    }

    public function updatePainting(Request $request, $id) {
        $formfields = $request->validate([
            "title" => "required",
            "description" => "required",
            "tag" => "required",
            "paintingimg_link" => "image",
        ]);

        if($request->file('paintingimg_link') != "") {
            $formfields["paintingimg_link"] = $request->file("paintingimg_link")->store('paintings', 'public');
        }

        $painting = Painting::find($id);
        $painting->update($formfields);
        return $painting;
    }
}
