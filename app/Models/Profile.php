<?php

namespace App\Models;

use App\Enums\MembershipType;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'display_name',
        'avatar',
        'user_id'
    ];

    protected function casts(): array
    {
        return [
            'membership' => MembershipType::class
        ];
    }
}
