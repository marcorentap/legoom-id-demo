<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PlatformSettings extends Model
{
    protected $fillable = [
        'key',
        'value'
    ];
}
