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
    $table->string('reg_no')->default('reg-123');
    $table->string('affiliation')->default('Unknown');
    $table->string('level')->default('Unknown');
    $table->string('contact_number')->nullable();
    $table->timestamps();
});
    }
    public function down(): void
    {
        Schema::dropIfExists('school_profiles');
    }
};

