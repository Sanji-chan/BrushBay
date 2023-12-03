<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;


class NotificationsController extends Controller
{
    public function index($id)
    {
        $notifications = Notification::where('user_id', $id)->latest()->get();
    
        return response()->json($notifications);
    }

    public function showNotifications(Request $request)
    {   $user_name = Auth::user()->name;
        return Inertia::render('Notifications/NotificationsPage', [
            "notifications" => Notification::where('user_id', $request->user()->id)->get(),
            'userName' =>$user_name
        ]);
    }

    public function addNotifications(Request $request) {

        $formfields = $request->validate([
            'user_id' => 'required',
            'message' => 'required',
        ]);

        $notification = Notification::create($formfields);
        return $notification;
    }
}
