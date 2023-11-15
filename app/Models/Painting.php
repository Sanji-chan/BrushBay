<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Painting extends Model
{
    use HasFactory;
    protected $fillable = ["title", "description", "author_id", "owner_id", "paintingimg_link", "tag"];

    protected $with = ['author', 'owner'];
    public function author() {
        return $this->belongsTo(User::class, 'author_id', 'id');
    }

    public function owner() {
        return $this->belongsTo(User::class, 'owner_id', 'id');
    } 


}
