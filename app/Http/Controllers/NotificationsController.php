<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;
use App\Models\Notification;

class NotificationsController extends Controller
{
    public function showNotifications(Request $request)
    {   
        return Inertia::render('Notifications/NotificationsPage', [
            "notifications" => Notification::where('user_id', $request->user()->id)->get()
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
