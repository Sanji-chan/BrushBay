<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;
use App\Models\Painting;
use Illuminate\Support\Facades\Route;

class PaintingController extends Controller
{
    //
    public function show(Request $request): Response 
    {
        return Inertia::render("Portfolio/Portfolio", [
            "paintings" => Painting::with('author')->where('author_id', $request->user()->id)->get()
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
}
