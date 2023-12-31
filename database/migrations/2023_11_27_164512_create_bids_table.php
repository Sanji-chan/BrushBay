<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bids', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('post_id');
            $table->unsignedBigInteger('buyer_id');
            $table->integer('buyer_bid');
            $table->unsignedBigInteger('seller_id');
            $table->integer('seller_haggle_bid')->nullable();  //not sure if we should put this???
            $table->string('bid_status')->default("null"); //NULL-> so, when bid is initially placed by buyer and the seller has not  
                                                                //viewed or responded to it, its at null state.
                                                           // accept->means that the bid is accepted, so all transaction would proceed
                                                           // reject-> means that this bid will not be accepted, the state will never change again
                                                           // haggle-> means that the buyer and seller are in state of bargain, it will be initiated by the seller
                                                                // when he is willing to sell at a lower price then the initial bid.

            $table->timestamps();

            $table->foreign('buyer_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('seller_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bids');
    }
};
