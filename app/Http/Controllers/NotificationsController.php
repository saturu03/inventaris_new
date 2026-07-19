<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class NotificationsController extends Controller
{
    public function index()
    {
        $notifications = auth()->user()->notifications()->paginate(20);

        return Inertia::render('Notifications/Index', [
            'notifications' => $notifications,
        ]);
    }

    public function markAsRead($id)
    {
        $notification = auth()->user()->notifications()->where('id', $id)->firstOrFail();
        $notification->markAsRead();

        return back();
    }

    public function markAllAsRead()
    {
        auth()->user()->unreadNotifications->markAsRead();

        return back();
    }

    public function destroy($id)
    {
        $notification = auth()->user()->notifications()->where('id', $id)->firstOrFail();
        $notification->delete();

        return back();
    }
}
