<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TradeHistory extends Model
{
    use HasFactory;
    protected $table = 'trade_history';

    protected $fillable = [
        'painting_id',
        'buyer_id',
        'seller_id',
        'trade_amount',
    ];

    public function buyer()
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    public function painting()
    {
        return $this->belongsTo(Painting::class);
    }
}