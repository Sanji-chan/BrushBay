<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    protected $fillable = ['id', 'highest_bid', 'initial_bid', 'painting_id', 'seller_id', 'post_status'];

    protected $hidden = [
        'post_status',
    ];


}
