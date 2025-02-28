<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class PlatformSettings extends Model
{
    protected $fillable = [
        'key',
        'value'
    ];

    public static function setOrganizationName(string $name)
    {
        $setting = PlatformSettings::where('key', 'name')->first();
        $setting->value = $name;
        $setting->save();
    }

    public static function getOrganizationName() : string
    {
        return PlatformSettings::where('key', 'name')->first()->value;
    }

    public static function getOrganizationLogo() : string
    {
        return PlatformSettings::where('key', 'logo')->first()->value;
    }

    public static function getCanonicalOrganizationLogo() : string
    {
        return Storage::url(PlatformSettings::getOrganizationLogo());
    }
}
