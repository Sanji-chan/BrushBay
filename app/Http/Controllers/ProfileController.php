<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Painting;

use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Illuminate\Support\Facades\Route;

class ProfileController extends Controller
{   
    //Handle user edit page

    /**
     * Display the user's profile to edit page
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {           
        $request->user()->fill($request->validated());

        // dd($request->user());
        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        $formFields = $request->validate([
            "dob" => "required",
            "preferences" => "min:0",
        ]);

        // $time = strtotime($formFields["dob"]);
        // $formFields["dob"] = date('Y-m-d', $time);
        
        $request->user()->update($formFields);
        // DB::table('users')
        //     ->where('email', $request['email'])  // find your user by their email
        //     ->limit(1)  // optional - to ensure only one record is updated.
        //     ->update(['dob' => $request['dob']]);  // update the record in the DB. 

        return Redirect::route('profile.edit');
    }


    public function updatePreferences(Request $request) {
        DB::table('users')
            ->where('email', $request->email)
            ->update(['preferences'=> $request->preferences]);
        return Redirect::to('/dashboard');
    }


     /**
     * handle profile information
     */

     public function showProfile($id){
        // return response()->json([$id]);
    //     $trades = Painting::join('trade_history', 'paintings.id', '=', 'trade_history.painting_id')
    //     ->join('users as buyers', 'trade_history.buyer_id', '=', 'buyers.id')
    //     ->join('users as sellers', 'trade_history.seller_id', '=', 'sellers.id')
    //   ->where(function ($query) use ($user) {
    //       $query->where('seller_id', $user->id)
    //           ->orWhere('buyer_id', $user->id);})
    //   ->get(['paintings.*', 'trade_history.*', 'buyers.name as buyer_name', 'sellers.name as seller_name']);

        $owned = Painting::where('paintings.owner_id', '=',$id)->get();
        $created = Painting::where('paintings.author_id', '=', $id)->get();

        // return response()->json(['message' => $id, $owned, $created], 404);


        return Inertia::render('Profile/View', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'userid' => $id,
            'owned' => $owned,
            'created' => $created,
        ]);

     }

     public function getProfileInfo($id){
        $user = User::find($id);

        $owned = Painting::where('paintings.owner_id', '=',$id)->get();
        $created = Painting::where('paintings.author_id', '=',$id)->get();

        if (!$user) {
            return response()->json(['message' => 'User not found', 'value'=>$id], 404);
        }
        // dd($user);
        return $user;
     }

    //  public function getCreated($id){
    //     $user = User::find($id);
    //     $created = Painting::where('paintings.author_id', '=', $id)->get();
    //     if (!$user) {
    //         return response()->json(['message' => 'Created paintings not found', 'value'=>$id], 404);
    //     }
    //     return $created;
    //  }

    //  public function getOwned($id){
    //     $user = User::find($id);
    //     $owned = Painting::where('paintings.owner_id', '=',$id)->get();
    //     if (!$user) {
    //         return response()->json(['message' => 'Owned paintings not found', 'value'=>$id], 404);
    //     }
    //     dd($owned);
    //     return $owned;
    //  }


     /**
     * handle profile picture
     */
    

    public function updateprofilepic(Request $request): RedirectResponse
    {  
        if ($request->has('image')){
            $image = $request->file('image');
            $name = 'userimg_';
            $name = $name.$request->user_id;
            $name = $name.".".$image->getClientOriginalExtension();

            DB::table('users')
                ->where('id',  $request->user_id)
                ->update(['userimg_link'=>$name]);

            $request->file('image')->storeAs('userimages/', $name, 'public');
            session()->put('success', 'Image updated successfully');
            return Redirect::route('profile.edit');

        }else{
            return response()->json(['message'=>"please try again"]);
        }
    }

    public function showprofilepic($id){

        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found', 'value'=>$id], 404);
        }

        $imageName = $user->userimg_link;

        $path = public_path('storage\\userimages\\' . $imageName);
        // return response()->json(['message' => 'Image not found', 'imagePath'=>$path], 404);

        if (file_exists($path)) {
            // return response()->file($path)->header('Content-Type', mime_content_type($path));
            $response = new BinaryFileResponse($path);

            $response->headers->set('Content-Type', mime_content_type($path));
        
            // If you want to force the download of the file, you can set a specific Content-Disposition header:
            $response->setContentDisposition(
                ResponseHeaderBag::DISPOSITION_ATTACHMENT,
                $imageName
            );
        
            return $response;
        }
        
        else{
            return response()->json(['message' => 'Image not found', 'path'=>$path], 404);
        }
    
    }
    



    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
