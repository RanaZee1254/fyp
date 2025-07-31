<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void
    {
        Schema::create('school_profiles', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->string('name');
    $table->string('reg_no')->nullable();
    $table->string('affiliation')->nullable();
    $table->string('level')->nullable();
    // $table->string('image')->nullable();
    $table->string('contact_number')->nullable(); // snake_case!
    $table->timestamps();
});
    }
    public function down(): void
    {
        Schema::dropIfExists('school_profiles');
    }
};

