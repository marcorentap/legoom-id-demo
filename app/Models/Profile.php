<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\Storage;

class Profile extends Model
{

    protected $fillable = [
        'display_name',
        'social_url',
        'profile_picture',
        'user_id'
    ];
    /**
     * @return string|null
     */
    public function getCanonicalProfilePicture(): ?string {
        $pic = $this->profile_picture;
        return $pic ? Storage::url($pic) : null;
    }
}
