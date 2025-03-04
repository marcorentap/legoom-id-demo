<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PlatformSettings;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Passport\Client;
use Laravel\Passport\Passport;
use Illuminate\Support\Str;
use Laravel\Passport\ClientRepository;

class ApplicationController extends Controller
{
    /**
     * @return Response
     */
    public function edit(Request $request, ClientRepository $clientRepo): Response
    {
        $apps = Passport::client()->where('revoked', '=', false)->get()->makeVisible('secret');
        return Inertia::render("Admin/Applications", [
            'apps' => $apps,
        ]);
    }
    /**
     * @return RedirectResponse
     */
    public function create(Request $request, ClientRepository $clientRepo): RedirectResponse
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'string|max:255',
                'redirect' => 'url|max:255',
            ]
        );
        if ($validator->fails()) {
            return to_route("admin.applications")->withErrors($validator);
        }
        $validated = $validator->validated();
        $clientRepo->create(
            $request->user()->id,
            $validated['name'],
            $validated['redirect'],
        );

        return to_route('admin.applications');
    }
    /**
     * @return RedirectResponse
     */
    public function update(Request $request, ClientRepository $clientRepo, string $id): RedirectResponse
    {
        $validator = Validator::make(
            $request->all(),
            [
                'update_name' => 'string|max:255|nullable',
                'update_redirect' => 'url|max:255|nullable',
            ]
        );
        if ($validator->fails()) {
            return to_route("admin.applications")->withErrors($validator);
        }
        $validated = $validator->validated();
        $client = Client::find($id);
        if (!$validated['update_name']) {
            $validated['update_name'] = $client->name;
        }
        if (!$validated['update_redirect']) {
            $validated['update_redirect'] = $client->redirect;
        }

        $clientRepo->update($client, $validated['update_name'], $validated['update_redirect']);

        return to_route("admin.applications");
    }

    /**
     * @return RedirectResponse
     */
    public function destroy(Request $request, ClientRepository $clientRepo, string $id): RedirectResponse
    {
        $client = Client::find($id);
        if ($client) {
            $clientRepo->delete($client);
        }
        return to_route('admin.applications');
    }
}
