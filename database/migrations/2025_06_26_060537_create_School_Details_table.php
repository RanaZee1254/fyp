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
        Schema::create('Schools_Details', function (Blueprint $table) {
            $table->id()->unique();
            $table->string('email')->unique();
            $table->timestamps();
            $table->string('School_name');
            $table->string('School_contact');
            $table->string('Fee_structure');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Schools_Details');
    }
};
