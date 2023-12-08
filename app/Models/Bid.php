<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Post;

class Bid extends Model
{
    use HasFactory;
    protected $fillable = ["id", "post_id", "buyer_id", "seller_id", "buyer_bid", "seller_haggle_bid", "bid_status", "End date"];

    protected $with = ["post", "buyer", "seller"];

    public function post() {
        return $this->belongsTo(Post::class, 'post_id', 'id');
    }

    public function buyer() {
        return $this->belongsTo(User::class, 'buyer_id', 'id');
    }

    public function seller() {
        return $this->belongsTo(User::class, 'seller_id', 'id');
    }
}
