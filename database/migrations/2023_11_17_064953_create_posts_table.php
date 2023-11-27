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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->integer('initial_bid')->nullable(); 
            $table->integer('highest_bid')->nullable(); 
            $table->unsignedBigInteger('seller_id');
            $table->unsignedBigInteger('painting_id');
            $table->string('slug')->nullable();
            $table->string('post_status');
            $table->timestamps();


            $table->foreign('seller_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('painting_id')->references('id')->on('paintings')->onDelete('cascade');

            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
