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
        Schema::create('users', function (Blueprint $table) {
            $table->id()->uniqid();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();  #kept as it might be required later for email verification
            $table->integer('pcoins')->default(100);
            $table->string('password');
            $table->string('preferences')->nullable();
            $table->date('dob')->nullable();
            $table->integer('consecutive_online_count')->default(0);
            $table->string('slug')->nullable();
            $table->string('userimg_link')->nullable();
            $table->integer('bid_count')->default(0);

            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
