<?php

namespace App\Http\Controllers\PassportOverride;

use App\Models\PlatformSettings;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;
use Laravel\Passport\Http\Controllers\AuthorizationController as pAuthorizationController;
use Laravel\Passport\TokenRepository;
use Laravel\Passport\ClientRepository;
use Psr\Http\Message\ServerRequestInterface;
use Illuminate\Support\Str;

use League\OAuth2\Server\AuthorizationServer;
use Illuminate\Contracts\Auth\StatefulGuard;
use Illuminate\Support\Facades\Storage;
use Laravel\Passport\Contracts\AuthorizationViewResponse;

class AuthorizationController extends pAuthorizationController
{
    public function __construct(
        AuthorizationServer $server,
        StatefulGuard $guard,
        AuthorizationViewResponse $response
    ) {

        parent::__construct($server, $guard, $response);
    }

    public function authorize(
        ServerRequestInterface $psrRequest,
        Request $request,
        ClientRepository $clients,
        TokenRepository $tokens
    ) {
        $authRequest = $this->withErrorHandling(function () use ($psrRequest) {
            return $this->server->validateAuthorizationRequest($psrRequest);
        });

        if ($this->guard->guest()) {
            return $request->get('prompt') === 'none'
                ? $this->denyRequest($authRequest)
                : $this->promptForLogin($request);
        }

        if (
            $request->get('prompt') === 'login' &&
            ! $request->session()->get('promptedForLogin', false)
        ) {
            $this->guard->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return $this->promptForLogin($request);
        }

        $request->session()->forget('promptedForLogin');

        $scopes = $this->parseScopes($authRequest);
        $user = $this->guard->user();
        $client = $clients->find($authRequest->getClient()->getIdentifier());

        if (
            $request->get('prompt') !== 'consent' &&
            ($client->skipsAuthorization() || $this->hasValidToken($tokens, $user, $client, $scopes))
        ) {
            return $this->approveRequest($authRequest, $user);
        }

        if ($request->get('prompt') === 'none') {
            return $this->denyRequest($authRequest, $user);
        }

        $request->session()->put('authToken', $authToken = Str::random());
        $request->session()->put('authRequest', $authRequest);

        $settings = PlatformSettings::pluck('value', 'key')->toArray();
        return Inertia::render("Auth/Authorize", [
            'client' => $client,
            'user' => $user,
            'scopes' => $scopes,
            'request' => $request,
            'authToken' => $authToken,
            'csrfToken' => csrf_token(),
        ]);
    }
}
