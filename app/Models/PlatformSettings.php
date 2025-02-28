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
        if ($setting) {
            $setting->value = $name;
            $setting->save();
        } else {
            PlatformSettings::create(['key'=>'name', 'value'=>$name]);
        }
    }

    public static function getOrganizationName() : string
    {
        return PlatformSettings::where('key', 'name')->first()->value;
    }

    public static function setOrganizationLogo(string $logo)
    {
        $newURL = Storage::putFile("/public", $logo);
        $newPath = Storage::path($newURL);

        $setting = PlatformSettings::where('key', 'logo')->first();
        if ($setting) {
            Storage::delete($setting->value);
            $setting->value = $newPath;
            $setting->save();
        } else {
            PlatformSettings::create(['key'=>'logo', 'value'=>$newPath]);
        }
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
