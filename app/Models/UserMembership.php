<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class UserMembership extends Model
{
    protected $fillable = [
        'user_id',
        'membership_id',
    ];

    public function user(): HasOne
    {
        return $this->hasOne(User::class);
    }

    public function membership(): HasOne
    {
        return $this->hasOne(Membership::class);
    }
}
