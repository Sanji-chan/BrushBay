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
        Schema::create('trade_history', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('painting_id')->nullable();
            $table->unsignedBigInteger('buyer_id')->nullable();
            $table->unsignedBigInteger('seller_id')->nullable();
            $table->integer('trade_amount');
            $table->timestamps();

            $table->foreign('buyer_id')->references('id')->on('users')->onDelete('set null');
            $table->foreign('seller_id')->references('id')->on('users')->onDelete('set null');
            $table->foreign('painting_id')->references('id')->on('paintings')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trade_history');
    }
};
