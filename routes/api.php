<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');

Route::get('/profile', function (Request $request) {
    return $request->user()->profile;
})->middleware('auth:api');
