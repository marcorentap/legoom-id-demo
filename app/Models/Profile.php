<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Profile extends Model
{

    protected $fillable = [
        'display_name',
        'social_url',
        'profile_picture',
        'user_id'
    ];
}
