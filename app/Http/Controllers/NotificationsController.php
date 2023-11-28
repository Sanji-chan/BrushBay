<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;


class NotificationsController extends Controller
{
    public function showNotifications()
    {   
        return Inertia::render('Notifications/NotificationsPage');
    }
}
