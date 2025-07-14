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
            $table->string('School_name')->nullable();
            $table->string('address');
            $table->string('School_contact')->nullable();
            $table->string('reg_no');
            $table->string('affiliation');
            $table->string('level');
            $table->string('image');
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('school_profiles');
    }
};

