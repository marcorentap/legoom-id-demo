<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Laravel\Passport\Client;

class ApplicationController extends Controller
{
    public function edit(Request $request)
    {
        $apps = Client::select(
            ['id as app_id', 'name as app_name', 'secret as app_secret', 'redirect as app_callback']
        )
            ->get();
        return Inertia::render("Admin/Applications", [
            'apps' => $apps
        ]);
    }
}
